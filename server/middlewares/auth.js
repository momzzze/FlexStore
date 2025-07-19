const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/error-handling');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Authentication token missing or malformed', 401);
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        throw new AppError('Forbidden: insufficient permissions', 403);
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

const hasPermission = (permission) => (req, res, next) => {
  if (
    !Array.isArray(req.user?.permissions) ||
    !req.user.permissions.includes(permission)
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

module.exports = { verifyToken, hasPermission };
