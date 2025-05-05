import React,{useState}  from "react";
import card2 from "../../assets/images/card2.jpg";
import AuthLayout from "/src/components/layouts/AuthLayout.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Login</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">

                    Welcome back! Please login to your account.
                </p>
                <form onSubmit={handleLogin}>
                    <input value={email} onChange={({target }) => setEmail(target.value)}
                    label="E-mail" placeholder="abc@example.com" type="text" />

                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
