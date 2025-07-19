const {
  ActivityUserTypes,
  ActivityActions,
  ActivityEntities,
} = require('../../../constants/activityLog');
const { registerUser, loginUser } = require('../../../services/auth-service');
const { logActivity } = require('../../../services/logService');
const { AppError, errorHandler } = require('../../../utils/error-handling');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Email and password are required');
    }
    const { user, token } = await loginUser({ username, password });

    await logActivity({
      userId: user.id,
      userType: ActivityUserTypes.BO_USER,
      action: ActivityActions.LOGIN,
      entityType: ActivityEntities.LOGIN,
      details: { ip: req.ip },
    });

    res.status(200).json({
      success: true,
      message: 'User logged in',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions || [],
      },
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, name, role } = req.body;

    if (!email || !password || !username) {
      throw new AppError('Missing required fields');
    }

    const { user, token } = await registerUser({
      email,
      password,
      username,
      name,
      role,
    });

    await logActivity({
      userId: user.id,
      userType: ActivityUserTypes.BO_USER,
      action: ActivityActions.REGISTER,
      entityType: ActivityEntities.USER,
      details: { ip: req.ip },
    });

    res.status(201).json({
      success: true,
      message: 'User registered',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { login, register };
