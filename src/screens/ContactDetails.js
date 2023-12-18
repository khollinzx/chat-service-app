import React from 'react';
import { View, Text } from 'react-native';

export const ContactDetails = ({ route }) => {
    const { contact } = route.params;

    return (
        <View>
            <Text>Name: {contact.name}</Text>
            <Text>Phone: {contact.phone}</Text>
        </View>
    );
};