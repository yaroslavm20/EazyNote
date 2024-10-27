import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../contexts/ModalContext";
import Modal from "../components/Modal";
import { configChangePassword } from "../configs/formConfigs";
import Input from "../components/UI/Input";

const ProfilePage = () => {
    const { username, email, avatar, updateAuth, updateUsername, updateEmail, deleteAccount, updatePassword } = useContext(AuthContext);
    const { isOpen, setOpen } = useContext(ModalContext);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [valuesPassword, setValuesPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    async function signOut() {
        try {
            const response = await fetch('http://localhost:3000/auth/signout', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                updateAuth(null, null, null);
                navigate('/');
            }
        } catch {
            navigate('/');
        }
    }

    useEffect(() => {
        if (!usernameRef.current) return;

        usernameRef.current.focus();
    }, [isEditingUsername]);

    useEffect(() => {
        if (!emailRef.current) return;

        emailRef.current.focus();
    }, [isEditingEmail]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        updatePassword(valuesPassword.oldPassword, valuesPassword.newPassword);
        setOpen(false);
    }

    return (
        <div className="flex gap-4 mt-2 w-[1000px] mx-auto">
            <div>
                <div className="size-64 overflow-hidden rounded-full">
                    <img
                        className="size-full object-cover"
                        src={avatar!} alt={avatar!}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-white/40">USERNAME</p>
                            <input
                                className={`outline-none rounded-sm bg-transparent w-full ${!isEditingUsername && "hidden"}`}
                                type="text"
                                defaultValue={username!}
                                placeholder="Enter new username"
                                ref={usernameRef}
                            />
                            <p className={`${isEditingUsername && "hidden"}`}>{username}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 bg-white/40 rounded-sm"
                                onClick={() => setIsEditingUsername(!isEditingUsername)}
                            >
                                {
                                    isEditingUsername
                                        ? "Cansel"
                                        : "Edit"
                                }
                            </button>
                            {isEditingUsername &&
                                <button
                                    className="px-3 py-1 rounded-sm bg-green-700"
                                    onClick={() => {
                                        if (!usernameRef.current) return;

                                        updateUsername(usernameRef.current.value);
                                        setIsEditingUsername(!isEditingUsername);
                                    }}
                                >
                                    Save
                                </button>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-white/40">EMAIL</p>
                            <input
                                className={`outline-none rounded-sm bg-transparent w-full ${!isEditingEmail && "hidden"}`}
                                type="text"
                                defaultValue={email!}
                                placeholder="Enter new email"
                                ref={emailRef}
                            />
                            <p className={`${isEditingEmail && "hidden"}`}>{email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 bg-white/40 rounded-sm"
                                onClick={() => setIsEditingEmail(!isEditingEmail)}
                            >
                                {
                                    isEditingEmail
                                        ? "Cansel"
                                        : "Edit"
                                }
                            </button>
                            {isEditingEmail &&
                                <button
                                    className="px-3 py-1 rounded-sm bg-green-700"
                                    onClick={() => {
                                        if (!emailRef.current) return;

                                        updateEmail(emailRef.current.value);
                                        setIsEditingEmail(!isEditingEmail);
                                    }}
                                >
                                    Save
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setOpen(true)}
                        className="p-2 rounded-sm bg-green-700"
                    >Change password
                    </button>
                    <button
                        onClick={() => {
                            deleteAccount();
                            navigate('/');
                        }}
                        className="p-2  rounded-sm bg-red-700">Delete an account</button>
                    <button
                        onClick={signOut}
                        className="p-2 rounded-sm bg-white/40"
                    >Sign out
                    </button>
                </div>
            </div>
            {
                isOpen &&
                <Modal>
                    <form
                        className="flex flex-col gap-6 m-2"
                        onSubmit={handleSubmit}
                    >
                        {
                            configChangePassword.map((input, index) => {
                                const props = input.name === 'confirmPassword' ? { ...input, pattern: valuesPassword.newPassword } : input;

                                return <Input
                                    key={index}
                                    {...props}
                                    value={valuesPassword[input.name as keyof typeof valuesPassword]}
                                    onChange={(e) => setValuesPassword({ ...valuesPassword, [input.name]: e.target.value })}
                                />
                            })
                        }
                        <div className="flex justify-center items-center gap-3">
                            <button
                                type="submit"
                                className="py-2 w-2/6 rounded-sm bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                className="py-2 w-2/6 rounded-sm bg-red-700"
                                onClick={() => setOpen(false)}
                                type="button"
                            >
                                Cansel
                            </button>
                        </div>
                    </form>
                </Modal>
            }
        </div>
    );
}

export default ProfilePage;