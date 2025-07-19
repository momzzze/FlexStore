const { getAllUsers } = require('../../../services/user-service');
const { errorHandler } = require('../../../utils/error-handling');

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    console.log('page', page, 'limit', limit);
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

module.exports = {
  getUsers,
};
