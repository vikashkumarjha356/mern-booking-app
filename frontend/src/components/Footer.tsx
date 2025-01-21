const Footer = () => {
    return (
        <div className="bg-indigo-700 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-yellow-300 font-bold tracking-tight">
                    MernHolidays.com
                </span>
                <span className="text-yellow-300 font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer hover:text-yellow-400">Privacy Policy</p>
                    <p className="cursor-pointer hover:text-yellow-400">Terms and Conditions</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;
