import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    importantTasks:{
        type:[{type:mongoose.Schema.Types.ObjectId}],
        ref: 'tasks'
    },
    pendingTasks:{
        type:[{type:mongoose.Schema.Types.ObjectId}],
        ref:'tasks'
    },
    completedTasks:{
        type:[{type:mongoose.Schema.Types.ObjectId}],
        ref:'tasks'
    }

  });
  export const UserModel = mongoose.model("user",UserSchema);