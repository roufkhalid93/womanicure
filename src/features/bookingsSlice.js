import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Async thunk for saving new bookings 
export const saveBookings = createAsyncThunk(
    "bookings/saveBookings",
    async ({ primaryService, secondaryService, date, time, name, phoneNumber, specialRequest, user_id }) => {
        try {
            console.log({ primaryService, secondaryService, date, time, name, phoneNumber, specialRequest, user_id });


            const response = await axios.post('https://d983f4ac-fa45-4cd9-ad8f-72a9e77a4584-00-1b81doay5gvy8.pike.replit.dev/womanicure', {
                primary_service: primaryService,
                secondary_service: secondaryService,
                date,
                time,
                name,
                phone_number: phoneNumber,
                special_request: specialRequest,
                user_id
            })

            const data = response.data;

            return data;
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

// export const fetchBookings = createAsyncThunk(
//     "bookings/fetchBookings",
//     async () => {
//         try {
//             const response = await axios.get(`https://51af7fd5-0db9-40fe-939e-2c2935cf3610-00-1u6y7ycmfvryb.pike.replit.dev/womanicure`)
//             const data = response.data;

//             return data;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// )

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: { bookings: [], loading: true },
    extraReducers: (builder) => {
        builder
            .addCase(saveBookings.fulfilled, (state, action) => {
                state.bookings = [...state.bookings, action.payload]
            })
        // .addCase(fetchBookings.fulfilled, (state, action) => {
        //     state.bookings = action.payload;
        //     state.loading = false;
        // })
    }
})

export default bookingsSlice.reducer;