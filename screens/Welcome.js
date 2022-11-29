
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/Styles";

import Button from "../ui/Button";
import RadioButton from "../ui/RadioButton";
import { useSelector } from "react-redux";

function Welcome({ navigation }) {

    const quizLevels = ["Easy", "Medium", "Hard"];
    const name = useSelector(state => state.appReducer.userName);

    function startQuiz() {
        navigation.navigate("Questions");
    }

    return (
        <View
            style={styles.container}>
            <Text
                style={styles.welcomeText}>
                Welcome {name}!!
            </Text>
            <Text
                style={styles.quizLevelText}>
                Choose Quiz Level
            </Text>
            <RadioButton
                optionList={quizLevels}>
            </RadioButton>
            <View
                style={styles.buttonStyle}>
                <Button
                    style={styles.startText}
                    onPress={startQuiz}>
                    Start Quiz
                </Button>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 28,
        color: GlobalStyles.colors.primary500,
        textAlign: 'center',
        marginBottom: 30,
        fontStyle: 'bold'
    },
    startText: {
        fontSize: 16,
    },
    buttonStyle: {
        marginTop: 40,
        marginHorizontal: 20,
    },
    quizLevelText: {
        fontSize: 20,
        color: 'black',
        marginHorizontal: 20,
        marginVertical: 10
    }
});
export default Welcome;