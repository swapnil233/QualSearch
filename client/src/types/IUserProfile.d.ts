export interface IUserProfile {
    id: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    password: string;
    googleId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    email: string;
    displayPic: string;
    verified: boolean;
}