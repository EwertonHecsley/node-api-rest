import crypto from 'crypto';

export const generateAleatoryPassword = () => {
    const bytes = crypto.randomBytes(4);
    return bytes.toString('hex');
};

