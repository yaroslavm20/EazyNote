import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    username: string | null;
    email: string | null;
    avatar: string | null;
    updateAuth: (username: string | null, email: string | null, avatar: string | null) => void;
    updateUsername: (username: string) => void;
    updateEmail: (email: string) => void;
    deleteAccount: () => void;
    updatePassword: (oldPassword: string, newPassword: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
    username: null,
    email: null,
    avatar: null,
    updateAuth: () => { },
    updateUsername: () => { },
    updateEmail: () => { },
    deleteAccount: () => { },
    updatePassword: () => { },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username') || null);
    const [email, setEmail] = useState<string | null>(localStorage.getItem('email') || null);
    const [avatar, setAvatar] = useState<string | null>(localStorage.getItem('avatar') || null);

    useEffect(() => {
        localStorage.setItem('username', username || '');
        localStorage.setItem('email', email || '');
        localStorage.setItem('avatar', avatar || '');
    }, [username, email, avatar]);

    function updateAuth(username: string | null, email: string | null, avatar: string | null) {
        setUsername(username);
        setEmail(email);
        setAvatar(avatar);
    }

    async function updateUsername(username: string) {
        try {
            const response = await fetch('http://localhost:3000/account/update/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username }),
            });

            if (response.ok) {
                setUsername(username);
            }
        } catch {
            console.log('Failed to update username');
        }
    }


    async function updateEmail(email: string) {
        try {
            const response = await fetch('http://localhost:3000/account/update/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setEmail(email);
            }
        } catch {
            console.log('Failed to update email');
        }
    }

    async function updatePassword(oldPassword: string, newPassword: string) {
        try {
            const response = await fetch('http://localhost:3000/account/update/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            if (response.ok) {
                console.log('Password updated');
            }
        } catch (error) {
            console.error(error);
            console.log('Failed to update password');
        }
    }

    async function deleteAccount() {
        try {
            const response = await fetch('http://localhost:3000/account/delete', {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                updateAuth(null, null, null);
            }
        } catch {
            console.log('Failed to delete account');
        }
    }


    return (
        <AuthContext.Provider value={{ username, email, avatar, updateAuth, updateUsername, updateEmail, deleteAccount, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
