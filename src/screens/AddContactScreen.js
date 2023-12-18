import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
import {addUserToContact, authUser, getOtherUser, getOwnerFriends} from "../providers/utils";
import {AuthContext} from "../store/auth-context";

export const AddContactScreen = ({ navigation }) => {
    const authCtx = useContext(AuthContext)
    const [getNewUser, setNewUser] = useState([]);
    useEffect(() => {
        const fetchNewUsers = async () => {
            try {
                const res = await getOtherUser(authCtx.token);
                setNewUser(res.data); // Assuming the response contains an array of users
            } catch (error) {
                console.error('Error fetching contacts:', error);
                navigation.replace('LogIn')
            }
        };

        // Call the fetchUsers function.
        fetchNewUsers();
    }, []);

    const onPressAddUserToContact = async (userId) => {
        try {
            const res = await addUserToContact(authCtx.token, userId);
            if(res) navigation.replace('Home')
            console.log(res);

        } catch (e) {
            console.error(e)
            navigation.replace('LogIn')
        }
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => onPressAddUserToContact(item.id)}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={getNewUser}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};