import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.post('save', handleSaveError);
userSchema.post('findOneAndUpdate', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSetting);

export const User = model('user', userSchema);
