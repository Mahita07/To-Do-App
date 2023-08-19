import express from "express";
import { TaskModel } from '../models/Task.js';
import { UserModel } from '../models/User.js';
const router = express.Router();

//get all tasks on home page 
router.get("/",async(req,res) =>{
    try{
        const response = await TaskModel.find({});
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
    
})
//post new task 
router.post("/", async(req,res) =>{
    const newTaskData= req.body;
    try{
        const newTask = new TaskModel(newTaskData);
        console.log(newTask)
        const response = await newTask.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
})

//saving task as important task
router.put("/", async(req,res) =>{
    try{
        const task = await TaskModel.findOne({_id:req.body.task_id});
        const user = await UserModel.findOne({_id:req.body.user_id});
        console.log(task);
        if(!task || !user){
            return res.json({message:"Invalid user or task"});
        }
        if(user.importantTasks.includes(task._id)){
            return res.json({message:"Task already saved !"})
        }
        else{
            user.importantTasks.push(task._id);
            await user.save();
            return res.json({message:"Saved to important tasks !"})
        }
    }
    catch(err){
        res.json(err);
    }
});

//get the task based on id
router.get('/:task_id',async(req,res) =>{
    const task = await TaskModel.findOne({_id:req.body.task_id});
    console.log(task);
    if(!task){
        return res.json({message:"Invalid task id"});
    }
    else{
        return res.json({task});
    }
})



export {router as taskRouter};
