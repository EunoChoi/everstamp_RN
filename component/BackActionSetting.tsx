import { useEffect, useState } from "react";
import { Alert, BackHandler, Button, Modal, StyleSheet, Text, View, Platform } from "react-native";

const BackActionSetting = ({ canGoBack, webViewRef }: any) => {

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack(); // 웹뷰 뒤로가기
        return true; // 기본 뒤로가기 동작을 막음
      } else {
        // 뒤로가기 히스토리가 없을 때 앱 종료 확인 알림
        setModalVisible(true)

        // Alert.alert(
        //   "Everstamp",
        //   "앱을 종료하시겠습니까?",
        //   [
        //     {
        //       text: "아니오",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "네", onPress: () => BackHandler.exitApp() }
        //   ]
        // );
        return true; // 기본 뒤로가기 동작을 막음
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack]);

  return <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
  >
    <View style={styles.modalBackground} >
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>앱 종료</Text>
        <Text style={styles.alertText}>Everstamp 앱을 종료하시겠습니까?</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonNo} onPress={() => setModalVisible(false)} >아니요</Text>
          <Text style={styles.buttonYes} onPress={() => { setModalVisible(false); setTimeout(() => { BackHandler.exitApp(); }, 300) }} >네</Text>
        </View>
      </View>
    </View>
  </Modal>;
}

export default BackActionSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 350,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  alertText: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 25,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // 버튼 사이 간격 설정
    width: 'auto',  // 버튼의 총 너비 비율
  },
  buttonNo: {
    width: 80,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 4,
    marginRight: 4,

    borderRadius: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: '#cfd2e3',
    borderWidth: 3,
  },
  buttonYes: {
    width: 80,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 4,
    marginRight: 4,

    borderRadius: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#cfd2e3'
  }
});