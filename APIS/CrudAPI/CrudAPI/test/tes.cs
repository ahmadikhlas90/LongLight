using Microsoft.Extensions.Logging;
using NLog;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Runtime.Caching;
using System.Threading.Tasks;
namespace CrudAPI.test
{
    public class GlobalLoggerBaseEventId
    {
        internal string DicKey => Filename + ":" + LineNumber;

        public NLog.LogLevel LogLevel { get; set; }

        public int EventId { get; set; }
        public string Filename { get; set; }
        public int LineNumber { get; set; }
        public string FunctionName { get; set; }
        public string FirstMessage { get; set; }

        public override string ToString()
        {
            var strOut =
                $"{LogLevel} - EventId:{EventId} from {Filename}:{LineNumber}";
            return strOut;
        }
    }
    public static partial class GlobalLoggerBase
    {
        private static ConcurrentDictionary<string, GlobalLoggerBaseEventId> _globalEventIds = new ConcurrentDictionary<string, GlobalLoggerBaseEventId>();
        public static ConcurrentDictionary<string, GlobalLoggerBaseEventId> GlobalEventIds => _globalEventIds;

        public static int GlobalEventIdCount = 10000;
        public static Object GlobalEventIdCountLock = new Object();
    }

    public partial class LoggerBase : NLog.Logger
    {
        private void LogInternal(LogLevel level, object message = null, Exception exception = null, int? eventId = null)
        {
            var logEvent = new LogEventInfo
            {
                Message = message?.ToString() ?? String.Empty,
                Exception = exception,
                Level = level,
                LoggerName = this.Name

            };


            var stack = new StackTrace(true);
            int userFrameIndex = -1;
            MethodBase userMethod = null;

            for (int i = 0; i < stack.FrameCount; ++i)
            {
                var frame = stack.GetFrame(i);
                var method = frame.GetMethod();
                if (method?.DeclaringType != null)
                {
                    if (method.DeclaringType == this.GetType() || this.GetType().IsSubclassOf(method.DeclaringType))
                    {
                        // skip all methods of this type
                        continue;
                    }
                    if (method.DeclaringType.Name == this.GetType().Name)
                    {
                        // skip all methods of this type
                        continue;
                    }
                    if (method.DeclaringType.Name == typeof(LoggerBase).Name)
                    {
                        continue;
                    }
                }

                if (method?.DeclaringType?.Assembly == SystemAssembly)
                {
                    // skip all methods from System.dll
                    continue;
                }

                userFrameIndex = i;
                userMethod = method;
                break;
            }
            string currentFile = "unknown";
            int currentLine = 0;
            if (userFrameIndex >= 0)
            {
                currentFile = stack.GetFrame(userFrameIndex).GetFileName();
                currentLine = stack.GetFrame(userFrameIndex).GetFileLineNumber();
                logEvent.SetStackTrace(stack, userFrameIndex);
                if (userMethod?.DeclaringType != null)
                {
                    logEvent.LoggerName = userMethod.DeclaringType.FullName;
                }
            }

            if (logEvent.Level > LogLevel.Info)
            {
                logEvent.Properties["FileName"] = currentFile;
                logEvent.Properties["LineNumber"] = currentLine;
            }
            if (eventId.HasValue)
            {
                logEvent.Properties["EventID"] = eventId.Value;
            }
            else
            {

                GlobalLoggerBaseEventId id = new GlobalLoggerBaseEventId()
                {
                    Filename = currentFile,
                    LineNumber = currentLine,
                    LogLevel = logEvent.Level
                };
                if (id.DicKey == new GlobalLoggerBaseEventId().DicKey)
                {
                    logEvent.Properties["EventID"] = 0;
                }
                else
                {


                    GlobalLoggerBaseEventId dicId;
                    if (GlobalLoggerBase.GlobalEventIds.TryGetValue(id.DicKey, out dicId))
                    {
                        logEvent.Properties["EventID"] = dicId.EventId;
                    }
                    else
                    {
                        lock (GlobalLoggerBase.GlobalEventIdCountLock)
                        {
                            GlobalLoggerBase.GlobalEventIdCount++;
                            id.EventId = GlobalLoggerBase.GlobalEventIdCount;
                            if (!GlobalLoggerBase.GlobalEventIds.TryAdd(id.DicKey, id))
                                throw new NLogRuntimeException(
                                    "Could not add Event to GlobalLoggerBase.GlobalEventIds: " + id.ToString());
                            logEvent.Properties["EventID"] = id.EventId;
                        }
                    }
                }
            }
            string useSource = GetEventlogSource(userMethod, logEvent);


            logEvent.Properties["MySource"] = useSource;


            (this as Logger).Log(logEvent);
        }

        private static string GetEventlogSource(MethodBase userMethod, LogEventInfo logEvent)
        {
            string useSource = null;
            ObjectCache cache = MemoryCache.Default;
            var eventLogSource = !string.IsNullOrEmpty(userMethod?.DeclaringType?.Assembly.GetName().Name)
                ? userMethod.DeclaringType.Assembly.GetName().Name
                : "Application Error";
            if (cache.Contains(eventLogSource))
            {
                useSource = cache.Get(eventLogSource) as String;
            }
            if (String.IsNullOrEmpty(useSource))
            {
                try
                {
                    if (!System.Diagnostics.EventLog.SourceExists(eventLogSource))
                    {
                        try
                        {
                            System.Diagnostics.EventLog.CreateEventSource(eventLogSource, "Application");
                        }
                        catch (Exception e)
                        {
                            System.Diagnostics.Trace.TraceInformation(e.ToString());
                        }
                    }
                }
                catch (Exception)
                {
                    try
                    {
                        System.Diagnostics.EventLog.CreateEventSource(eventLogSource, "Application");
                    }
                    catch (Exception e)
                    {
                        System.Diagnostics.Trace.TraceInformation(e.ToString());
                    }
                }
                bool itExists = false;
                try
                {
                    itExists = System.Diagnostics.EventLog.SourceExists(eventLogSource);
                }
                catch (Exception)
                {
                    //do nothing, thats just to get the bool-value
                }
                if (!itExists)
                {
                    string substring = "Application Error";
                    logEvent.Message = "Eventlog Source " + eventLogSource + " does not exist!" +
                                       Environment.NewLine + Environment.NewLine + "And now the real log-entry: " +
                                       Environment.NewLine + logEvent.Message;
                    useSource = substring;
                }
                else
                {
                    useSource = eventLogSource;
                }

                // Store data in the cache
                CacheItemPolicy cacheItemPolicy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now.Add(TimeSpan.FromDays(1))
                };
                cache.Add(eventLogSource, useSource, cacheItemPolicy);
            }
            return useSource;
        }
    }
}
