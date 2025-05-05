import React, { useState } from "react";
import AuthLayout from "/src/components/layouts/AuthLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import Input from "/src/components/Inputs/input.jsx";
import { validateEmail } from "/src/utils/helper.js";
import ProfilePhotoSelector from "/src/components/Inputs/ProfilePhotoSelector.jsx";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!profilePic) {
      setError("Please upload a profile picture.");
        return;
    }
    if (!fullName) {
        setError("Please enter your full name.");
        return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");
    //SignUp API call
  };
  return (
    <AuthLayout>
      <div className="">
        <h3 className="text-xl font-semibold text-black">Sign Up</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Create an account to start tracking your expenses.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="E-mail"
            placeholder=""
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 6 characters"
            type="password"
          />

           {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                    <button type="submit" className="btn-primary">
                      SignUp
                    </button>
                    <p className="text-xs text-slate-700 mt-4">
                      Have an account?{" "}
                      <Link className="font-medium text-primary underline" to="/login">
                        Login here
                      </Link>
                    </p>
        </form>
        
      </div>
    </AuthLayout>
  );
};
export default SignUp;
