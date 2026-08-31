import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, UserRole } from '@dream-decorators/database';
import { env } from '../../config/env.config.js';
import { ApiError } from '../../utils/ApiError.js';

export class AuthService {
  static async login(data: { loginId?: string; email?: string; username?: string; password?: string }) {
    const rawIdentifier = data.loginId || data.username || data.email || '';
    const normalizedId = rawIdentifier.trim().toLowerCase();
    const pass = data.password || '';

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedId },
          { email: normalizedId },
        ],
      },
    });

    if (!user || !user.isActive) {
      throw ApiError.unauthorized('Invalid User ID or Password');
    }

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      throw ApiError.unauthorized('Invalid User ID or Password');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email || '',
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async signup(data: {
    name: string;
    loginId?: string;
    username?: string;
    email?: string;
    password: string;
    role?: UserRole;
  }) {
    const rawId = data.loginId || data.username || data.email || '';
    const normalizedUsername = rawId.trim().toLowerCase();

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedUsername },
          ...(data.email ? [{ email: data.email.toLowerCase() }] : []),
        ],
      },
    });

    if (existing) {
      throw ApiError.conflict(`User ID '${rawId}' is already taken. Please choose another ID.`);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: data.email ? data.email.toLowerCase() : undefined,
        name: data.name.trim(),
        password: hashedPassword,
        role: data.role || UserRole.SALES_EXECUTIVE,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email || '',
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    return {
      token,
      user,
    };
  }

  static async forgotPassword(data: { loginId?: string; email?: string; username?: string; newPassword: string }) {
    const rawId = data.loginId || data.username || data.email || '';
    const normalizedId = rawId.trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedId },
          { email: normalizedId },
        ],
      },
    });

    if (!user) {
      throw ApiError.notFound(`No account found with User ID '${rawId}'`);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: 'Password reset successfully. You can now log in with your new password.',
    };
  }

  static async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('User session not found');
    }

    return user;
  }
}
