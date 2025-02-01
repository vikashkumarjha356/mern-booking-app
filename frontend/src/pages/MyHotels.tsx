import { BsBuilding, BsMap } from "react-icons/bs";
import {  BiMoney, BiStar } from "react-icons/bi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const MyHotels = () => {
    const { data: hotelData } = useQuery("my-hotels", apiClient.fetchMyHotels, {
        onError: (error) => {
            console.log("Error fetching hotels: ", error);
        }
    });

    return (
        <div className="container mx-auto p-6 space-y-5">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-indigo-700">My Hotels</h1>
                <Link to="/add-hotel" className="bg-indigo-600 text-white text-base font-medium py-2 px-4 rounded hover:bg-indigo-500 transition duration-300">
                    Add Hotel
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotelData?.map((hotel) => (
                    <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
                        <h2 className="text-xl font-semibold text-indigo-600">{hotel.name}</h2>
                        <div className="whitespace-pre-line text-gray-700 mt-2 overflow-hidden overflow-ellipsis max-h-24">{hotel.description}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-2 text-indigo-600" />
                                <span className="text-gray-700">{hotel.city}, {hotel.country}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-2 text-indigo-600" />
                                <span className="text-gray-700">{hotel.type}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-2 text-indigo-600" />
                                <span className="text-gray-700">{hotel.pricePerNight}/night</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-2 text-indigo-600" />
                                <span className="text-gray-700">{hotel.starRating} stars</span>
                            </div>
                        </div>
                        <Link to={`/edit-hotel/${hotel._id}`} className="mt-4 text-indigo-600 hover:underline">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;