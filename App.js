import { Alert, BackHandler, ImageBackground, StatusBar, StyleSheet } from "react-native";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { GlobalStyles } from "./constants/Styles";
import { Store } from "./redux/Store";
import Main from "./screens/Main";

const App = () => {

  useEffect(() => {

    const backAction = () => {
      Alert.alert("Close App?", "Are you sure you want to close the application?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar barStyle={'light'} backgroundColor={GlobalStyles.colors.primary700} />
      <ImageBackground
        source={require('./assets/images/grey_background.jpg')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <Provider store={Store}>
          <Main />
        </Provider>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.2,
    resizeMode: 'cover',
  },
});
export default App;