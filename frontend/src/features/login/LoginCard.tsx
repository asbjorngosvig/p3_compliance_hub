import {useEffect, useState} from "react";
import {Button} from '../../shared/components/Buttons.tsx'
import {authService} from "../../shared/services/AuthService.ts";
import {useNavigate} from "react-router-dom";
import { Loader } from "../../shared/components/Loader.tsx";

export default function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        checkIfLoggedIn();
    })

    const checkIfLoggedIn = async () => {
        try {
            await authService.checkIfLoggedIn();
            navigate("/dashboard")
        } catch {

        }
    }

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await authService.login({"username": email, password});
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid email or password");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex justify-center w-full max-w-md mx-auto border rounded-2xl p-6 bg-white text-neutral-300 shadow-sm">
            <form className="w-full">
            <div className="mb-10">
                <h2 className="text-center text-2xl font-semibold text-slate-700">Login</h2>
            </div>

            <div className="space-y-12">
                <div className="flex flex-col space-y-1 ">
                    <label htmlFor="email" className="text-md font-medium text-slate-700 text-left">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="firstname.lastname@uniwise.dk"
                        className="border border-slate-400 rounded-lg p-2 text-black placeholder-gray-400 focus:outline-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-md font-medium text-slate-700">
                            Password
                        </label>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        className="border border-slate-400 placeholder-gray-400 rounded-lg p-2 text-black focus:outline-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div className="flex flex-col space-y-1">
                <Button variant={"primary"} onClick={(e) => { e.preventDefault(); handleLogin(); }} >
                    {(isLoading ? <Loader/> : "Login" )}
                </Button>
                </div>
            </div>
            </form>
        </div>
    );
};


