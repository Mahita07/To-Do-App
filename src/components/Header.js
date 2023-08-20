import  React from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export function Header() {
  const navigate = useNavigate();
  const handleSignup = () =>{
    navigate('user/signup');
  }

  const handleLogin = () =>{
    navigate('user/login');
  }

  const handleLogout = () =>{
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userID");
    navigate('/');
    window.location.reload();
  }

  const handleImportant = () =>{
    if(window.localStorage.getItem("accessToken")){
      navigate('/important');
    }
  }

  const handleCompleted = () =>{
    if(window.localStorage.getItem("accessToken")){
      navigate('/completed');
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">My To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/important" onClick={handleImportant}>Important</NavLink>
            <NavLink to="/completed" onClick={handleCompleted}>Completed</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {!window.localStorage.getItem("accessToken") ? (<button type="button" className="btn btn-secondary" onClick = {handleLogin} style={{margin:"5px"}}>Login</button>):(<button type="button" className="btn btn-secondary" onClick = {handleLogout} style={{margin:"5px"}}>Logout</button>)}
      {!window.localStorage.getItem("accessToken") ? (<button type="button" className="btn btn-secondary" onClick={handleSignup} style={{margin:"5px"}}>Signup</button>) : null}
    </Navbar>
  );
}
