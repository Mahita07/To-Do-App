import { useState } from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmpassword,setConfirmPassword] = useState("")
    const onChangePassword = (event) =>{
         setPassword(event.target.value);
         console.log(password);
    }

    const onChangeName = (event) =>{
      setName(event.target.value);
    }
    const onChangeEmail= (event) =>{
        setEmail(event.target.value);
        console.log(email);
    }
    const onChangeConfirmPassword = (event) =>{
      setConfirmPassword(event.target.value);
      console.log(confirmpassword);
    }
    const onSubmit = async(event) =>{
        event.preventDefault();
        console.log(name,email,password);
        try{
            if(!password || !confirmpassword || !email ||!name){
              alert("Enter all the fields !")
              window.location.reload();
            }
            else{
              if(password===confirmpassword){
                await axios.post("http://localhost:3001/user/signup", 
                {name,email,password});
                alert("Sign up completed, login to continue !")
                navigate('/user/login')
              } 
              else{
                alert('Passwords not matching !')
                window.location.reload()
              }  
            } 
        }
        catch(err){
            console.log(err); 
        }

    }
    return (
      <>
      <h1 style={{justifyContent:"center",display: "flex"}} >Signup</h1>
      <br></br>
      <div style={{justifyContent:"center",display: "flex"}} >
      <Form  onSubmit = {onSubmit} style={{ display: "flex", flexDirection: "column"}} method="POST">
      <div style={{marginRight:"30px",marginBottom:"20px"}}>
            <Form.Label>Name</Form.Label>
            <Form.Control  type="text" placeholder="Enter name" name="name" onChange = {onChangeName}/>
          </div>
          <div style={{marginRight:"30px",marginBottom:"20px"}}>
            <Form.Label>Email</Form.Label>
            <Form.Control  type="text" placeholder="Enter email" name="email" onChange = {onChangeEmail}/>
          </div>
          <div style={{marginRight:"30px",marginBottom:"20px"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control  type="password" placeholder="Enter password" name="password"  onChange = {onChangePassword }/>
          </div>
          <div style={{marginRight:"30px",marginBottom:"20px"}}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control  type="password" placeholder="Re-enter password" name="password"  onChange = {onChangeConfirmPassword }/>
          </div>
        <div style={{marginRight:"30px"}}>
        <Button variant="light" type="submit">
          Submit
        </Button>
        </div>
      </Form>

      </div>
      
    </>
    );
  }