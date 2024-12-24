import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ladnyaks7:ladnyaks7@cluster0.qvwmw.mongodb.net/myDatabase?retryWrites=true&w=majority',
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};
