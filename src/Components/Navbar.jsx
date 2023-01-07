import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function NavScrollExample() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      window.location.href = '/login';
    }
  }, []);
  const navigate= useNavigate()
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Money Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link style={{'textDecoration':'None','color':'white'}} to='/'>Home</Link></Nav.Link>
            <Nav.Link><Link style={{'textDecoration':'None','color':'white'}} to="/groups">Groups</Link></Nav.Link>
            <Nav.Link><Link style={{'textDecoration':'None','color':'white'}} to="/transactions">Transactions</Link></Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
          </Form>
          {
            localStorage.getItem('token') === null ? (
              <Button variant="outline-success" onClick={()=>{navigate('/login')}}>Login</Button>
            ) : (<>
              <Button variant="outline-success" onClick={()=>{navigate('/profile')}}>My Account</Button>
              <Button variant="outline-danger mx-2" onClick={()=>{localStorage.removeItem('token');navigate('/login')}}>Logout</Button></>)
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;