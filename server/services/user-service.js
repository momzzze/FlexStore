const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return { users, total };
};

module.exports = {
  getAllUsers,
};
