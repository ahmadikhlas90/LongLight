import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
            <Navbar.Toggle area-controls="basoc-navbar-nav"/>
                <Navbar.Collapse id="basoc-navbar-nav">
                    <Nav>
                       <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/Crud" >Crud</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/" >Home</NavLink>
                         {/* <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/ProductList" >ProductList</NavLink> */}
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="./ProductList" >ProductList</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="./none" >none</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="./final" >final</NavLink>
                        {/* <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/ProductEdit" >Product Edit</NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}