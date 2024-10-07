import React from "react"
import Link from "next/link"
import  { AuthStatus } from "../types/auth"

const UserMenu: React.FC<AuthStatus> = ({ user }) => {
    if (user) {
        return (
            <div className="user-menu">
                <span>Welcome, {user.username}!</span>
                <Link href="/profile">Profile</Link>
                <Link href="/logout">Logout</Link>
            </div>
        );
    }

    return (
        <div className="auth-links">
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
        </div>
    );
};

export default UserMenu;