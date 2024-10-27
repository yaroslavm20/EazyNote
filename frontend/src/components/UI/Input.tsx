import { useState } from 'react';
import './Input.css';

type InputProps = {
    type: string;
    label?: string;
    name: string;
    placeholder?: string;
    required: boolean;
    value: string;
    pattern?: string;
    errorMessage: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
    const { onChange, errorMessage, label, ...inputProps } = props;
    const [focused, setFocused] = useState(false);

    function handleBlur() {
        setFocused(true);
    }

    if (!label)
        return (
            <div>
                <input
                    className="outline-none rounded-sm bg-black/20 p-2 w-full custom-input"
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleBlur}
                    data-focused={focused.toString()}
                />
                <p className="font-medium text-red-600 error">{errorMessage}</p>
            </div>
        );

    return (
        <div >
            <label className="font-medium">{label}</label>
            <input
                className="outline-none rounded-sm bg-black/20 p-2 w-full custom-input"
                {...inputProps}
                onChange={onChange}
                onBlur={handleBlur}
                data-focused={focused.toString()}
            />
            <p className="font-medium text-red-600 error">{errorMessage}</p>
        </div >
    )
}

export default Input;
