import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody;
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to sign out")
    }
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Token is not valid")
    }

    return response.json()
}

export const addMyHotel = async (hotelForm: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        method: "POST",
        credentials: "include",
        body: hotelForm
    })

    if (!response.ok) {
        throw new Error("Failed to add hotel");
    }

    return response.json();
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to fetch hotels");
    }

    return response.json();
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Failed to fetch hotel");
    }
    return response.json();
}

export const updateMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData
    })

    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }

    return response.json();
}

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[],
    types?: string[],
    stars?: string[],
    maxPrice?: string,
    sortOption?: string
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    // console.log("searchParams: ", searchParams);
    const queryParams = new URLSearchParams();
    queryParams.append("page", searchParams.page || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    searchParams.facilities?.forEach(facility => queryParams.append("facilities", facility));
    searchParams.types?.forEach(facility => queryParams.append("types", facility));
    searchParams.stars?.forEach(facility => queryParams.append("stars", facility));
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
    // console.log(queryParams);    
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
}

export const googleLogin = async (token: any | undefined): Promise<any> => {
    console.log(token)
    const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: 'POST',
        body: JSON.stringify(token),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

    })

    if (!response.ok) {
        throw new Error("Failed to update hotel");
    }

    return response.json();
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {

    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
}
