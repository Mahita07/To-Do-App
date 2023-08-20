import axios from "axios";
import React, { useEffect, useState } from "react";
import  CustomCard  from "../components/CustomCard.js";
export const Important = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        const fetchImportantTaskData = async()=>{
            try{
                const response = await axios.get("http://localhost:3001/user",{
                params:{
                    userId:window.localStorage.getItem("userID"),
                    }
                });
                const currentUser = response.data.user;
                const fetchedTasks = [];
                //console.log(currentUser);
               // console.log(currentUser.importantTasks,"hi");
                await Promise.all(currentUser.importantTasks.map(async (objectId) => {
                    try {
                        //console.log(objectId);
                        const taskResponse = await axios.get("http://localhost:3001/task",{
                            params:{
                                taskId:objectId,
                            },
                        });
                        console.log(taskResponse);
                        const taskDocument = taskResponse.data.task;
                        fetchedTasks.push(taskDocument);
                    } catch (err) {
                        console.error(err);
                    }
                })); 
                setTasks(fetchedTasks);   
            }
            catch(err){
                console.error(err);
            }
            
        }
        fetchImportantTaskData();
    },[]);

if (!tasks) {
        return <div>Loading...</div>;
}
else  
return(
        <>
        <div
        className="d-flex flex-wrap"
        style={{ margin: "10px", justifyContent: "space-evenly" }}
        >
        {console.log(tasks)}
        {tasks.map((task) => (
          <CustomCard
          key={task._id}
          task={task}
        />
        ))}
        </div>
        </>
    )
};
