import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/UI/Input";
import { configSignIn } from "../configs/formConfigs";

const SingInPage = () => {
    const { updateAuth } = useContext(AuthContext);
    const navegate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                }),
                credentials: 'include',
            });

            const data = await response.json();

            switch (response.status) {
                case 200:
                    updateAuth(values.username, data.email, data.avatar);
                    navegate('/notes', { replace: true });
                    break;
                case 400:
                    setError("Invalid username or password.");
                    break;
                case 404:
                    setError("Username not found.");
                    break;
                default:
                    setError("Unexpected error. Please try again.");
            }
        } catch {
            setError("Technical error 😥.");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white/20 rounded-sm p-4 w-[400px]"
            >
                <div>
                    <h2 className="text-2xl font-bold text-center">Sign in</h2>
                </div>
                <div className="size-full flex flex-col gap-4 p-8 ">
                    {
                        configSignIn.map((input, index) => (
                            <Input
                                key={index}
                                {...input}
                                value={values[input.name as keyof typeof values]}
                                onChange={(e) => setValues({ ...values, [input.name]: e.currentTarget.value })}
                            />
                        ))
                    }
                    <div className="flex justify-end">
                        <Link to="#" className="text-center">Forgot password?</Link>
                    </div>
                    {
                        error &&
                        <div className="flex justify-center items-center h-10 border-2 border-red-500 rounded-sm bg-red-500/5 font-medium text-red-500">
                            <p>
                                {error}
                            </p>
                        </div>
                    }
                    <button
                        type="submit"
                        className="bg-green-700 w-full h-10 rounded-sm font-medium"
                    >
                        Sign in
                    </button>
                    <div className="font-medium">
                        <span>Dont have an account? <Link className="text-blue-500" to="/auth/signup">Sign up</Link></span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SingInPage;