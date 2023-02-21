import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../store/store';
import {fetchCount} from './counterAPI';

export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
    incrementAmount: number;
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
    incrementAmount: 2,
};

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount);
        return response.data;
    },
);

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        changeIncrementAmount: (state, action: PayloadAction<number>) => {
            console.info(state, action);
            state.incrementAmount = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    },
});

export const {increment, decrement, incrementByAmount, changeIncrementAmount} =
    counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export const selectIncrementByAmount = (state: RootState) =>
    state.counter.incrementAmount;

export const incrementIfOdd =
    (amount: number): AppThunk =>
        (dispatch, getState) => {
            const currentValue = selectCount(getState());
            if (currentValue % 2 === 1) {
                dispatch(incrementByAmount(amount));
            }
        };

export default counterSlice.reducer;
