import { PrismaClient } from "@prisma/client";
import { deleteCookie } from "hono/cookie";
import bcrypt from "bcrypt";
import { Hono } from "hono";
import { isSessionExists } from "../utils/isSessionExists";

export const accountRoutes = (app: Hono) => {
    const prisma = new PrismaClient();

    app.post('/account/update/username', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        const { username } = await c.req.json();

        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    username: username
                }
            });

            return c.json({ message: 'Username updated' }, 200);
        } catch {
            return c.json({ message: 'Error updating username' }, 500);
        }
    });

    app.post('/account/update/email', async (c) => {
        const userId = await isSessionExists(c);
        if (!userId) return c.json({ message: 'Not authorized' }, 401);
        const { email } = await c.req.json();

        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: email
                }
            });

            return c.json({ message: 'Email updated' }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error updating email' }, 500);
        }
    });

    app.post('/account/update/password', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        const { oldPassword, newPassword } = await c.req.json();

        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            });

            if (!user) return c.json({ message: 'User not found' }, 404);

            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) return c.json({ message: 'Incorrect password' }, 400);

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashedPassword
                }
            });

            return c.json({ message: 'Password updated' }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error updating password' }, 500);
        }
    });

    app.delete('/account/delete', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        try {
            await prisma.user.delete({
                where: {
                    id: userId
                }
            });

            deleteCookie(c, 'sessionId');

            return c.json({ message: 'Account deleted' }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error deleting account' }, 500);
        }
    });
}