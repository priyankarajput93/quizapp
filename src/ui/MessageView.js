import {View, StyleSheet, Text} from 'react-native';
import {GlobalStyles} from '../util/Styles';

function MessageView({heading, message}) {
  return (
    <View style={style.container}>
      <Text style={style.mainText}>{heading}</Text>
      <Text style={style.text}>{message}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: GlobalStyles.colors.primary700,
    padding: 24,
  },
  mainText: {
    fontSize: 18,
    color: GlobalStyles.colors.gray700,
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.colors.gray700,
  },
});

export default MessageView;
