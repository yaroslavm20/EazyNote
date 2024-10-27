import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { getCookie } from "hono/cookie";

export const isSessionExists = async (c: Context) => {
    const sessionId = getCookie(c, 'sessionId');
    const prisma = new PrismaClient();

    if (!sessionId) return null;

    try {
        const session = await prisma.session.findFirst({
            where: {
                id: sessionId
            }
        });

        if (!session) return null;

        return session.userId;
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
};