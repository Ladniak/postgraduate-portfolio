import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    viewsCount: { type: Number, default: 0 },
    files: { type: [String], default: [] },
    imageUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Post', postSchema);
