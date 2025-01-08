import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';
import { Session } from '../db/models/Session.js';

import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifetime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
});

export const register = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...payload, password: hashPassword });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }
  await Session.deleteOne({ userId: user._id });

  const sessionData = createSessionData();
  return Session.create({
    userId: user._id,
    ...sessionData,
  });
};
export const refreshToken = async (payload) => {
  const oldSession = await Session.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }
  if (Date.now() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired');
  }
  await Session.deleteOne({ _id: payload.sessionId });
  const sessionData = createSessionData();
  return Session.create({
    userId: oldSession.userId,
    ...sessionData,
  });
};
export const logout = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
export const getUser = (filter) => User.findOne(filter);
export const getSession = (filter) => Session.findOne(filter);
