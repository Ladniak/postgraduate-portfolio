import { model, Schema } from 'mongoose';

const userShema = new Schema(
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
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model('User', userShema);

export default User;
