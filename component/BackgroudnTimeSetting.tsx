import { useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus, Text } from "react-native";

import SplashScreen from 'react-native-splash-screen';


const BackgroundTimeSettig = ({ webViewRef }: any) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const [timeInBackground, setTimeInBackground] = useState<number>(0);

  // 백그라운드 시간 저장하기
  const saveBackgroundTime = async () => {
    try {
      const currentTime = new Date().getTime();
      await AsyncStorage.setItem('backgroundStartTime', currentTime.toString());
      console.log(`Background time saved: ${currentTime}`);
    } catch (error) {
      console.error("Failed to save background time", error);
    }
  };

  // 저장된 백그라운드 시간 불러오기
  const loadBackgroundTime = async () => {
    try {
      const savedTime = await AsyncStorage.getItem('backgroundStartTime');
      if (savedTime !== null) {
        const currentTime = new Date().getTime();
        const timeSpentInBackground = currentTime - parseInt(savedTime);
        setTimeInBackground(timeSpentInBackground);
        console.log(`Time spent in background: ${timeSpentInBackground} ms`);

        return timeSpentInBackground;
      }
    } catch (error) {
      console.error("Failed to load background time", error);
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // 포그라운드로 돌아왔을 때
        loadBackgroundTime().then(res => {
          if (res && res > 60000) {
            SplashScreen.show();
            webViewRef.current?.reload();
          }
        })
      } else if (nextAppState === 'background') {
        // 백그라운드로 들어갔을 때
        saveBackgroundTime();
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, [appState]);

  return <Text>timer id : {timeInBackground}ms</Text>;
  // return null;
}

export default BackgroundTimeSettig;