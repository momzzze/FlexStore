const {
  getUsers,
  addUser,
  editUser,
  removeUser,
} = require('../../../controllers/admin/userController');
const { verifyToken } = require('../../../middlewares/auth');

const router = require('express').Router();

router.get('/', verifyToken(), getUsers);
router.post('/', verifyToken(['admin']), addUser);
router.put('/:id', verifyToken(['admin']), editUser);
router.delete('/:id', verifyToken(['admin']), removeUser);

module.exports = router;
