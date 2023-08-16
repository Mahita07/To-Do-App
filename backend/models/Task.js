const mongoose = require('mongoose');
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
        type:boolean,
        required: true,
    }
  });

  module.exports = mongoose.model('tasks', TaskSchema);