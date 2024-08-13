
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Text, StatusBar, SafeAreaView, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AppState, AppStateStatus, View, ActivityIndicator } from 'react-native';


import WebView from 'react-native-webview';



function App(): React.JSX.Element {

  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행
    const timer = setTimeout(() => {
      // 3초 후에 스플래시 스크린을 숨기기
      SplashScreen.hide();
    }, 2000);

    // 클린업 함수
    return () => clearTimeout(timer);
  }, []);


  const webViewRef = useRef<WebView>(null); // 타입 명시

  const appState = useRef<AppStateStatus>(AppState.currentState);

  const [lastBackgroundTime, setLastBackgroundTime] = useState<number>(Date.now());
  let intervalId: NodeJS.Timeout | null = null;
  const reloadThreshold = 10 * 60000; // 15분
  const intervalTime = 1 * 60000; //1분

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('AppState changed:', nextAppState);
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const timeInBackground = Date.now() - lastBackgroundTime;
        console.log(Date.now(), lastBackgroundTime);
        console.log('back time', timeInBackground);

        if (timeInBackground > reloadThreshold) {
          // 일정 시간 이상 지났을 때만 리로드
          webViewRef.current?.reload();
        }
      }
      if (nextAppState === 'active') {
        setLastBackgroundTime(Date.now());
        intervalId = setInterval(() => {
          setLastBackgroundTime(Date.now());
        }, intervalTime);
        console.log('start timer', intervalId);
      }
      if (nextAppState === 'background') {
        if (intervalId) {
          console.log(intervalId, 'Interval cleared as app went to background.');
          clearInterval(intervalId);
          intervalId = null;
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [lastBackgroundTime]);



  const customUserAgent =
    "Mozilla/5.0 (Linux; Android 10; Mobile; rv:86.0) Gecko/86.0 Firefox/86.0";

  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack(); // 웹뷰 뒤로가기
        return true; // 기본 뒤로가기 동작을 막음
      } else {
        // 뒤로가기 히스토리가 없을 때 앱 종료 확인 알림
        Alert.alert(
          "Everstamp",
          "앱을 종료하시겠습니까?",
          [
            {
              text: "아니오",
              onPress: () => null,
              style: "cancel"
            },
            { text: "네", onPress: () => BackHandler.exitApp() }
          ]
        );
        return true; // 기본 뒤로가기 동작을 막음
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack]);

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <WebView
        ref={webViewRef}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}

        userAgent={customUserAgent}
        overScrollMode="never"
        source={{ uri: 'https://everstamp.site/app' }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}


export default App;
