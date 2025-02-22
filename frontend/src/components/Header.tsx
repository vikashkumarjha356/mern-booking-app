import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-4 shadow-md">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                <span className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="flex items-center text-white px-3 font-bold hover:text-gray-200 hover:underline"
                                to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <Link
                                className="flex items-center text-white px-3 font-bold hover:text-gray-200 hover:underline"
                                to="/my-hotels"
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex bg-white items-center text-blue-600 px-4 py-2 rounded-lg font-bold shadow hover:bg-gray-100 hover:text-blue-700"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
