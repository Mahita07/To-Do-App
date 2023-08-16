import * as React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from 'react-router-dom';


export function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = React.useState(null);
  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'invalidDate': {
        return 'Enter a valid date';
      }

      default: {
        return '';
      }
    }
  }, [error]);
  const [task,setTask]= useState({
      name:"",
      category:"",
      description:"",
      deadline:""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setTask((prevTask) => ({
      ...prevTask,
      deadline: date
    }));
  };
  
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

  const onSubmit = async(event) =>{
      event.preventDefault();
      console.log('Submit clicked')
      try{
            console.log(task);
            console.log(task.deadline.$D+'/'+(task.deadline.$M+1)+'/'+task.deadline.$y)
      }
      catch(err){
            console.error(err);
      }
      handleClose();
        
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">My To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Important</Nav.Link>
          </Nav>
          <Button variant="secondary" onClick={handleShow}>
            Add New Task
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="Form.ControlText1"
                >
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter task name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="Form.ControlText2"
                >
                  <Form.Label>Task Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    onChange={handleChange}
                    placeholder="Enter task category"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="Form.ControlTextarea1"
                >
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control name="description"
                        onChange={handleChange}
                        as="textarea" 
                        rows={3} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="Form.ControlDateInput"
                >
                  <Form.Label>Deadline</Form.Label>
                    <div>
                        <DatePicker disablePast
                        name="deadline"
                        value={task.deadline}
                        onChange={handleDateChange}
                        onError={(newError) => setError(newError)}
                        slotProps={{
                          textField: {
                            helperText: errorMessage,
                          },
                        }}
                        />
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Navbar.Collapse>
      </Container>
      {!window.localStorage.getItem("accessToken") ? (<button type="button" className="btn btn-secondary" onClick = {handleLogin} style={{margin:"5px"}}>Login</button>):(<button type="button" className="btn btn-secondary" onClick = {handleLogout} style={{margin:"5px"}}>Logout</button>)}
      {!window.localStorage.getItem("accessToken") ? (<button type="button" className="btn btn-secondary" onClick={handleSignup} style={{margin:"5px"}}>Signup</button>) : null}
    </Navbar>
  );
}
