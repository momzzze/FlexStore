const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function logActivity({
  userId = null,
  userType,
  action,
  entityType,
  entityId = null,
  details = {},
}) {
  await prisma.activityLog.create({
    data: {
      userId,
      userType,
      action,
      entityType,
      entityId,
      details,
    },
  });
}

module.exports = { logActivity };
