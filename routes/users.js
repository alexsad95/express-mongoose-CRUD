import express from 'express';
import {
  getUsers,
  clearUsers,
  getUser,
  deleteUser,
  createOrUpdateUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);
router.delete('/', clearUsers);
router.get('/:username', getUser);
router.delete('/:username', deleteUser);
router.post('/', createOrUpdateUser);

export default router;
