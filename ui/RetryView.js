import { View, StyleSheet,Text } from "react-native";
import { GlobalStyles } from "../constants/Styles";
import Button from "./Button";

function RetryView({heading, message, retry}) {
    return (
    <View style={style.container}>
        <Text style = {style.mainText}>{heading}</Text>
        <Text style = {style.text}>{message}</Text>
        <Button>onPress={retry}</Button>
    </View>);
}

export default RetryView;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: GlobalStyles.colors.primary700,
        padding: 24
    },
    mainText:{
        fontSize:18,
        color: GlobalStyles.colors.gray700
    },
    text:{
        fontSize:16,
        color: GlobalStyles.colors.gray700
    }
});