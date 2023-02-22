import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Switch, Text, TextInput, View,} from 'react-native';

import {
    useCreateToDoMutation,
    useDeleteToDoMutation,
    useLazyGetToDosQuery,
    useUpdateToDoMutation,
} from '../../api/todoApiSlice';

export function Todo() {
    const [triggerGetToDosQuery, {data: toDos}] = useLazyGetToDosQuery();
    // const [triggerGetToDoQuery, { data: mydata }] = useLazyGetToDoQuery();
    const [triggerCreateToDoMutation, {data, isLoading, error, isError}] =
        useCreateToDoMutation();
    const [triggerUpdateToDoMutation] = useUpdateToDoMutation();
    const [triggerDeleteToDoMutation] = useDeleteToDoMutation();
    const [todo, setTodo] = useState('');

    useEffect(() => {
        triggerGetToDosQuery().unwrap();
    }, []);

    return (
        <View style={styles.textinputStyle}>
            <Text style={styles.toDoHeaderStyle}>ToDo API Slice</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={[styles.textinputStyle]}
                    aria-label="Set increment amount"
                    onChangeText={(value: string) => {
                        setTodo(value);
                    }}
                />
                <Button
                    title="Add +"
                    onPress={() =>
                        triggerCreateToDoMutation({title: `${todo}`, isDone: false})
                    }
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                {toDos &&
                toDos.map((todo: any) => (
                    <View key={todo.id} style={{flexDirection: 'row', alignContent: 'center', marginBottom: 10}}>
                        <Text style={styles.toDoAddTxtViewStyle}>{todo.title}</Text>
                        <Switch
                            key={todo.id}
                            style={styles.switchStyle}
                            onValueChange={() => {
                                triggerUpdateToDoMutation({...todo, isDone: !todo.isDone});
                                todo.isDone = !todo.isDone;
                            }}
                            value={todo.isDone}
                        />
                        <Button
                            title="Delete"
                            onPress={() => triggerDeleteToDoMutation(todo.id)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    textinputStyle: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: 21,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 2,
        marginHorizontal: 20,
        borderColor: 'green',
    },
    toDoAddTxtViewStyle: {
        marginBottom: 30,
        fontSize: 20,
        width: 160,
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    scrollViewStyle: {
        flexGrow: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    switchStyle: {
        alignContent: 'flex-end',
        marginRight: 40,
    },
    toDoHeaderStyle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    },
});
