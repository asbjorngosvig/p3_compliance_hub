import {useState} from "react";
import {Button} from '../../shared/components/Buttons.tsx'

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-full max-w-md mx-auto border rounded-2xl p-6 bg-slate-50 shadow-sm border-gray-200">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-black">Login</h2>
                <p className="text-gray-600 text-sm">
                    Enter your email below to login to your account
                </p>
            </div>


            <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-black text-left">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="firstname.lastname@uniwise.dk"
                        className="border border-gray-500 rounded-lg p-2 text-black placeholder-gray-400 focus:outline-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-black">
                            Password
                        </label>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder={"Enter password here"}
                        className="border border-gray-500 placeholder-gray-400 rounded-lg p-2 text-black focus:outline-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className="w-full">Login</Button>
            </div>
        </div>
    );
};

export default LoginCard;
