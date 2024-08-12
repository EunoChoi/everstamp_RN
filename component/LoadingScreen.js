import React from "react";
import { Text, View, Image, ActivityIndicator, StyleSheet } from "react-native";


const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require('./logo.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',  // 절대 위치로 설정하여 WebView 위에 겹치도록
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',   // 컨텐츠를 세로 중앙에 배치
    alignItems: 'center',       // 컨텐츠를 가로 중앙에 배치
    backgroundColor: 'white', // 배경색 설정
  },
  image: {
    width: 150,
    height: 150,
  }
});

export default LoadingScreen;