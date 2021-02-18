import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', usersRoutes);
app.get('/', (req, res) => res.json({ message: 'Welcome to the Users API!' }));
app.all('*', (req, res) => res.json({ message: 'You\'ve tried reaching a route that doesn\'t exist.' }));

mongoose.connect('mongodb://mongo:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
