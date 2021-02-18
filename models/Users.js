import mongoose from 'mongoose';

const { Schema } = mongoose;

const Users = Schema({
  username: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
    require: true,
  },
});

export default mongoose.model('Users', Users);
