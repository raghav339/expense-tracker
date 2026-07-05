import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Logout() {
    useEffect(() => {
        async function logg() {
            await fetch("http://localhost:3000/logout", {
                credentials: "include"
            });
        }

        logg();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Logged Out!</h1>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <Link to="/signin">Signin</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/">Homepage</Link>
            </div>
        </>
    );
}