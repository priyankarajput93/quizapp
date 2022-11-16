import { TextInput, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import Button from "../ui/Button";
import { addUserName, addUserPassword } from "../redux/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

function Login({ navigation }) {

    const enteredName = useSelector(state => state.appReducer.userName);
    const enteredPassword = useSelector(state => state.appReducer.userPassword);

    const userData = {
        name: enteredName,
        password: enteredPassword
    };

    const dispatch = useDispatch();

    const storeUser = async () => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        storeUser();
    }, []);

    function login() {
        if (enteredName === "" && enteredPassword === "") {

        } else {
            navigation.navigate("Welcome")
        }
    }
    const formIsInvalid = enteredName === "" || enteredPassword === "";
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={(value) => dispatch(addUserName(value))}
                value={enteredName}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={(value) => dispatch(addUserPassword(value))}
                value={enteredPassword}
                placeholder="Password"
            //keyboardType="numeric"
            />
            {formIsInvalid && (
                <Text style={styles.errorText}> Please enter Username and Password </Text>
            )}

            <View style={styles.buttonStyle}>
                <Button isEnable={formIsInvalid} style={styles.buttonText} onPress={login}>
                    Login
                </Button>
            </View>
        </SafeAreaView>);
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontStyle: 'bold',
        padding: 2
    },
    buttonStyle: {
        marginTop: 40,
        marginHorizontal: 20
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
});
export default Login;