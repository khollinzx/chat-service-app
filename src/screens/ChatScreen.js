import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useCallback, useContext, useEffect, useState} from "react";
import {GiftedChat} from "react-native-gifted-chat";
import {useRoute} from "@react-navigation/native";
import {getChatMessage, sendContactMessage} from "../providers/utils";
import {AuthContext} from "../store/auth-context";
import Echo from "laravel-echo";
import Socketio from "socket.io-client";
export const ChatScreen = () => {
    const authCtx = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    // Use the useRoute hook to get the route object
    const route = useRoute();

    // Access the 'contact' prop from the route.params object
    const { contact } = route.params;
    const echo = new Echo({
        broadcaster: 'socket.io',
        host: 'http://localhost:9901/broadcasting/auth/guard=user',
        client: Socketio,
        auth: {
            headers: {
                'Authorization': `Bearer ${authCtx.token}`,
            },
        },
    });

    useEffect(() => {
        echo.channel(`message.${contact.chatKey}`).listen('messageEvent', (data) => {
            console.log('Event received:', data);
        });
        // Fetch chat messages from the backend when the component mounts
        const fetchMessages = async () => {
            try {
                const chatMessages = await getChatMessage(authCtx.token, contact.chatKey);
                // Format the messages to be compatible with GiftedChat
                const formattedMessages = chatMessages.data.map((message) => ({
                    _id: message.id,
                    text: message.message,
                    createdAt: message.date,
                    user: {
                        _id: message.initiatorId,
                    },
                }));
                console.log(contact)
                setMessages(formattedMessages);
            } catch (error) {
                // Handle error
                console.error('Error fetching users:', error);
            }
        };

        fetchMessages();
    }, []);

    // Handle sending a new message
    const onSend = async (newMessages = []) => {
        const chatMessages = await sendContactMessage(authCtx.token, newMessages[0].text, contact.chatKey);
        echo.channel(`message.${contact.chatKey}`).listen('messageEvent', (data) => {
            console.log('Event received:', data);
        });
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    };
    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
                _id: authCtx.user.id, // User ID
            }}
        />
    );
}


