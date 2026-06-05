
export type Credentials = {
    email: string,
    password: string;
    role?: string;
}

export const validUser: Credentials = {
    email: "user@example.com",
    password: "password123"
};  

export const invalidUser: Credentials = {
    email: "invalid@example.com",
    password: "wrongpassword"
};  

export function getLoginUrl (env: string): string {
    return `https://${env}.example.com/login`
}
