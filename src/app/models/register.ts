export interface Register {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    genderId: number;
    phone: string;
}

export interface Login {
    email: string;
    password: string;
}