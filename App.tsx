
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, BackHandler, StatusBar, SafeAreaView, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';


import WebView from 'react-native-webview';



function App(): React.JSX.Element {
  // const [loading, setLoading] = useState(true);
  // const fadeAnim = useRef(new Animated.Value(0)).current; // Animated.Value로 초기값 0 설정


  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행
    const timer = setTimeout(() => {
      // 3초 후에 스플래시 스크린을 숨기기
      SplashScreen.hide();
    }, 3000);

    // 클린업 함수
    return () => clearTimeout(timer);
  }, []);

  const customUserAgent =
    "Mozilla/5.0 (Linux; Android 10; Mobile; rv:86.0) Gecko/86.0 Firefox/86.0";

  // useEffect(() => {
  //   if (loading) {
  //     // 로딩 중일 때 opacity를 0에서 1로 애니메이션
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 1000, // 애니메이션 지속 시간 (밀리초)
  //       useNativeDriver: true, // 성능 최적화를 위해 네이티브 드라이버 사용
  //     }).start();
  //   } else {
  //     // 로딩이 끝나면 opacity를 1에서 0으로 애니메이션
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [loading, fadeAnim]);

  const webviewRef = useRef<WebView>(null); // 타입 명시
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack(); // 웹뷰 뒤로가기
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
      {/* {loading && <LoadingScreen />} */}
      <WebView
        ref={webviewRef}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}

        userAgent={customUserAgent}
        overScrollMode="never"
        source={{ uri: 'https://everstamp.site/app' }}
        style={{ flex: 1 }}

      // style={{ flex: loading ? 0 : 1 }}
      // onLoadStart={() => setLoading(true)}
      // onLoadEnd={() => setLoading(false)}
      // onLoadProgress={({ nativeEvent }) => {
      //   if (nativeEvent.progress === 1) {
      //     setLoading(false);  // 로딩이 100% 완료되면 로딩 화면 숨기기
      //   }
      // }}

      />
    </SafeAreaView>
  );
}


export default App;
