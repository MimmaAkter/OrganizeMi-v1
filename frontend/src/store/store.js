import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { api } from "./apiSlice";


const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        api.middleware,
    ],
});


export default store;