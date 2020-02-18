import React, { Component } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import {BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';
export class Final extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
   
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    if(this.state.isEditProduct){
      fetch('http://localhost:62932/Product/'+data.id, {
      method :'PUT',
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
          this.setState({
            response: result,
            isAddProduct: false,
            isEditProduct: false
          })
        },
        (error) => {
          this.setState({ error });
        }
      )
    } 
    else {
      debugger;
      fetch('http://localhost:62932/Product/',
      {
          method :'POST',
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(data)
      }).then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
    }

  }

  editProduct = id => {
    const apiUrl = 'http://localhost:62932/Product/'+id;
    const formData = new FormData();
    formData.append('id', id);

    const options = {
      method: 'GET',
    }
    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="container">
        <Container>
        

          <h1 style={{textAlign:'center'}}>ITBEAM</h1>
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <ProductList editProduct={this.editProduct}/>}
          { productForm }
          <Router > <Route path="./addProduct"/>
          {!this.state.isAddProduct && <Button variant="primary" className="float-left" onClick={() => this.onCreate()}>
            <Link to="/addProduct" className="text-light">Add Product</Link></Button>}
          </Router>
        </Container>
      </div>
    );
  }
}

export default Final;

