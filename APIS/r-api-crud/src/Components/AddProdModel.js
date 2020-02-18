import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form, FormGroup} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
export class AddProdModel extends Component{
    constructor(props)
    {
        super(props);
        this.state={snackbaropen: false , snackbarmsg:''};
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    snackbarClose=(event) => {
        this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:62932/Product',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify({
                id:event.target.id.value,
                name:event.target.name.value,
                price:event.target.price.value,
                details:event.target.details.value,
                type:event.target.type.value
            })
        })
        //  .then(res=>res.json())
        .then((result)=>
         {
            // alert(result);
            this.setState({snackbaropen:true,snackbarmsg:"Success"});
        }
        ,(error)=>{
            // alert('faild');
            this.setState({snackbaropen:true,snackbarmsg:'Falid'});
        }
        )
        // alert(event.target.name.value);
    }
    render(){
        return(
        <div className="container">
            <SnackBar 
            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
            open={this.state.snackbaropen}
            autoHideDuration={3000}
            onClose={this.snackbarClose}
            message={<span id="message-id">{this.state.snackbarmsg}</span>}
            action = {[
                <IconButton key="close" area-label="Close" color="inherit"
                onClick={this.snackbarClose}
                >
                    X
                </IconButton>
            ]}
            />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <Row>
                       <Col sm={12}>
                           <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Name"></Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                type="text" name="name" required placeholder="Enter Product Name"
                                />
                                <br />
                                <Form.Group controlId="Details"></Form.Group>
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                type="text" name="details" required placeholder="Enter Product Details"
                                />
                                <br />
                                 <Form.Group controlId="Price"></Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                type="number" name="price" required placeholder="Enter Product Details"
                                />
                                 <br />
                                 <Form.Group controlId="Type"></Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                type="text" name="type" required placeholder="Enter Product Details"
                                />
                                <br/>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Product
                                    </Button>
                                </Form.Group>
                           </Form>
                       </Col>
                   </Row>
               
             </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
             </Modal.Footer>
            </Modal>
        </div>
        );
    }
}