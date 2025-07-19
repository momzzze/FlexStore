const {
  getUsers,
  addUser,
  editUser,
  removeUser,
} = require('../../../controllers/admin/userController');
const { verifyToken, hasPermission } = require('../../../middlewares/auth');

const router = require('express').Router();

router.get('/', verifyToken(), hasPermission('view_users'), getUsers);
router.post(
  '/',
  verifyToken(['admin']),
  hasPermission('create_users'),
  addUser
);
router.put(
  '/:id',
  verifyToken(['admin']),
  hasPermission('edit_users'),
  editUser
);
router.delete(
  '/:id',
  verifyToken(['admin']),
  hasPermission('delete_users'),
  removeUser
);

module.exports = router;
