const {
  getUsers,
  addUser,
  editUser,
  removeUser,
  getUserPermissions,
  updateUserPermissions,
} = require('../../../controllers/admin/userController');
const { verifyToken, hasPermission } = require('../../../middlewares/auth');

const router = require('express').Router();

// Get user route
router.get('/', verifyToken(), hasPermission('view_users'), getUsers);
router.get(
  '/:id/permissions',
  verifyToken(),
  hasPermission('view_users'),
  getUserPermissions
);

// Post user route
router.post(
  '/',
  verifyToken(['admin']),
  hasPermission('create_users'),
  addUser
);

// Put user route
router.put(
  '/:id',
  verifyToken(['admin']),
  hasPermission('edit_users'),
  editUser
);
router.put(
  '/:id/permissions',
  verifyToken(['admin']),
  hasPermission('manage_permissions'),
  updateUserPermissions
);

// Delete user route
router.delete(
  '/:id',
  verifyToken(['admin']),
  hasPermission('delete_users'),
  removeUser
);

module.exports = router;
