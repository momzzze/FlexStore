const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function logActivity({
  userId = null,
  userType,
  action,
  entityType,
  entityId = null,
  details = {},
  metadata = {},
}) {
  await prisma.activityLog.create({
    data: {
      userId,
      userType,
      action,
      entityType,
      entityId,
      details,
      metadata,
    },
  });
}

module.exports = { logActivity };
