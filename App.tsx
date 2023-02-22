import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Counter} from './src/features/counter/Counter';
import {Todo} from "./src/features/todo/Todo";
import {Provider} from "react-redux";
import {store} from "./src/store/store";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View>
            <Todo/>
            <Counter />
          </View>
        </SafeAreaView>
  );
}

const PreLoad = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
export default PreLoad;
