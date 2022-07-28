import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleRegister(event) {
        this.toggleModal();
        this.props.registerUser({firstname: this.firstname.value, lastname: this.lastname.value, username: this.username2.value, password: this.password2.value})
        event.preventDefault()
    }
    
    handleLogin(event) {
        console.log('User Info', this.props.auth)
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        console.log('User Info', this.props.auth)
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                
                <Navbar dark sticky="top" expand="md" style={{position: 'absolute', top: '0', width: '100%'}}>
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src='/assets/images/netflix-watchlists.png' alt='logo' height='50' width='90' /></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar> 
                            <Nav navbar>
                                    { !this.props.auth.isAuthenticated 
                                        ?
                                            <>
                                                <NavItem style={{position: 'absolute', left: '44%', top:'16px'}}>
                                                    <NavLink className="nav-link" to="/home">
                                                        <i className="fa fa-home fa-lg" /> Home
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem style={{position: 'absolute', left: '51%', top:'16px'}}>
                                                    <NavLink className="nav-link" to="/directory">
                                                        <i className="fa fa-list fa-lg" /> Directory
                                                    </NavLink>
                                                </NavItem>
                                            </>
                                        : 
                                            <>
                                                <NavItem style={{position: 'absolute', left: '37%', top:'16px'}}>
                                                    <NavLink className="nav-link" to="/home">
                                                        <i className="fa fa-home fa-lg" /> Home
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem style={{position: 'absolute', left: '47%', top:'16px'}}>
                                                    <NavLink className="nav-link" to="/directory">
                                                        <i className="fa fa-list fa-lg" /> Directory
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem style={{position: 'absolute', left: '57%', top:'16px'}}>
                                                    <NavLink className="nav-link" to="/favorites">
                                                        <i className="fa fa-heart fa-lg" /> My Favorites
                                                    </NavLink>
                                                </NavItem>
                                            </>
                                    }
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated 
                                        ?
                                        <Button outline onClick={this.toggleModal} style={{color: 'white'}}>
                                            <i className="fa fa-sign-in fa-lg" /> Login / SignUp
                                            {this.props.auth.isFetching 
                                                ? <span className="fa fa-spinner fa-pulse fa-fw" />
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3" style={{color: 'white'}}>{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout} style={{color: 'white'}}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching 
                                                    ? <span className="fa fa-spinner fa-pulse fa-fw"/>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>

                    <ModalBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={input => this.firstname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={input => this.lastname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username2">Username</Label>
                                <Input type="text" id="username2" name="username2"
                                    innerRef={input => this.username2 = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password2">Password</Label>
                                <Input type="password" id="password2" name="password2"
                                    innerRef={input => this.password2 = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="secondary">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Header;