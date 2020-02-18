import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> {
    constructor() {
        super();
        this.state = { empList: [], loading: true };
        fetch('http://localhost:62932/Product')
            .then(response => response.json() as Promise<Product[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    } 
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.empList);
        return <div>
            <h1>Employee Data</h1>
            <p>This component demonstrates fetching Employee data from the server.</p>
            <p>
                <Link to="/addemployee">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // Handle Delete request for an employee  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeId != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderEmployeeTable(empList: Product[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Department</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.Id}>
                        <td></td>
                        <td>{emp.Id}</td>
                        <td>{emp.Name}</td>
                        <td>{emp.Price}</td>
                        <td>{emp.Details}</td>
                        <td>{emp.Type}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.Id)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.Id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class Product {
    Id: number = 0;
    Name: string = "";
    Price: number = 0;
    Details: string = "";
    Type: string = "";
}