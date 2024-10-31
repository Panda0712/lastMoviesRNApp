import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      {1 < 2 ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default App;
