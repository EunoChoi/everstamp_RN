import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenSetting = () => {
  useEffect(() => {
    // 컴포넌트가 마운트된 후 실행
    const timer = setTimeout(() => {
      // 3초 후에 스플래시 스크린을 숨기기
      SplashScreen.hide();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

export default SplashScreenSetting;
