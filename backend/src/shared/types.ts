export interface HotelType {
    _id: string;
    userId: string | undefined;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[]
}

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}

export type UserType = {
    _id: string,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    googleId?: string | null
}

export type PaymentIntentResponse = {
    paymentIntentId: string
    clientSecret: string,
    totalCost: number
}

export type BookingType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number
}