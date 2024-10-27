import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { Note } from "../types";
import { NoteContext } from "../contexts/NoteContext";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

const Notes = () => {
    const { avatar } = useContext(AuthContext);
    const { isOpen, setOpen } = useContext(ModalContext);
    const { notes, setNotes, deleteNote, addNote } = useContext(NoteContext);

    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    function formatDate(date: string) {
        const d = new Date(date);
        const dateOptions = { day: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false } as Intl.DateTimeFormatOptions;

        const dateFormated = d.toLocaleDateString('en-GB', dateOptions);
        const timeFormated = d.toLocaleTimeString('en-GB', timeOptions);

        return `${dateFormated} ${timeFormated}`;
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:3000/notes', {
                    credentials: 'include',
                });
                const data = await response.json();

                switch (response.status) {
                    case 200:
                        setNotes(data);
                        break;
                    case 401:
                        console.log('Not authorized');
                        break;
                    case 500:
                        console.log('Error fetching notes');
                        break;
                    default:
                        console.log('Unexpected error');
                }
            } catch {
                console.log('Technical error 😥.');
            }
        }

        fetchNotes();
    }, [setNotes]);

    return (
        <div className="mt-2 w-[1000px] mx-auto">
            <div className="flex justify-between items-end mb-4">
                <Link to='/profile'>
                    <div className="rounded-full size-14 overflow-hidden cursor-pointer">
                        <img
                            className="size-full object-cover"
                            src={avatar!} alt={avatar!}
                        />
                    </div>
                </Link>
                <button
                    className="bg-green-700 w-14 h-7 rounded-sm font-medium"
                    onClick={() => setOpen(true)}
                >
                    Add
                </button>
            </div>
            {
                notes && notes.length != 0
                    ? <div className="columns-3">
                        {
                            notes.map((note: Note) => (
                                <div
                                    className="bg-white/20 mb-4 p-4 rounded-sm break-inside-avoid"
                                    key={note.id}
                                >
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold truncate">{note.title}</h2>
                                        <button
                                            className="flex items-center justify-center size-6"
                                            onClick={() => deleteNote(note.id)}
                                        >
                                            <img
                                                src="delete.png"
                                                alt="delete.png"
                                            />
                                        </button>
                                    </div>
                                    <p className="my-4 break-words">{note.description}</p>
                                    <p className="text-gray-300 text-sm">{note.tag} | {formatDate(note.createdAt)}</p>
                                </div>
                            ))
                        }
                    </div>
                    : <div className="flex justify-center">
                        <span className="text-xl font-bold">
                            There is nothing here yet 🙁
                        </span>
                    </div>
            }

            {
                isOpen &&
                <Modal>
                    <div className='flex items-end justify-between'>
                        <div className='flex gap-6'>
                            <div>
                                <p className='font-bold text-xl'>Title</p>
                                <input
                                    className='outline-none bg-black/20 rounded-sm p-1 focus:ring-2 focus:ring-green-700'
                                    type="text"
                                    ref={titleRef}
                                />
                            </div>
                            <div>
                                <p className='font-bold text-xl'>Tag</p>
                                <input
                                    className='outline-none bg-black/20 rounded-sm p-1 focus:ring-2 focus:ring-green-700'
                                    type="text"
                                    ref={tagRef}
                                />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => addNote(titleRef, tagRef, descriptionRef)}
                                className='bg-green-700 w-14 h-7 rounded-sm font-medium'
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className='bg-red-700 w-14 h-7 rounded-sm font-medium'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className='font-bold text-xl'>Description</p>
                        <textarea
                            className='w-[700px] h-64 resize-none p-1 outline-none bg-black/20 rounded-sm focus:ring-2 focus:ring-green-700'
                            ref={descriptionRef}
                        />
                    </div>
                </Modal>
            }
        </div >
    );
}

export default Notes;