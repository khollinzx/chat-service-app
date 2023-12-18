import * as React from 'react';
import {useContext} from "react";
import "react-native-gesture-handler";
// Your other imports go here
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from "./src/screens/LoginScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {ChatScreen} from "./src/screens/ChatScreen";
import {ContactDetails} from "./src/screens/ContactDetails";
import AuthContextProvider, {AuthContext} from "./src/store/auth-context";
import {StatusBar} from "expo-status-bar";
import {AddContactScreen} from "./src/screens/AddContactScreen";


// Create your main navigator here
const Stack = createStackNavigator();
/**
 * the onboarding screen
 * @returns {Element}
 * @constructor
 */
const OnboardStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LoginScreen} />
        </Stack.Navigator>
    );
}
/**
 *  The Authenticated screens
 * @returns {Element}
 * @constructor
 */
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Users" component={AddContactScreen} />
            <Stack.Screen name="Chats" component={ChatScreen} options={({ route }) => ({ title:  '@'+ (route.params.contact.user.name ?? route.params.contact.user.phone) })} />
            <Stack.Screen name="ContactDetails" component={ContactDetails} />
        </Stack.Navigator>
    );
}
const Navigation = () => {
    const authCtx = useContext(AuthContext)
    return (
            <NavigationContainer>
                {!authCtx.isAuthenticated && <OnboardStack />}
                { authCtx.isAuthenticated && <AuthStack />}
            </NavigationContainer>
    );
}

const App = () => {

  return (
      <>
        <StatusBar style="light" />
        <AuthContextProvider>
            <Navigation />
        </AuthContextProvider>
      </>
  );
}

export default App;

