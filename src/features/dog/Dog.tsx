import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Text, TextInput, View} from 'react-native';

import {useFetchBreedQuery, useLazyFetchBreedQuery} from '../../api/dogApiSlice';


export function Dog() {

    const {data = [], isFetching, error} = useFetchBreedQuery();
    const [triggerFetchBreedQuery, { data: mydata }] = useLazyFetchBreedQuery();



    useEffect(()=>{
        triggerFetchBreedQuery().unwrap();
    },[])

    return (
        <View style={{ flexGrow: 1 }}>
            <Text style={{textAlign: 'center',  fontSize: 20, margin: 20 }}>Dog API Slice</Text>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                {data.map((breed: any) => (
                    <View key={breed.id} style={{ alignItems: 'center'}}>
                        <Image
                            source={{uri: breed.image.url}}
                            style={{height: 300, aspectRatio: 1, borderRadius: 150}}
                        />
                        <Text style={{ textAlign: 'center',marginBottom: 30, fontSize: 20}}>{breed.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
