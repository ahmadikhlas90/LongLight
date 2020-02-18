import React,{ Component } from "react";
import {Table,Button,ButtonToolbar} from 'react-bootstrap';
import {AddProdModel} from './AddProdModel';
import {EditProductModel} from './EditProductModel';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
export class Crud extends Component {

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow : false,editModalShow : false}
        
    }

    componentDidMount(){
        this.refershList();
    }

    refershList(){
        fetch('http://localhost:62932/Product')
        .then(response=>response.json())
        .then(data =>
            {
                this.setState({deps:data})
            }
        );
    }
   
    //  handleEdit(depid) {  
    //     this.props.history.push("Product/" + depid);  
    // }  

    componentDidUpdate(){
        this.refershList();
    }
    deleteDep(depid){
        if(window.confirm('are you sure you want to delete'))
        {
            fetch('http://localhost:62932/Product/'+depid,
            {
                method :'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }
            )
            // this.setState({snackbaropen:true,snackbarmsg:"Success"});
        }
    }
    // handleEdit(id) {  
    //     this.props.history.push("http://localhost:62932/Product/" + id);  
    // }  
    render(){
        
        const{deps,depid,depname,depdetails,deptype,depprice}=this.state;
        let addModalClose= () => this.setState({addModalShow:false});
        let editModalClose= () => this.setState({editModalShow:false});
        return (
            <div>
            <Table className="mt-4" striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                       {deps.map(dep=>
                         <tr key={dep.id}>
                         <td>{dep.id}</td>
                         <td>{dep.name}</td>
                         <td>{dep.details}</td>
                         <td>{dep.price}</td>
                         <td>{dep.type}</td>
                         <td>
                            <ButtonToolbar>
                                <Button className="mr-2" variant="info"
                                 //onClick={(this.setState({editModalShow:true,depid:this.dep.id,depname:dep.name,depdetails:dep.details,depprice:dep.price,deptype:dep.type}))}
                                 onClick={()=>this.setState({editModalShow:true,depid:dep.id,depname:dep.name,depdetails:dep.details,depprice:dep.price,deptype:dep.type})}
                                >Edit</Button>
                                <Button className="mr-2" variant="danger"
                                 onClick={()=>this.deleteDep(dep.id)}
                                >Delete</Button>
                            <EditProductModel
                            show={this.state.editModalShow}
                            onHide={editModalClose}
                            depid={depid}
                            depname= {depname}
                            depdetails={depdetails}
                            depprice={depprice}
                            deptype={deptype}
                            />
                            </ButtonToolbar>
                         </td>
                             {/* <td>  
                            <a className="action" onClick={(id) => this.handleEdit(dep.id)}>Edit</a>  |  
                            <a className="action" onClick={(id) => this.deleteDep(dep.id)}>Delete</a>  
                        </td>   */}
                         </tr>
                        )}
                </tbody>
            </Table>

        <ButtonToolbar>
            <Button  variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                Add Product
            </Button>
            <AddProdModel show={this.state.addModalShow} onHide={addModalClose}/>
        </ButtonToolbar>
        </div>
        );
    }
}



// export class Crud extends Component {

//     constructor(props){
//         super(props);
//         this.state={deps:[]}
//     }

//     componentDidMount(){
//         this.refershList();
//     }

//     refershList(){
//         this.setState({
//             deps:[
//                     {"Id":1,"Name":"Cup"},
//                     {"Id":2,"Name":"Glass"}
//                  ]
//         })
//     }

//     render(){
//         const{deps}=this.state;
//         return (
//             <Table className="mt-4" striped bordered hover size="sm" >
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Name</th>
//                         {/* <th>Details</th>
//                         <th>Price</th>
//                         <th>Type</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                        {deps.map(dep=>
//                          <tr key={dep.Id}>
//                          <td>{dep.Id}</td>
//                          <td>{dep.Name}</td>
//                          </tr>
//                         )}
//                 </tbody>
//             </Table>
//             // <div className="mt-5 d-flex justify-content-left">
//             //     <h3>This is Crud Page</h3>
//             // </div>
//         );
//     }

// }