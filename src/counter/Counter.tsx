/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Text, TextInput, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {useFetchBreedQuery, useLazyFetchBreedQuery} from '../api/dogApiSlice';

import {
    changeIncrementAmount,
    decrement,
    increment,
    incrementByAmount,
    selectCount,
    selectIncrementByAmount,
} from './counterSlice';

export function Counter() {
    const count = useAppSelector(selectCount);
    const inAmount = useAppSelector(selectIncrementByAmount);

    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    const {data = [], isFetching, error} = useFetchBreedQuery();
    const [triggerFetchBreedQuery, { data: mydata }] = useLazyFetchBreedQuery();



    useEffect(()=>{
        triggerFetchBreedQuery().unwrap();
    },[])

    return (
        <View style={{ alignItems: 'center' }}>
            <Text  style={{ color: 'red' }}>For Event ref</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Button onPress={() => dispatch(decrement())} title="-"/>
                <Text>{count}</Text>
                <Button onPress={() => dispatch(increment())} title="+"/>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                    aria-label="Set increment amount"
                    value={`${inAmount}`}
                    onChange={(e: any) => {
                        const val: number = Number(e.target.value);
                        dispatch(changeIncrementAmount(val));
                    }}
                />
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Button
                        onPress={() => dispatch(incrementByAmount(inAmount))}
                        title="Add Amount"
                    />

                    <Button
                        onPress={() => dispatch(incrementByAmount(inAmount))}
                        title="Add Async"
                    />
                    <Button
                        onPress={() => dispatch(incrementByAmount(inAmount))}
                        title="Add If Odd"
                    />
                </View>
            </View>
            <View>
                <Text>For API Ref</Text>
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    {data.map((breed: any) => (
                        <View key={breed.id}>
                            <Image
                                source={{uri: breed.image.url}}
                                style={{height: 300, aspectRatio: 1}}
                            />
                            <Text style={{marginBottom: 10}}>{breed.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
