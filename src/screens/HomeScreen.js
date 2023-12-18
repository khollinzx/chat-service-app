import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import contacts from '../providers/contact';
import {authUser, getOwnerFriends} from "../providers/utils";
import {AuthContext} from "../store/auth-context";

export const HomeScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext)
    const [users, setFriends] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('token: ', authCtx)
                const res = await getOwnerFriends(authCtx.token);
                setFriends(res.data); // Assuming the response contains an array of users
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        // Call the fetchUsers function.
        fetchUsers();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Chats', { contact: item })}
        >
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.user.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.user.phone}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    return (
        <View>
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    top: 390,
                    right: 20,
                    height: 70,
                    backgroundColor: 'red',
                    borderRadius: 100,
                }}
                onPress={() => navigation.replace('Users')}>
                <Text style={{color: "white", textAlign: "center"}}>Add Contacts</Text>
            </TouchableOpacity>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};