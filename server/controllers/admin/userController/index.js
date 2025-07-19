const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
} = require('../../../services/user-service');
const { errorHandler } = require('../../../utils/error-handling');

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { users, total } = await getAllUsers(page, limit);

    res.status(200).json({
      success: true,
      data: users,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }
    const user = await createUser(userData, req.user.id);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await updateUser(userId, userData, req.user.id);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId, req.user.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
};
