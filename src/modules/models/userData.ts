import mongoose, { Schema } from 'mongoose';

const userDataSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  activityName: {
    type: String,
    required: true
  },
  autoRole: {
    type: Boolean,
    required: true
  },
  ignored: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

export const UserData = mongoose.model('UserData', userDataSchema);
export interface UserDataType {
  _id: string;
  userID: string;
  activityName: string;
  autoRole: boolean;
  ignored: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}