import { Alert, BackHandler, Button, StatusBar} from "react-native";


import { DefaultTheme, NavigationContainer, StackActions } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { GlobalStyles } from "./constants/styles";
import Welcome from "./screens/Welcome";
import Result from "./screens/Result";
import Questions from "./screens/Questions";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

var currentUser = null;

const getUser = async () => {
  try {
    const savedUser = await AsyncStorage.getItem("userData");
    currentUser = JSON.parse(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const App = () => {

  useEffect(() => {
    getUser();
    const backAction = () => {
      Alert.alert("Alert", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: GlobalStyles.colors.primary50,
    },
  };
  return (
    <>
      <StatusBar barStyle={'light'} backgroundColor={GlobalStyles.colors.primary500} />
      <Provider store={Store}>
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator initialRouteName={(currentUser !== null) ? "Welcome" : "Login"}
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
              cardStyle: { backgroundColor: GlobalStyles.colors.error50 }
            }}>
            <Stack.Screen name="Welcome" component={Welcome}
              options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Questions" component={Questions}
              options={{ headerShown: false }} />
            <Stack.Screen name="Result" component={Result}
             options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    onPress={() => {
                      console.log('clicked');
                      async () => {
                        AsyncStorage.clear();
                      
                      }
                      navigation.popToTop();
                    }}
                    title="Logout"
                    color={GlobalStyles.colors.primary500}
                  />
                ),
              })} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
export default App;