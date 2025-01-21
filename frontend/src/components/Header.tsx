import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-indigo-700 py-4">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-yellow-300 font-bold tracking-tight">
                    <Link to="/">MernHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                        <Link className="flex items-center text-yellow-300 px-3 font-bold hover:bg-indigo-600" to="/my-bookings">My Bookings</Link>
                        <Link className="flex items-center text-yellow-300 px-3 font-bold hover:bg-indigo-600" to="/my-hotels">My Hotels</Link>
                        <SignOutButton />
                    </> : <Link to="/sign-in" className="flex bg-yellow-300 items-center text-indigo-700 px-3 font-bold hover:bg-yellow-400">Sign In</Link>}
                </span>
            </div>
        </div>
    )
}

export default Header;
