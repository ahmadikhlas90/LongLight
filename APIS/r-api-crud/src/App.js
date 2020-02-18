// import React, { Component } from 'react';
// import './App.css';
// import { Container, Button, Alert } from 'react-bootstrap';
// import ProductList from './Components/ProductList';
// import AddProduct from './Components/AddProduct';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
// export class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isAddProduct: false,
//       error: null,
//       response: {},
//       product: {},
//       isEditProduct: false
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//   }

//   onCreate() {
   
//     this.setState({ isAddProduct: true });
//   }

//   onFormSubmit(data) {
//     if(this.state.isEditProduct){
//       fetch('http://localhost:62932/Product/'+data.id, {
//       method :'PUT',
//       headers: {
//           'Content-Type': 'application/json;charset=UTF-8'
//       },
//       body: JSON.stringify(data)
//     })
//         .then(res => res.json())
//         .then(result => {
//           this.setState({
//             response: result,
//             isAddProduct: false,
//             isEditProduct: false
//           })
//         },
//         (error) => {
//           this.setState({ error });
//         }
//       )
//     } 
//     else {
//       debugger;
//       fetch('http://localhost:62932/Product/',
//       {
//           method :'POST',
//           headers: {
//               'Content-Type': 'application/json;charset=UTF-8'
//           },
//           body: JSON.stringify(data)
//       }).then(res => res.json())
//       .then(result => {
//         this.setState({
//           response: result,
//           isAddProduct: false,
//           isEditProduct: false
//         })
//       },
//       (error) => {
//         this.setState({ error });
//       }
//     )
//     }

//   }

//   editProduct = id => {
//     const apiUrl = 'http://localhost:62932/Product/'+id;
//     const formData = new FormData();
//     formData.append('id', id);

//     const options = {
//       method: 'GET',
//     }
//     fetch(apiUrl, options)
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             product: result,
//             isEditProduct: true,
//             isAddProduct: true
//           });
//         },
//         (error) => {
//           this.setState({ error });
//         }
//       )
//   }

//   render() {

//     let productForm;
//     if(this.state.isAddProduct || this.state.isEditProduct) {
//       productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
//     }

//     return (
//       <div className="App">
//         <Container>
//         <BrowserRouter>
//        <Switch>
//          <Route path='/ProductList' component={ProductList} exact/>
//        </Switch>
//      </BrowserRouter>

//           <h1 style={{textAlign:'center'}}>ITBEAM</h1>
//           {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
//           {!this.state.isAddProduct && <ProductList editProduct={this.editProduct}/>}
//           { productForm }
//           {!this.state.isAddProduct && <Button variant="primary" className="float-left" onClick={() => this.onCreate()}>Add Product</Button>}

//         </Container>
//       </div>
//     );
//   }
// }

// export default App;



import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import {Home} from './Components/Home';
import {Crud} from './Components/Crud';
import {Navigation} from "./Components/Navigtion";
import {ProductEdit} from "./Components/ProductEdit";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ProductList} from './crud/ProductList';
import { Final } from './crud/Final';

function App() {
  return (
    <Router>
    <div className="container  text-center"> 
    <h3 className="m-3 d-flex justify-content-center text-info">
      React Js With Web Api Crud
    </h3>
    <h5 className="m-3 d-flex justify-content-center text-success">
      ITBEAM
    </h5>
    <Navigation/>


      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/Crud' component={Crud} exact/>
        {/* <Route path='/ProductList' component={ProductList} exact/> */}
        <Route path='/ProductList' component={ProductList} exact/>
        <Route path='/ProductEdit' component={ProductEdit} exact/>
        <Route path='/Final' component={Final} exact/>
      </Switch>
    </div>
    </Router>

    // <div className="container">
    //   <Home/>
    //   <Crud/>
    //   <Tablese/>
    // </div>


    // <div className="App">
    // <h2>Hello World!!</h2>
    // <Button variant="primary"  >Main</Button>
    // </div>
  );
}

export default App;
