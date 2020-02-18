using Microsoft.EntityFrameworkCore.Migrations;

namespace CrudLib.Migrations
{
    public partial class _2ND : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Products",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Products");
        }
    }
}
