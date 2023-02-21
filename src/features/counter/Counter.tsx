import React, { useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

import {
    changeIncrementAmount,
    decrement,
    increment, incrementAsync,
    incrementByAmount, incrementIfOdd,
    selectCount,
    selectIncrementByAmount,
} from './counterSlice';

export function Counter() {
    const count = useAppSelector(selectCount);
    const inAmount = useAppSelector(selectIncrementByAmount);

    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 20,  margin: 20 }}>Counter Reducer Slice</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Button onPress={() => dispatch(decrement())} title="-" />
                <Text style={{ textAlign: 'center', fontSize: 20,  margin: 10 }}>{count}</Text>
                <Button onPress={() => dispatch(increment())} title="+" />
            </View>
            <View style={{ alignItems: 'center'}}>
                <TextInput
                    style={{ margin: 10, textAlign:'center', fontSize: 20, borderStyle:'solid', borderWidth: 1, borderRadius: 2,  borderColor: '#CCCCCC'}}
                    aria-label="Set increment amount"
                    value={inAmount.toString()}
                    keyboardType="numeric"
                    onChangeText={(e: any) => {
                        console.log(e)
                        const val: number = Number(e) || 0;
                        dispatch(changeIncrementAmount(val));
                    }}
                />
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Button
                        onPress={() => dispatch(incrementByAmount(inAmount))}
                        title="Add Amount"
                    />

                    <Button
                        onPress={() => dispatch(incrementAsync(inAmount))}
                        title="Add Async"
                    />
                    <Button
                        onPress={() => dispatch(incrementIfOdd(inAmount))}
                        title="Add If Odd"
                    />
                </View>
            </View>
        </View>
    );
}
