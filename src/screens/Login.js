import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../ui/Button';
import {addUserName, addUserPassword} from '../redux/Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyles } from '../util/Styles';

function Login({navigation}) {
  const enteredName = useSelector(state => state.appReducer.userName);
  const enteredPassword = useSelector(state => state.appReducer.userPassword);
  const formIsInvalid = enteredName === '' || enteredPassword === '';

  const dispatch = useDispatch();

  // save user to storage
  const storeUser = async () => {
    const userData = {
      name: enteredName,
      password: enteredPassword,
    };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  // method to navigate to next screen on login click
  function login() {
    storeUser();
    navigation.navigate('Welcome');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/images/quiz.png')}
          />
          <TextInput
            style={styles.input}
            onChangeText={value => dispatch(addUserName(value))}
            value={enteredName}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={value => dispatch(addUserPassword(value))}
            value={enteredPassword}
            placeholder="Password"
            secureTextEntry={true}
          />
          {formIsInvalid && (
            <Text style={styles.errorText}>
              {' '}
              Please enter Username and Password{' '}
            </Text>
          )}

          <View style={styles.buttonStyle}>
            <Button
              isEnable={formIsInvalid}
              style={styles.buttonText}
              onPress={login}>
              Login
            </Button>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 12,
    marginHorizontal: 30,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontStyle: 'bold',
    padding: 2,
  },
  buttonStyle: {
    width: '80%',
    marginTop: 20,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  image: {
    height: 64,
    width: 64,
    margin: 20,
  },
});
export default Login;
