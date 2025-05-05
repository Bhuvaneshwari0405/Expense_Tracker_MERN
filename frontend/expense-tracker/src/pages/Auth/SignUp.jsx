import React from "react";

const SignUp = () => {
    return (
        <div>
            <h1>Sign Up Page</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default SignUp;