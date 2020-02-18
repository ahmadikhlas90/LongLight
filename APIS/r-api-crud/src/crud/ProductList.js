import React from 'react';
import { Table, Button,Alert } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      products: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:62932/Product/ ';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  componentDidUpdate(){
      this.refershList();
  }
   refershList(){
    fetch('http://localhost:62932/Product/')
    .then(response=>response.json())
    .then(data =>
        {
            this.setState({products:data})
        }
    );
}

  deleteDep(Id){
    if(window.confirm('are you sure you want to delete'))
    {
        fetch('http://localhost:62932/Product/'+Id,
        {
            method :'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        )
    }
  }
  // deleteProduct(productId) {
  //   fetch('http://localhost:62932/Product/'+productId,
  //   {
  //       method :'DELETE',
  //       headers: {
  //           'Content-Type': 'application/json;charset=UTF-8'
  //       },
  //   }
  //   )
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           response: result,
  //         });
  //       },
  //       (error) => {
  //         this.setState({ error });
  //       }
  //     )
  // }
  render() {
    const { error, products} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
        <h1>{this.state.response && <Alert variant="info">{this.state.response.message}</Alert>}</h1> 
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Product Name</th>
                <th>details</th>
                <th>Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.details}</td>
                  <td>{product.type}</td>
                  <td>{product.price}</td>
                  <td>
                    <Router>
                      <Route path="/EditProduct"/>
                    <Button variant="info" onClick={() => this.props.editProduct(product.id)}>
                      <Link className="text-light"to="/EditProduct">
                          Edit
                      </Link>
                    </Button>
                  &nbsp;<Button variant="danger" onClick={() => this.deleteDep(product.id)}>Delete</Button>
                  </Router>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default ProductList;
// // http://localhost:62932/Product
// // import React,{ Component } from "react";
// // import {Table,Button,ButtonToolbar} from 'react-bootstrap';
// // import {AddProdModel} from './AddProdModel';
// // import {EditProductModel} from './EditProductModel';

// // export class Tablese extends Component {
// //     constructor(props){
// //         super(props);
// //         this.state={deps:[], addModalShow : false,editModalShow : false}
// //     }
// //     componentDidMount(){
// //         this.refershList();
// //     }
// //     refershList(){
// //         fetch('http://localhost:62932/Product')
// //         .then(response=>response.json())
// //         .then(data =>
// //             {
// //                 this.setState({deps:data})
// //             }
// //         );
// //     }
// //     componentDidUpdate(){
// //         this.refershList();
// //     }
// //     // handleEdit(id){
// //     //     this.props.history.push("ProductEdit/" + id);  
// //     // }
// //     deleteDep(depid){
// //         if(window.confirm('are you sure you want to delete'))
// //         {
// //             fetch('http://localhost:62932/Product/'+depid,
// //             {
// //                 method :'DELETE',
// //                 headers: {
// //                     'Content-Type': 'application/json;charset=UTF-8'
// //                 },
// //             }
// //             )
// //         }
// //     }
// //     handleEdit(id){
// //         this.props.history.push("ProductEdit/" + id,
// //         ); 
        

// //     }
// //     render(){
// //         const{deps,depid,depname,depdetails,deptype,depprice}=this.state;
// //         let addModalClose= () => this.setState({addModalShow:false});
// //         let editModalClose= () => this.setState({editModalShow:false});
// //         return (
// //             <div>
// //             <Table className="mt-4" striped bordered hover size="sm" >
// //                 <thead>
// //                     <tr>
// //                         <th>Id</th>
// //                         <th>Name</th>
// //                         <th>Details</th>
// //                         <th>Price</th>
// //                         <th>Type</th>
// //                         <th>Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                        {deps.map(dep=>
// //                          <tr key={dep.id}>
// //                          <td id="tid">{dep.id}</td>
// //                          <td id="tname">{dep.name}</td>
// //                          <td id="tdetail">{dep.details}</td>
// //                          <td id="tprice">{dep.price}</td>
// //                          <td id="ttype">{dep.type}</td>
// //                          {/* <td>
// //                             <ButtonToolbar>
// //                                 <Button className="mr-2" variant="info"
// //                                  //onClick={(this.setState({editModalShow:true,depid:this.dep.id,depname:dep.name,depdetails:dep.details,depprice:dep.price,deptype:dep.type}))}
// //                                  onClick={()=>this.setState({editModalShow:true,depid:dep.id,depname:dep.name,depdetails:dep.details,depprice:dep.price,deptype:dep.type})}
// //                                 >Edit</Button>
// //                                 <Button className="mr-2" variant="danger"
// //                                  onClick={()=>this.deleteDep(dep.id)}
// //                                 >Delete</Button>
// //                             <EditProductModel
// //                             show={this.state.editModalShow}
// //                             onHide={editModalClose}
// //                             depid={depid}
// //                             depname= {depname}
// //                             depdetails={depdetails}
// //                             depprice={depprice}
// //                             deptype={deptype}
// //                             />
// //                             </ButtonToolbar>
// //                          </td> */}
// //                              <td>  
// //                             <a className="action" onClick={(id) => this.handleEdit(dep.id)}>Edit</a>  |  
// //                             <a className="action" onClick={(id) => this.deleteDep(dep.id)}>Delete</a>  
// //                         </td>  
// //                          </tr>
// //                         )}
// //                 </tbody>
// //             </Table>

// //         <ButtonToolbar>
// //             <Button  variant="primary" onClick={()=>this.setState({addModalShow:true})}>
// //                 Add Product
// //             </Button>
// //             <AddProdModel show={this.state.addModalShow} onHide={addModalClose}/>
// //         </ButtonToolbar>
// //         </div>
// //         );

// //     }

// // }

