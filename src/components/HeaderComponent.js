/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModal2Open: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
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

    toggleModal2() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isModal2Open: !this.state.isModal2Open
        });
    }

    closeModal() {
        this.setState({ 
            isModalOpen: false
        })
    }
    
    closeModal2() {
        this.setState({ 
            isModal2Open: false
        })
    }

    handleRegister(event) {
        this.toggleModal2();
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
                                            <i className="fa fa-sign-in fa-lg" /> Login / Sign Up
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
                    <ModalBody style={{color: '#e60023'}}>
                        <Button onClick={this.closeModal} style={{backgroundColor: '#fff', color: '#000', fontSize: '10pt', position: 'absolute', right: '10px' }}>
                                <span className="fa fa-times" />
                        </Button>
                        <h2 toggle={this.toggleModal} className='text-center mt-2' style={{color: '#e60023'}}>Login</h2>
                        <Form onSubmit={this.handleLogin} clasName='mx-auto' style={{maxWidth:'80%'}}>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="username" className='mb-0 pb-0'>Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="password" className='mb-0 pb-0'>Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={input => this.password = input} />
                            </FormGroup >
                            <div className="text-center offset-3">
                                <Button className='btn' type="submit" value="submit" style={{backgroundColor: '#000', color: '#fff', fontWeight: 'bold', fontSize: '10pt' }}>
                                    <span className="fa fa-sign-out fa-lg pr-1" /> Login
                                </Button>
                            </div>
                        </Form>
                        <div className='text-center mt-3' style={{color: '#e60023'}}>
                            <p className='pb-0 mb-0' style={{fontSize: '8pt'}}>
                                Not a member?
                            </p>
                            <a className='btn pt-0 mt-0' onClick={this.toggleModal2} style={{fontSize: '9pt', fontWeight: 'bold', color: '#e60023'}}>
                                Sign Up
                            </a>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isModal2Open} toggle={this.toggleModal2}>
                    <ModalBody style={{color: '#e60023'}}>
                    <Button onClick={this.closeModal2} style={{backgroundColor: '#fff', color: '#000', fontSize: '10pt', position: 'absolute', right: '10px' }}>
                                <span className="fa fa-times" />
                        </Button>
                        <h2 toggle={this.toggleModal} className='text-center mt-2' style={{color: '#e60023'}}>Sign Up</h2>
                        <Form onSubmit={this.handleRegister} clasName='mx-auto' style={{maxWidth:'80%'}}>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="firstname" className='mb-0 pb-0'>First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={input => this.firstname = input} />
                            </FormGroup>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="lastname" className='mb-0 pb-0'>Last Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={input => this.lastname = input} />
                            </FormGroup>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="username2" className='mb-0 pb-0'>Username</Label>
                                <Input type="text" id="username2" name="username2"
                                    innerRef={input => this.username2 = input} />
                            </FormGroup>
                            <FormGroup className='offset-3'>
                                <Label htmlFor="password2" className='mb-0 pb-0'>Password</Label>
                                <Input type="password" id="password2" name="password2"
                                    innerRef={input => this.password2 = input} />
                            </FormGroup>
                            <div className="text-center offset-3">
                                <Button className='btn' type="submit" value="submit" style={{backgroundColor: '#000', color: '#fff', fontWeight: 'bold', fontSize: '10pt' }}>
                                    <span className="fa fa-sign-out fa-lg pr-1" /> Register
                                </Button>
                            </div>
                        </Form>
                        <div className='text-center mt-3' style={{color: '#e60023'}}>
                            <p className='pb-0 mb-0' style={{fontSize: '8pt'}}>
                                Already a member?
                            </p>
                            <a className='btn pt-0 mt-0' onClick={this.toggleModal2} style={{fontSize: '9pt', fontWeight: 'bold', color: '#e60023'}}>
                                Log In
                            </a>
                        </div>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}

export default Header;