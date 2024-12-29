export const sessionOptions = {
    password: process.env.IRON_SESSION_COOKIE_PASSWORD,
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    }
}