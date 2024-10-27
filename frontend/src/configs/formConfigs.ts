export const configSignIn = [
    {
        type: 'text',
        name: 'username',
        placeholder: 'Enter your username',
        required: true,
        pattern: '^[a-zA-Z0-9_]{3,}$',
        errorMessage: "Username must be at least 3 characters long."

    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        pattern: '^[a-zA-Z0-9_]{8,}$',
        errorMessage: "Password must be at least 8 characters long."
    }
];

export const configSignUp = [
    {
        type: 'text',
        name: 'username',
        placeholder: 'Enter your username',
        required: true,
        autoComplete: 'off',
        pattern: '^[a-zA-Z0-9_]{3,}$',
        errorMessage: "Username must be at least 3 characters long."

    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
        autoComplete: 'off',
        pattern: '^[a-z0-9._%+-]+@[a-z09.-]+\\.[a-z]{2,4}$',
        errorMessage: "Invalid email."
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        pattern: '^[a-zA-Z0-9_]{8,}$',
        errorMessage: "Password must be at least 8 characters long."
    },
    {
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'Confirm your password',
        required: true,
        errorMessage: "Passwords do not match."
    }
];

export const configChangePassword = [
    {
        label: 'Enter your current password',
        type: 'password',
        name: 'oldPassword',
        required: true,
        pattern: '^[a-zA-Z0-9_]{8,}$',
        errorMessage: "Password must be at least 8 characters long."
    },
    {
        label: 'Enter your new password',
        type: 'password',
        name: 'newPassword',
        required: true,
        pattern: '^[a-zA-Z0-9_]{8,}$',
        errorMessage: "Password must be at least 8 characters long."
    },
    {
        label: 'Confirm your new password',
        type: 'password',
        name: 'confirmPassword',
        required: true,
        errorMessage: "Passwords do not match."
    }
];