import {Pressable, View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from '../util/Styles';

function Button({children, onPress, mode, style, isEnable}) {
  return (
    <View style={style}>
      <Pressable
        disabled={isEnable}
        onPress={onPress}
        style={({pressed}) => pressed && style.pressed}
        android_ripple={{
          color: GlobalStyles.colors.primary400,
          borderless: false,
        }}>
        <View
          style={[styles.button, mode === 'flat' || (isEnable && styles.flat)]}>
          <Text
            style={[
              styles.buttonText,
              mode === 'flat' || (isEnable && styles.flatText),
            ]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: GlobalStyles.colors.gray100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary100,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    padding: 2,
  },
});
