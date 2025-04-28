export const validateUserUpdate = (data: any) => {
    const errors: string[] = [];

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("Invalid email format");
    }

    if (data.name && data.name.length < 3) {
        errors.push("Name must be at least 3 characters");
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

export const validatePasswordChange = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

export const validatePostContent = (content: string) => {
    const errors: string[] = [];

    if (content.length < 3) {
        errors.push("Content must be at least 3 characters");
    }

    return {
        valid: errors.length === 0,
        errors
    };
}