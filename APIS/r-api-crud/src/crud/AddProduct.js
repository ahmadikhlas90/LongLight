import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Final} from './Final';

export class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      name: '',
      price: '',
      details: '',
      type:''
    }



    if(props.product){
      this.state = props.product
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit Product</h2>
    } else {
      pageTitle = <h2>Add Product</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"required
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Product Name"/>
              </Form.Group>
              <Form.Group controlId="details">
                <Form.Label>details</Form.Label>
                <Form.Control
                  type="text"
                  name="details"required
                  value={this.state.details}
                  onChange={this.handleChange}
                  placeholder="details" />
              </Form.Group>
              <Form.Group controlId="type">
                <Form.Label>type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  required
                  value={this.state.type}
                  onChange={this.handleChange}
                  placeholder="type" />
              </Form.Group>
              
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="Price" />
              </Form.Group>
              
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>
                <Router>
                <Route exact path="/ProductList"  />
                &nbsp;<Button className="text-color-white" variant="light" ><Link to="/ProductList">Back</Link>
                  </Button>
                  </Router>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddProduct;