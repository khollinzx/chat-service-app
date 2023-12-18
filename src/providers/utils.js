import {API, Headers} from "./configs";
import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}
export const authUser = async ({phone, password}) => {
    try {
        const response = await axios.post(`${API}onboard/signin`, {phone: phone, password: password}, { headers: headers})
        if(response.data.status !== true) alert(response.data.message)

        console.log(response.data);
        return response.data;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}
export const sendContactMessage = async (token, message, chatKey) => {
    try {
        const response = await axios.post(`${API}chats/${chatKey}/send?guard=user`, { message: message}, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }})
        if(response.data.status !== true) alert(response.data.message)

        console.log(response.data);
        return response.data;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}

export const addUserToContact = async (token, userId) => {
    try {
        const response = await axios.post(`${API}chats/add-to-contact/${userId}?guard=user`, {}, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }})
        if(response.data.status !== true)
            return false;

        return true;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}

export const getOwnerFriends = async (token) => {
    try {
        // console.log(authCtx.token);
        const response = await axios.get(`${API}chats/my-contacts?guard=user`, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }})
        // if(response.data.status !== true) alert(response.data.message)

        console.log(response.data);
        return response.data;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}

export const getOtherUser = async (token) => {
    try {
        // console.log(authCtx.token);
        const response = await axios.get(`${API}chats/users/pull?guard=user`, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }})
        // if(response.data.status !== true) alert(response.data.message)

        console.log(response.data);
        return response.data;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}

export const getChatMessage = async (token,chatKey) => {
    try {
        // console.log(authCtx.token);
        const response = await axios.get(`${API}chats/get-my-messages/${chatKey}/?guard=user`, { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }})
        // if(response.data.status !== true) alert(response.data.message)

        console.log(response.data);
        return response.data;

    } catch (error) {
        alert(error.response.data.message)
        // console.error(error);
    }
}