import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Post', postSchema); // Назва моделі "Post"
