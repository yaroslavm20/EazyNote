import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
    const { updateAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    async function signIn() {
        try {
            const response = await fetch('http://localhost:3000/auth/check', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                updateAuth(data.username, data.email, data.avatar);
                navigate('/notes');
            }
            else
                navigate('/auth/signin');
        } catch {
            navigate('/auth/signin');
        }
    }

    return (
        <div className="h-screen">
            <header className='flex justify-between items-center h-16 px-10'>
                <h1 className='font-bold text-3xl'>EasyNote</h1>
                <div>
                    <button onClick={signIn}>
                        <span className="px-2 py-1 rounded-sm border-2 font-medium">
                            Sign in
                        </span>
                    </button>
                </div>
            </header>
            <div className='flex flex-col justify-center items-center h-[calc(100vh-8rem)] gap-6'>
                <div className='text-center'>
                    <h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">EasyNote – Your Reliable Notebook for Ideas and Tasks!</h2>
                    <p className="font-semibold text-xl mt-2 text-white/70">
                        Keep your notes, plans, and to-dos all in one place.<br />Simple, convenient, and always within reach – EasyNote helps you stay organized and never miss a thing.
                    </p>
                </div>
                <Link to="/auth/signup">
                    <span className="px-8 py-2 rounded-sm border-2 font-semibold text-xl">
                        Get started
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
