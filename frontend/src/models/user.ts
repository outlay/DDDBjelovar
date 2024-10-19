export enum UserRole {
    ROLE_APPLICANT = "ROLE_APPLICANT",
    ROLE_CITY_SERVICE = "ROLE_CITY_SERVICE",
    ROLE_JANITOR = "ROLE_JANITOR",
    ROLE_MAYOR = "ROLE_MAYOR",
}

type UserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
};

export type { UserResponse };
