const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-2xl text-white font-bold tracking-tight">
                    MernHolidays.com
                </span>
                <span className="text-white font-semibold tracking-tight flex gap-6">
                    <p className="cursor-pointer hover:text-gray-300">Privacy Policy</p>
                    <p className="cursor-pointer hover:text-gray-300">Terms and Conditions</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;
