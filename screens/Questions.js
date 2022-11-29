import { StyleSheet, View, Text, FlatList } from "react-native";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { getQuestionsList } from "../api/ApiService";
import { GlobalStyles } from "../constants/Styles";
import RadioButton from "../ui/RadioButton";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import { apiStatus, setQuestionList } from "../redux/Reducer";
import { useDispatch } from "react-redux";
import RetryView from "../ui/RetryView";

function Questions({ navigation }) {

    const selectedGameLevel = useSelector(state => state.appReducer.level);
    const dispatch = useDispatch();
    var count = 5;
    const questionList = useSelector(state => state.appReducer.questionList);

    const status = useSelector(state => state.appReducer.status);
    const error = useSelector(state => state.appReducer.error);

    useEffect(() => {
        getQuestions();
    }, [count]);

    async function getQuestions() {
        dispatch(apiStatus('loading'));
        const response = await getQuestionsList(count, selectedGameLevel);
        console.log(response);
        if (response !== null) {
            dispatch(apiStatus('succeeded'));
            response.results.map((object, index) => {
                console.log(index);
                object["id"] = index + 1;
                object["allAnswerOptions"] = object.incorrect_answers;
                object["allAnswerOptions"].push(object.correct_answer);
                object["isCorrectAnswer"] = false;
                object["selectedAnswer"] = '';
            });
            dispatch(setQuestionList(response.results));
        }
    }

    const renderItem = ({ item }) => (
        <View style={style.itemContainer}>
            <Text style={style.questionText}>{item.id}. {item.question}</Text>
            <RadioButton questionArray={item} correctAnswer={item.correct_answer}></RadioButton>
        </View>
    );

    function submitQuiz() {
        var showAlert = false;
        questionList.map((item) => {
            if (item.selectedAnswer === '') {
                showAlert = true;
                return;
            }
        })
        if (showAlert) {
            alert('Kindly answer all the questions');
        } else {
            navigation.navigate("Result");
        }
    }

    function updateCount() {
        count = count + 10
    }

    if (status === 'error') {
        return (
            <RetryView
                heading="Connection Error!"
                message="Please check your internet connection or try again later"
                onPress={getQuestions()}
            />
        );
    } else if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'succeeded') {
        return (
            <View style={style.container}>
                <View style={style.listContainer}>
                    <FlatList data={questionList}
                        keyExtractor={item => item.question}
                        renderItem={renderItem}
                    >
                    </FlatList>
                </View>
                <View style={style.buttonStyle}>
                    <Button style={style.submitText} onPress={submitQuiz}>
                        Submit
                    </Button>
                </View>
            </View >
        );
    } else if (status === "failed") {
        return (
            <Text>
                {error}
            </Text>);
    }
}

const style = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
    },
    listContainer: {
        flex: 1.9,
    },
    submitText: {
        fontSize: 18
    },
    buttonStyle: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    questionText: {
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
        fontStyle: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    optionText: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400,
        marginHorizontal: 10,
        marginVertical: 4
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: GlobalStyles.colors.gray700,
        marginHorizontal: 8,
        marginTop: 10,
        paddingBottom: 8
    }
});
export default Questions;