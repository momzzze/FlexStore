const { PrismaClient } = require('../generated/prisma');
const { logActivity } = require('./logService');

const prisma = new PrismaClient();

const getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        permissions: true,
      },
    }),
    prisma.user.count(),
  ]);

  return { users, total };
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
};

const updateUser = async (id, data, adminUserId) => {
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  await logActivity({
    userId: adminUserId,
    userType: 'admin',
    action: 'update',
    entityType: 'user',
    entityId: user.id,
    details: { updatedFields: Object.keys(data) },
  });
  return user;
};

const deleteUser = async (id, adminUserId) => {
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  await logActivity({
    userId: adminUserId,
    userType: 'admin',
    action: 'delete',
    entityType: 'user',
    entityId: Number(id),
    details: { deletedUsername: user.username },
    metadata: {
      deletedAt: new Date(),
      reason: 'User deleted by admin',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });

  return user;
};

const createUser = async (data, adminUserId) => {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  await logActivity({
    userId: adminUserId,
    userType: 'admin',
    action: 'create',
    entityType: 'user',
    entityId: user.id,
    details: { createdUser: user.username },
  });

  return user;
};

const getUserPermissionsById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      permissions: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return Array.isArray(user.permissions) ? user.permissions : [];
};

const updateUserPermissionsService = async (userId, permissions) => {
  const user = await prisma.user.update({
    where: { id: Number(userId) },
    data: { permissions },
    select: {
      id: true,
      username: true,
      permissions: true,
    },
  });

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getUserPermissionsById,
  updateUserPermissionsService,
};
