import {ActivityIndicator, View, StyleSheet} from 'react-native';
import { GlobalStyles } from '../util/Styles';

function Loading() {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary700} />
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
});

export default Loading;
