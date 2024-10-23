import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './features/bookingsSlice'


export default configureStore({
    reducer: {
        bookings: bookingsReducer
    }
});