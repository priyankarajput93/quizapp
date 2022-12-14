import {StyleSheet, View, Text, FlatList, Alert} from 'react-native';
import Button from '../ui/Button';
import {useEffect} from 'react';
import {getQuestionsList} from '../api/ApiService';
import RadioButton from '../ui/RadioButton';
import {useSelector} from 'react-redux';
import Loading from '../ui/Loading';
import {apiStatus, setQuestionList} from '../redux/Reducer';
import {useDispatch} from 'react-redux';
import MessageView from '../ui/MessageView';
import RenderHTMLView from '../ui/RenderHTMLView';
import { GlobalStyles } from '../util/Styles';

function Questions({navigation}) {
  const selectedGameLevel = useSelector(state => state.appReducer.level);
  const dispatch = useDispatch();
  const count = 20;
  var questionList = useSelector(state => state.appReducer.questionList);
  const status = useSelector(state => state.appReducer.status);
  const error = useSelector(state => state.appReducer.error);

  useEffect(() => {
    getQuestions();
  }, [count]);

  // get response and add required keys 
  async function getQuestions() {
    dispatch(apiStatus('loading'));
    var response = await getQuestionsList(count, selectedGameLevel);
    if (response !== null) {
      dispatch(apiStatus('succeeded'));
      response.results.map((object, index) => {
        object['id'] = index + 1;
        object['allAnswerOptions'] = object.incorrect_answers;
        object['allAnswerOptions'].push(object.correct_answer);
        object['isCorrectAnswer'] = false;
        object['selectedAnswer'] = '';
      });
      dispatch(setQuestionList(response.results));
    }
  }

  const renderItem = ({item}) => {
    const data = item.id + '. ' + item.question;
    return (
      <View style={style.itemContainer}>
        <RenderHTMLView text={data}></RenderHTMLView>
        <RadioButton
          questionArray={item}
          correctAnswer={item.correct_answer}></RadioButton>
      </View>
    );
  };

  // method to submit quiz and move to next screen
  function submitQuiz() {
    var showAlert = false;
    questionList.map(item => {
      if (item.selectedAnswer === '') {
        showAlert = true;
        return;
      }
    });
    if (showAlert) {
      Alert.alert('Warning!','Kindly answer all the questions');
    } else {
      navigation.navigate('Result');
    }
  }

  if (status === 'error') {
    return (
      <MessageView
        heading="Connection Error!"
        message="Please check your internet connection or try again later"
      />
    );
  } else if (status === 'loading') {
    return <Loading />;
  } else if (status === 'succeeded') {
    return (
      <View style={style.container}>
        <View style={style.listContainer}>
          <FlatList
            data={questionList}
            keyExtractor={item => item.question}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={style.buttonStyle}>
          <Button style={style.submitText} onPress={submitQuiz}>
            Submit
          </Button>
        </View>
      </View>
    );
  } else if (status === 'failed') {
    return <Text style={style.errorText}>{error}</Text>;
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
    fontSize: 18,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  optionText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: GlobalStyles.colors.gray700,
    marginHorizontal: 8,
    marginTop: 10,
    paddingBottom: 8,
  },
  errorText: {
    fontSize: 24,
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
  },
});
export default Questions;
