const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const SALT_ROUNDS = parseInt(process.env.JWT_SALT_ROUNDS, 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const comparePasswords = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const registerUser = async ({
  email,
  password,
  name,
  username,
  role = 'user',
}) => {
  if (!role) {
    throw new Error('Role is required for user creation');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      username,
      name,
      role,
    },
  });

  return { user, token: generateToken(user) };
};

const loginUser = async ({ username, password }, allowedRoles = []) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error('Invalid credentials');

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    throw new Error('Unauthorized');
  }

  const match = await comparePasswords(password, user.password);
  if (!match) throw new Error('Invalid credentials');
  return { user, token: generateToken(user) };
};

module.exports = {
  registerUser,
  loginUser,
};
