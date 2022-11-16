import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import Button from "../ui/Button";
import RadioButton from "../ui/RadioButton";

function Result({ navigation }) {

    const questions = useSelector(state => state.appReducer.questionList);
    var totalScore = 0;

    function retryQuiz() {
        navigation.navigate("Welcome");
    }

    const renderItem = ({ item }) => (
        <View View style={style.itemContainer}>
            <Text style={style.questionText}>{item.question}</Text>
            <RadioButton questionArray={item} disable={true}></RadioButton>
            {
                item.isCorrectAnswer && <Text style={style.correctAnswerText}> Correct Answer</Text>

            }
            {
                !item.isCorrectAnswer && <Text style={style.wrongAnswerText}> Wrong Answer</Text>
            }
        </View>
    );

    return (
        <View style={style.container}>
            <View style={style.listContainer}>
                <FlatList data={questions}
                    keyExtractor={item => item.question}
                    renderItem={renderItem}>
                </FlatList>
            </View>
            {
                questions.map((item, index) => {
                    console.log("hiiiiiiii");
                    console.log(item.isCorrectAnswer);
                    if (item.isCorrectAnswer) {
                        totalScore = totalScore + 1;
                    } 
                })
            }
            <Text Text style={style.totalScoreText}>Total Score: {totalScore}</Text>
            <View style={style.buttonStyle}>
                <Button style={style.retryText} onPress={retryQuiz}>Play Again </Button>
            </View>
        </View >
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    listContainer: {
        flex: .9,
    },
    totalScoreText: {
        fontSize: 18,
        color: GlobalStyles.colors.primary800,
        fontStyle: 'bold',
        textAlign: 'center',
        marginTop:10
    },
    retryText: {
        fontSize: 18
    },
    buttonStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 10
    },
    questionText: {
        fontSize: 18,
        color: GlobalStyles.colors.primary800,
        fontStyle: 'bold',
        marginHorizontal: 10,
        marginVertical: 10
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: GlobalStyles.colors.gray700,
        marginHorizontal: 8,
        marginTop: 10,
        paddingBottom: 8
    },
    wrongAnswerText: {
        color: GlobalStyles.colors.error500,
        fontSize: 16,
        fontStyle: 'bold',
        marginHorizontal: 20,
        marginVertical: 10
    },
    correctAnswerText: {
        color: GlobalStyles.colors.green100,
        fontSize: 16,
        fontStyle: 'bold',
        marginHorizontal: 20,
        marginVertical: 10
    }
});
export default Result;