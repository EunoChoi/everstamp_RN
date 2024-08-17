
import React, { useRef, useState } from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';


import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreenSetting from './component/SplashScreenSetting';
import BackgroundTimeSettig from './component/BackgroudnTimeSetting';
import BackActionSetting from './component/BackActionSetting';


function App(): React.JSX.Element {

  const customUserAgent =
    "'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15'";

  const webViewRef = useRef<WebView>(null); // 타입 명시
  const [canGoBack, setCanGoBack] = useState(false);

  const onLoad = async () => {
    // const cookies = await CookieManager.get('https://everstamp.site');
    const cookies = await CookieManager.get('.everstamp.site');

    console.log(cookies);
    CookieManager.flush();
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SplashScreenSetting />
      <BackgroundTimeSettig webViewRef={webViewRef} />
      <BackActionSetting webViewRef={webViewRef} canGoBack={canGoBack} />
      <WebView
        ref={webViewRef}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}

        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}

        sharedCookiesEnabled={false}
        // thirdPartyCookiesEnabled={true}

        userAgent={customUserAgent}
        overScrollMode="never"
        source={{ uri: 'https://everstamp.site/app' }}
        style={{ flex: 1 }}

        onLoadEnd={onLoad}

        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith('https://')) {
            // HTTPS 요청에 문제가 없는 경우 계속 로드
            return true;
          } else {
            // HTTPS 오류가 있는 경우 차단하거나 다른 조치 수행
            console.warn('HTTPS 오류 발생:', request.url);
            return false;
          }
        }}
      >
      </WebView>
    </SafeAreaView>
  );
}


export default App;