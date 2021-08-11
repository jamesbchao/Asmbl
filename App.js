import React, { useEffect, useState } from 'react';
import { Platform, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import Heap from '@heap/react-native-heap';

import Amplify, { Analytics, Auth } from 'aws-amplify'
import config from './src/aws-exports'

Amplify.configure({
  ...config,
});

Heap.setAppId('1641933072');

function App() {

  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    let now = new Date();
    setStartTime(now);
    AppState.addEventListener('change', onAppStateChange);
    Analytics.record('App opened!');
    Analytics.autoTrack('session', {
      enable: true,
    })
  }, []);

  const onAppStateChange = async(appstate) => {
    if (appstate === 'active') {
      let now = new Date();
      setStartTime(now);
      Analytics.record('App opened!');
    }
    if (appstate === 'inactive') {
      let now = new Date();
      let diff = now - startTime;
      let { username } = await Auth.currentUserInfo();
      console.log('diff: ', diff);
      Analytics.record('Time spent on app', { username: username }, { timeSpent: diff });
    }
  }

  const HeapNavigationContainer = Heap.withReactNavigationAutotrack(
    NavigationContainer
  );

  return(
    <MenuProvider>
      <HeapNavigationContainer>
        <StackNavigator />
      </HeapNavigationContainer>
    </MenuProvider>
  );
}

export default App;

