import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation, use} from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import {useContext, useState} from "react";
import {authUser} from "../providers/utils";
import {AuthContext} from "../store/auth-context";

export const LoginScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext)
    const onPressLogin = async () => {
        try {
            setLoading(true)
            const res = await authUser({phone, password});
            authCtx.authenticate(res.data)
            // authCtx.setUserProfile(res.data.profile)
            // navigation.replace('Home');
            setLoading(false)

        } catch (e) {
            console.error(e)
        }
    };

    if(isLoading) {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={true}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Chat App.</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Phone"
                    keyboardType="numeric"
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setPhone(text)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    onChangeText={(text) => setPassword(text)}/>
            </View>
            <TouchableOpacity
                onPress = {onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeded',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontWeight: "bold",
        fontSize:20,
        color:"#7874ef",
        marginBottom: 40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"#788181",
        borderRadius:25,
        height:50,
        opacity:12,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgotAndSignUpText:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#7874ef",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color: "#fff"
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

