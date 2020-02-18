import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

//export default class App extends Component {
//  static displayName = App.name;

//  render () {
//    return (
//      <Layout>
//        <Route exact path='/' component={Home} />
//        <Route path='/counter' component={Counter} />
//        <Route path='/fetch-data' component={FetchData} />
//      </Layout>
//    );
//  }
//}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            login: false,
            store: null
        }

    }
    componentDidMount() {
        this.storeCollector()
    }
    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'));
        if (store && store.login) {
            this.setState({ login: true, store: store })
        }
    }
    login() {
        fetch('http://localhost:54880/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(this.state)
            //body: function () {
            //    var credentials = { username: this.state.username, password: this.state.password }
            //    return credentials;
            //}
        }).then((response) => {
            response.json().then((result) => {
                console.warn("result", result);
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    store: result.token
                }))
                this.storeCollector();
            })
        })
    }
    post() {
        let token = "Bearer " + this.state.store.token
        fetch('http://localhost:54880/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': token
            },
            body: JSON.stringify(this.state.post)
        }).then((response) => {
            response.json().then((result) => {
                this.setState({
                    response: result.message
                })
                console.warn("result", result);
                // localStorage.setItem('login', JSON.stringify({
                //    login: true,
                //    token: result.token
                //}))
                //this.storeCollector
            })
        })
    }
    render() {
        return (
            <div>
                <h1>JWT Token With React</h1>
                {
                    !this.state.login?
                    <div>
                        <input type="text" onChange={(Event) => { this.setState({ username: Event.target.value }) }} />
                        <br />
                        <br />
                        <input type="password" onChange={(Event) => { this.setState({ password: Event.target.value }) }} />
                        <br />
                        <br />
                        <button onClick={() => { this.login() }}>Login</button>
                    </div>
                    :
                        <div>
                            <textarea onChange={(event) => { this.setState({ post: event.target.value }) }}>
                            </textarea>
                            <button onClick={() => { this.post() }}>
                            </button>
                            {
                                this.state.response
                            }
                        </div>
                }
            </div>
        );
    }
}

//<div>
//    <input type="text" onChange={(Event) => { this.setState({ username: Event.target.value }) }} />
//    <br />
//    <br />
//    <input type="password" onChange={(Event) => { this.setState({ password: Event.target.value }) }} />
//    <br />
//    <br />
//    <button onClick={() => { this.login() }}>Login</button>
//</div>