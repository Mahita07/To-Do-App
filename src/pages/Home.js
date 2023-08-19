import axios from "axios";
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
export const Home = () => {
    const [tasks,setTasks] = useState();
    const [username,setUsername]=useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [task,setTask]= useState({
        name:"",
        category:"",
        description:"",
        deadline:new Date(),
        isCompleted:false,
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value
      }));
    };
  
    const handleDateChange = (event) => {
      const date = event.target.value;
      setTask((prevTask) => ({
        ...prevTask,
        deadline: date
      }));
    };

    const onSubmit = async(event) =>{
        event.preventDefault();
        console.log('Submit clicked')
        try{
              console.log(task); 
              await axios.post("http://localhost:3001/task",task); 
              alert('Task added successfully !');
        }
        catch(err){
              console.error(err);
        }
        handleClose();
          
      }

    const userId = window.localStorage.getItem("userID");
    useEffect (() =>{
        const fetchTaskData = async() =>{
            try{
                const response = await axios.get("http://localhost:3001/task");
                if(response){
                    setTasks(response.data);
                }
                console.log(typeof userId);
                const response1 = await axios.get("http://localhost:3001/user",{
                    params: {
                        userId:userId,
                    }
                });
                setUsername(response1.data.user.name);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchTaskData();
    },[]);
    if(!tasks){
        return <div>Loading...</div>
    }
    return(
        <>
        <h1>Hi, {username}</h1>
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
                        <input type="date"
                        name="deadline"
                        value={task.deadline}
                        onChange={handleDateChange}
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
          <Button variant="secondary" onClick={handleShow}>
            Add New Task
          </Button>
        </>
    )};