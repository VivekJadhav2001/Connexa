export const getPasswordScore = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
};

export const getStrengthColor = (strength) => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-400";
    return "bg-green-500";
};
