import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../constants/Styles";
import { gameLevel } from "../redux/Reducers";


function RadioButton({ optionList, questionArray, disable }) {

    const [selectedOption, setOption] = useState('');

    const dispatch = useDispatch();

    if (optionList == undefined) {
        optionList = questionArray.allAnswerOptions;
    }

    useEffect(() => {
        if (disable !== undefined)
            setOption(questionArray.selectedAnswer);
    }, []);

    return (
        <View style={styles.optionConatiner}>
            {optionList.map(optionValue => (
                <View
                    key={optionValue}
                    style={styles.quizConatiner}>
                    <TouchableOpacity
                        style={styles.outer}
                        disabled={disable}
                        onPress={() => {
                            setOption(optionValue);
                            if (questionArray === undefined) {
                                dispatch(gameLevel(optionValue.toLowerCase()));
                            } else {
                                questionArray.isCorrectAnswer = (optionValue == questionArray.correct_answer) ? true : false
                                questionArray.selectedAnswer = optionValue;
                            }
                        }}>
                        {(selectedOption === optionValue) && <View style={styles.inner} />}
                    </TouchableOpacity>
                    <Text
                        style={styles.option}>
                        {optionValue}
                    </Text>
                </View>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
    inner: {
        width: 12,
        height: 12,
        backgroundColor: GlobalStyles.colors.gray500,
        borderRadius: 12
    },
    outer: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quizConatiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 6,
        marginHorizontal: 10
    },
    optionConatiner: {
        marginHorizontal: 10,
    },
    option: {
        fontSize: 16,
        textTransform: 'capitalize',
        fontStyle: 'bold',
        marginLeft: 8,
        paddingBottom: 2,
        color: GlobalStyles.colors.gray700
    }
});
export default RadioButton;