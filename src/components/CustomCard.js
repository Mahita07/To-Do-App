import React from 'react';
import { Button, Card } from "react-bootstrap";
import moment from "moment";
const CustomCard = ({ task, handleImportant, handleCompleted }) => {
  const convertToDays = (ms) =>{
    return ms/ (1000 * 3600 * 24);
  }
  const decideBorderColor = (task) =>{
    const taskDeadline = new Date(task.deadline)
    if(convertToDays(taskDeadline-Date.now())<=1){
        return {border:"red",bodyColor:"#FFD9D9",variant:"danger"};
    }
    else if(convertToDays(taskDeadline-Date.now())<=3){
      return {border:"#FFDF00",bodyColor:"#FFF4BC",variant:"warning"};
    }
    else{
        return {border:"#000080",bodyColor:"#D9EAF5",variant:"primary"};
    }
  }
  const Style = decideBorderColor(task);
  return (
    <Card style={{ width: '18em', margin: '10px', border:`2px solid ${Style.border}`, background:`${Style.bodyColor}`}}>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <div >
        <Card.Subtitle className="mb-2 text-muted" style={{display:"flex", justifyContent:"space-between"}}>
            <div className="category">{task.category}</div>
            <div className="deadline">{moment(task.deadline.substr(0, 10)).format("DD-MM-YYYY")}</div>
        </Card.Subtitle>
        </div>
        <Card.Text>{task.description}</Card.Text>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button variant = {Style.variant} style={{backgroundColor:`${Style.border}`, border:`2px solid ${Style.border}`}} onClick={() => handleImportant(task._id)}>
            Important
          </Button>
          <Button  variant="light"   style={{border:"black"}} onClick={() => handleCompleted(task._id)}>
            Done
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
