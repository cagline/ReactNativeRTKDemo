import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Switch, Text, TextInput, View} from 'react-native';

import {useLazyGetToDoQuery, useLazyGetToDosQuery, useCreateToDoMutation, useUpdateToDoMutation, useDeleteToDoMutation} from '../../api/todoApiSlice';

export function Todo() {

    const [triggerGetToDosQuery, { data: toDos}] = useLazyGetToDosQuery();
    // const [triggerGetToDoQuery, { data: mydata }] = useLazyGetToDoQuery();
    const [triggerCreateToDoMutation, {data, isLoading, error, isError}] = useCreateToDoMutation();
    const [triggerUpdateToDoMutation] = useUpdateToDoMutation();
    const [triggerDeleteToDoMutation] = useDeleteToDoMutation();
    const [todo, setTodo] = useState('');

    useEffect(()=>{
      triggerGetToDosQuery().unwrap()
    },[])

    return (
        <View style={{ flexGrow: 1 }}>
            <Text style={{textAlign: 'center',  fontSize: 20, margin: 20 }}>ToDo API Slice</Text>
            <View style={{ flexDirection: 'row' }}>
            <TextInput
                style={{ flexGrow: 1, textAlign:'center', fontSize: 20, borderStyle:'solid', borderWidth: 1, borderRadius: 2,  borderColor: '#CCCCCC'}}
                aria-label="Set increment amount"
                onChangeText={(value: string) => {
                    setTodo(value)
                }}
            />
            <Button title="Add +" onPress={()=>triggerCreateToDoMutation({title: `${todo}`, isDone: false})}/>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1, marginHorizontal: 50, marginVertical: 20}}>
                {toDos && toDos.map((todo: any) => (
                    <View key={todo.id} style={{ flexDirection: 'row', flexGrow: 1}}>
                        <Text style={{marginBottom: 30, fontSize: 20, flexGrow: 1}}>{todo.title}</Text>
                        <Switch
                            key={todo.id}
                            style={{ alignContent: 'flex-end'}}
                            onValueChange={()=>{
                                triggerUpdateToDoMutation({...todo,isDone: !todo.isDone });
                                todo.isDone = !todo.isDone;
                            }}
                            value={todo.isDone}
                        />
                        <Button title="Delete" onPress={()=>triggerDeleteToDoMutation(todo.id)}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
