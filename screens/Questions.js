import { StyleSheet, View, Text, FlatList } from "react-native";
import Button from "../ui/Button";

import { useEffect, useState } from "react";
import { getQuestionsList } from "../api/apiService";
import { GlobalStyles } from "../constants/styles";
import RadioButton from "../ui/RadioButton";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import { allQuestionList, apiStatus, getError, getStatus, questions, setQuestionList } from "../redux/reducers";
import { useDispatch } from "react-redux";

function Questions({ navigation }) {

    const selectedGameLevel = useSelector(state => state.appReducer.level);
    //   const { questionList, status, error } = useSelector((state) => state.appData);
    const dispatch = useDispatch()

    const questionList = useSelector(state => state.appReducer.questionList);
    //const questionList = useSelector(allQuestionList);
    //const status = useSelector(getError);
    const status = useSelector(state => state.appReducer.status);
    const error = useSelector(state => state.appReducer.error);

    /*useEffect(() => {
        async function getQuestions() {
            //          const questions = await getQuestionsList(10, 'hard');
            const questions = dispatch(getQuestionsList(10, selectedGameLevel));
            if (getQuestionsList.fulfilled.match(questions)) {
                // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
              //  const question = questions.payload;
              //  console.log(questions);
                //alert(questions);
              }
        }
        getQuestions();
    }, []);*/
    useEffect(() => {
        async function getQuestions() {
            dispatch(apiStatus('loading'));
            const response = await getQuestionsList(10, selectedGameLevel);

            if (response !== null) {
                dispatch(apiStatus('succeeded'));
                response.results.map((object) => {
                    console.log(object);
                    object["allAnswerOptions"] = object.incorrect_answers;
                    object["allAnswerOptions"].push(object.correct_answer);
                    object["isCorrectAnswer"] = false;
                    object["selectedAnswer"] = '';
                });
                dispatch(setQuestionList(response.results));
            }
        }
        getQuestions();
    }, []);

    const renderItem = ({ item }) => (
        <View style={style.itemContainer}>
            <Text style={style.questionText}>{item.question}</Text>
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

    if (status === 'loading') {
        return (<Loading />);
    } else if (status === 'succeeded') {
        return (
            <View style={style.container}>
                <View style={style.listContainer}>
                    <FlatList data={questionList}
                        keyExtractor={item => item.question}
                        renderItem={renderItem}>
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
        <Text>{error}</Text>
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    listContainer: {
        flex: .9,
    },
    submitText: {
        fontSize: 18
    },
    buttonStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 10
    },
    questionText: {
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
        fontStyle: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
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