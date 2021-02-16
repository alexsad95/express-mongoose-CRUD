import Users from '../models/Users';

export const getUsers = (req, res) => {
  Users.find()
  .then((users) => {
      res.json(users);
  }).catch((err) => {
      res.status(500).json({
          message: err.message || 'Some error occurred while retrieving users.',
      });
  });
};

export const createOrUpdateUser = (req, res) => {
  Users.updateOne({ username: req.body.username }, req.body, { upsert: true, setDefaultsOnInsert: true })
    .then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating/updating the user.',
      });
    });
};

export const getUser = (req, res) => {
  Users.find({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `User not found with username ${req.params.username}`,
        });
      }
      return res.json(user);
    }).catch(err => res.status(500).json({
      message: err.message || `Error retrieving user with username ${req.params.username}`,
    }));
};

export const deleteUser = (req, res) => {
  Users.findOneAndDelete({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `User not found with username ${req.params.username}`,
        });
      }
      return res.json(user);
    }).catch(err => res.status(500).json({
      message: err.message || `Error deleting user with username ${req.params.username}`,
    }));
};

export const clearUsers = (req, res) => {
  Users.deleteMany({}, (err) => {
    if (err) {
      return res.status(500).json({
        message: `Can't remove collection. Error message: "${err.message}"`,
      });
    }
    return res.json({
      message: 'Collection is cleared',
    });
 });
};
