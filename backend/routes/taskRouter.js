import express from "express";
import { TaskModel } from '../models/Task.js';
import { UserModel } from '../models/User.js';
import {ObjectId} from 'mongodb';
const router = express.Router();

//get all tasks on home page 
router.get("/",async(req,res) =>{
    const userId = new ObjectId(req.query.userId);
    console.log(userId);
    try{
        const response = await TaskModel.find({user:userId});
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
    
})

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
//post new task 
router.post("/", async(req,res) =>{
    const newTaskData= req.body;
    try{
        const newTask = new TaskModel(newTaskData);
        const response = await newTask.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
})

//appending pending task to user 
router.put("/update_pending_task", async(req,res)=>{
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    console.log(taskId,userId);
    try{
        const user = await UserModel.findOne({_id:userId});
        const task = await TaskModel.findOne({_id:taskId});
        if(!user || !task){
            return res.json({message:"No such user or task exists."});
        }
        user.pendingTasks.push(taskId);
        await user.save();
        return res.json({message:"Task saved !"})
    }
    catch(err){
        return res.json(err);
    }
});

//saving task as important task
router.put("/important", async(req,res) =>{
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    console.log(taskId,userId);
    try{
        const task = await TaskModel.findOne({_id:taskId});
        const user = await UserModel.findOne({_id:userId});
        //console.log(task);
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

//appending important task to user
router.put("/update_important_task", async(req,res)=>{
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    //console.log(taskId,userId);
    try{
        const user = await UserModel.findOne({_id:userId});
        const task = await TaskModel.findOne({_id:taskId});
        if(!user || !task){
            return res.json({message:"No such user or task exists."});
        }
        user.importantTasks.push(taskId);
        await user.save();
        return res.json({message:"Task saved !"})
    }
    catch(err){
        return res.json(err);
    }
});

//marking task as complete 
router.put("/complete", async(req,res)=>{
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    console.log(taskId,userId);
    try{
        const task = await TaskModel.findOne({_id:taskId});
        const user = await UserModel.findOne({_id:userId});
        if(!task || !user){
            return re.json({message:"Task or user not found!"});
        }
        task.isCompleted=true;
        await task.save();
        await UserModel.updateOne(
            { _id: userId },
            { $pull: { pendingTasks: taskId } }
        );
        user.completedTasks.push(taskId);
        await user.save();
        return res.json({message:"Task marked as complete."});
    }
    catch(err){
        return res.json(err);
    }   
})


//append completed tasks
router.put("/update_completed_task", async(req,res)=>{
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    //console.log(taskId,userId);
    try{
        const user = await UserModel.findOne({_id:userId});
        const task = await TaskModel.findOne({_id:taskId});
        if(!user || !task){
            return res.json({message:"No such user or task exists."});
        }
        user.completedTasks.push(taskId);
        await user.save();
        return res.json({message:"Task saved !"})
    }
    catch(err){
        return res.json(err);
    }
});



export {router as taskRouter};
