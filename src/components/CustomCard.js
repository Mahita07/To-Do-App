import React from 'react';
import { Button, Card } from "react-bootstrap";
import moment from "moment";
const CustomCard = ({ task, handleImportant, handleCompleted }) => {
  const convertToDays = (ms) =>{
    return ms/ (1000 * 3600 * 24);
  }
  const decideBorderColor = (task) =>{
    const taskDeadline = new Date(task.deadline)
    console.log(taskDeadline-Date.now())
    if(convertToDays(taskDeadline-Date.now())<=1){
        return "red";
    }
    else if(convertToDays(taskDeadline-Date.now())<=3){
      return "yellow";
    }
    else{
        return "green";
    }
  }
  const border = decideBorderColor(task);
  return (
    <Card style={{ width: '18em', margin: '10px', border:`2px solid ${border}`}}>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {task.category}
        </Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
        <Card.Text>{moment(task.deadline.substr(0,10)).format("DD-MM-YYYY")}</Card.Text>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button variant="danger" onClick={() => handleImportant(task._id)}>
            Important
          </Button>
          <Button variant="success" onClick={() => handleCompleted(task._id)}>
            Done
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
