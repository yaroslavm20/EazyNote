import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { isSessionExists } from "../utils/isSessionExists";

export const noteRoutes = (app: Hono) => {
    const prisma = new PrismaClient();

    app.get('/notes', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        try {
            const notes = await prisma.note.findMany({
                where: {
                    userId: userId
                }
            });

            return c.json(notes, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error fetching notes' }, 500);
        }
    })

    app.post('/notesCreate', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        const { title, description, tag } = await c.req.json();

        try {
            const note = await prisma.note.create({
                data: {
                    title: title,
                    description: description,
                    tag: tag,
                    userId: userId
                }
            })

            return c.json(note, 201);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error creating note' }, 500);
        }
    });

    app.delete('/notesDelete/:id', async (c) => {
        const userId = await isSessionExists(c);

        if (!userId) return c.json({ message: 'Not authorized' }, 401);

        const id = c.req.param('id');

        try {
            await prisma.note.delete({
                where: {
                    id: id,
                    userId: userId
                }
            });

            return c.json({ message: 'Note deleted' }, 200);
        } catch (error) {
            console.error(error);
            return c.json({ message: 'Error deleting note' }, 500);
        }
    });
};