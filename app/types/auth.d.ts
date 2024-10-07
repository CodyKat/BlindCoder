import { User } from "./user"

export interface AuthStatus {
    user?: User | null;
}