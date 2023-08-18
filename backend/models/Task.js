import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    deadline:{
        type: Date,
        required: true, 
    },
    isCompleted:{
        type:Boolean,
        required: true,
    },
  });

export const TaskModel = mongoose.model('tasks', TaskSchema);