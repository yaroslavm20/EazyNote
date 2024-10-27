import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { avatarArray } from "../assets/avatarArray";
import Input from "../components/UI/Input";
import { configSignUp } from "../configs/formConfigs";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: avatarArray[0]
    });
    const [error, setError] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    avatar: values.avatar
                }),
                credentials: 'include',
            });

            switch (response.status) {
                case 201:
                    navigate('/auth/signin');
                    break;
                case 400:
                    setError("Username or email already in use.");
                    break;
                default:
                    setError("Unexpected error. Please try again.");
            }

        } catch {
            setError("Technical error 😥.");
        }
    }

    function handleChange(e: FormEvent<HTMLInputElement>) {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white/20 rounded-sm p-4 w-[400px]"
            >
                <div>
                    <h2 className="text-2xl font-bold text-center">Sign up</h2>
                </div>
                <div className="size-full flex flex-col gap-4 p-8">
                    {
                        configSignUp.map((input, index) => {
                            const props = input.name === 'confirmPassword' ? { ...input, pattern: values.password } : input;
                            return <Input key={index} {...props} value={values[input.name as keyof typeof values]} onChange={handleChange} />
                        })
                    }
                    <div>
                        <p className="text-center mb-2 font-medium">Select your avatar</p>
                        <div className="columns-3">
                            {
                                avatarArray.map((item, index) => (
                                    <div
                                        className={`rounded-full overflow-hidden mb-3 cursor-pointer ${values.avatar == item ? "outline outline-offset-2 outline-white" : ""}`}
                                        key={index}
                                        onClick={() => setValues({ ...values, avatar: item })}
                                    >
                                        <img src={"/" + item} alt={item} />
                                    </div>
                                ))
                            }
                        </div>
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
                        Sign up
                    </button>
                    <div className="font-medium">
                        <span>Do you have an account? <Link className="text-blue-500" to="/auth/signin">Sign in</Link></span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;