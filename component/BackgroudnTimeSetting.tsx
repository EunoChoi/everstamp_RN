import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, Text } from "react-native";



const BackgroundTimeSettig = ({ webViewRef }: any) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [lastBackgroundTime, setLastBackgroundTime] = useState<number>(Date.now());
  const [intervalId, setIntervalId] = useState<any>(null);

  const reloadThreshold = 10 * 60000; // 10분
  const intervalTime = 1 * 60000; //1분

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // console.log('AppState changed:', nextAppState);
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const timeInBackground = Date.now() - lastBackgroundTime;
        console.log('background time', timeInBackground / 1000 + 's');

        if (timeInBackground > reloadThreshold) {
          webViewRef.current?.reload();
        }
      }
      if (nextAppState === 'active') {
        const tempId = setInterval(() => {
          setLastBackgroundTime(Date.now());
        }, intervalTime);
        setIntervalId(tempId);
      }
      if (nextAppState === 'background') {
        if (intervalId) {
          console.log('timer id', intervalId, 'clear');
          clearInterval(intervalId);
        }
      }

      appState.current = nextAppState;
    };

    const changeStatus = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      changeStatus.remove();
    };
  }, [lastBackgroundTime, intervalId]);

  // return <Text>timer id : {intervalId}-{lastBackgroundTime}</Text>;
  return null;
}

export default BackgroundTimeSettig;