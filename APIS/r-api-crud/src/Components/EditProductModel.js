import React, {Component} from 'react';
import {Modal,Button,Row,Col,Form, FormGroup} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditProductModel extends Component{
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
        let c=this.props.depid;
        fetch('http://localhost:62932/Product/'+c,{
            method:'PUT',
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
            if(result.status === 200){
                this.setState({snackbaropen:true,snackbarmsg:"Success"});
                // return result.json();
            }else{
                this.setState({snackbaropen:true,snackbarmsg:"faild"});

                // this.setState({ requestFailed: true })
            }
        }
        // ,(error)=>{
        //     if()
        //     // alert('faild');
        //     this.setState({snackbaropen:true,snackbarmsg:'Falid'});
        // }
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
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <Row>
                       <Col sm={12} >
                           <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Id"></Form.Group>
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control
                                    type="text" name="id" disabled required defaultValue={this.props.depid} placeholder="ID"
                                    />
                                    <br />
                                <Form.Group controlId="Name"></Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                    type="text" name="name" defaultValue={this.props.depname} required placeholder="Name"
                                    />
                                    <br />
                                <Form.Group controlId="Details"></Form.Group>
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control
                                    type="text" name="details"defaultValue={this.props.depdetails}  required placeholder="Details"
                                    />
                                    <br />
                                <Form.Group controlId="Price"></Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                    type="number" name="price" defaultValue={this.props.depprice}  required placeholder="Price"
                                    />
                                    <br />
                                <Form.Group controlId="Type"></Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                    type="text" name="type" required defaultValue={this.props.deptype} placeholder="Type"
                                    />
                                    <br/>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                    Update Product
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