
import { useDispatch } from "react-redux";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Welcome";
import Questions from "./Questions";
import Login from "./Login";
import Result from "./Result";
import { GlobalStyles } from "../constants/Styles";
import { clearData } from "../redux/Reducer";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

function Main() {
    var currentUser = null;
    const dispatch = useDispatch();
    const appTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };

    useEffect(() => {
        getUser();
    })

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("userData");
            currentUser = JSON.parse(savedUser);
        } catch (error) {
            console.log(error);
        }
    };

    const clearAppData = async function () {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            dispatch(clearData());
        } catch (error) {
            console.error('Error clearing app data.');
            console.error(error);
        }
    }

    return (
        <NavigationContainer theme={appTheme} >
            <Stack.Navigator initialRouteName={(currentUser !== null) ? "Welcome" : "Login"}
                screenOptions={{
                    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                    headerTintColor: 'white',
                }}>
                <Stack.Screen name="Welcome" component={Welcome}
                    options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Questions" component={Questions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Result" component={Result}
                    options={({ navigation }) => ({
                        headerBackVisible:false,
                        headerRight: () => (
                            <Button
                                onPress={() => {
                                    console.log('logout clicked');
                                    clearAppData();
                                    navigation.popToTop();
                                }}
                                title="Logout"
                                color={GlobalStyles.colors.primary500}
                            />
                        ),
                    })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;