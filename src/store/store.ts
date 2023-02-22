import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {combineReducers} from 'redux';
import {apiSlice as dogApiSlice} from '../api/dogApiSlice';
import {apiSlice as toDoApiSlice} from '../api/todoApiSlice';

const reducers = combineReducers({
    counter: counterReducer,
    [dogApiSlice.reducerPath]: dogApiSlice.reducer,
    [toDoApiSlice.reducerPath]: toDoApiSlice.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(dogApiSlice.middleware).concat(toDoApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
