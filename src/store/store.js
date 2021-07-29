import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer/contents'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})