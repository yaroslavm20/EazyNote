import React, { createContext, useContext, useState } from "react";
import { Note } from "../types";
import { ModalContext } from "./ModalContext";

type NoteContextType = {
    notes: Note[] | null;
    setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>;
    deleteNote: (id: number) => void;
    addNote: (titleRef: React.RefObject<HTMLInputElement>, tagRef: React.RefObject<HTMLInputElement>, descriptionRef: React.RefObject<HTMLTextAreaElement>) => void;
};

export const NoteContext = createContext<NoteContextType>({
    notes: null,
    setNotes: () => { },
    deleteNote: () => { },
    addNote: () => { },
});

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[] | null>(null);
    const { setOpen } = useContext(ModalContext);

    async function deleteNote(id: number) {
        if (!notes) return;

        try {
            const response = await fetch(`http://localhost:3000/notesDelete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            switch (response.status) {
                case 200:
                    setNotes(notes.filter(note => note.id !== id));
                    break;
                case 401:
                    console.log('Not authorized');
                    break;
                case 404:
                    console.log('Note not found');
                    break;
                default:
                    console.log('Unexpected error');
            }
        } catch {
            console.log('Technical error 😥.');
        }
    }

    async function addNote(
        titleRef: React.RefObject<HTMLInputElement>,
        tagRef: React.RefObject<HTMLInputElement>,
        descriptionRef: React.RefObject<HTMLTextAreaElement>
    ) {
        if (!titleRef.current || !tagRef.current || !descriptionRef.current) return;

        const title = titleRef.current.value;
        const tag = tagRef.current.value;
        const description = descriptionRef.current.value;

        try {
            const response = await fetch('http://localhost:3000/notesCreate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, tag, description }),
                credentials: 'include',
            });

            const data = await response.json();
            switch (response.status) {
                case 201:
                    setNotes(prevNotes => prevNotes ? [...prevNotes, data] : [data]);
                    break;
                case 401:
                    console.log('Not authorized');
                    break;
                case 500:
                    console.log('Error creating note');
                    break;
                default:
                    console.log('Unexpected error');
            }
        } catch {
            console.log('Technical error 😥.');
        }
        finally {
            setOpen(false);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, deleteNote, addNote }}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteProvider;
