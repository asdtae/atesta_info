import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getCurrentUser = async () => {
    const token = (await cookies()).get('authToken')?.value;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        //console.log(decoded as { id: string; email: string; name: string });

        return decoded as { id: string; email: string; name: string };
    } catch (error) {
        return null;
    }
};

export const refreshSession = async (userId: string) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
    cookies().set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    });
};