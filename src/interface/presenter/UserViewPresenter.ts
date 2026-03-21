import type { User } from "../../domain/entities/User/User.js";

export type UserViewData = {
    id: string;
    name: string;
    email: string;
};

export const toUserViewData = (user: User): UserViewData => ({
    id: user.id.getValue(),
    name: user.name,
    email: user.email,
});
