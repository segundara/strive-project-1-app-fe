import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <div className="fixed-top">
                <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: '#343a40', border: 2 + 'px solid #6351ce' }}>
                    <Link to='/'>
                        <Navbar.Brand>Strive BookStore</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/"
                                className={
                                    this.props.location.pathname === '/'
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Home
                        </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


export default withRouter(NavBar);