import { useEffect, useState } from "react";
import { BackHandler, TouchableOpacity, Modal, StyleSheet, Text, View, Platform } from "react-native";

const BackActionSetting = ({ canGoBack, webViewRef }: any) => {

  const [modalVisible, setModalVisible] = useState(false);

  const onClickButtonNo = () => {
    setModalVisible(false)
  }
  const onClickButtonYes = () => {
    setModalVisible(false); setTimeout(() => { BackHandler.exitApp(); }, 300)
  }


  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack(); // 웹뷰 뒤로가기
        return true; // 기본 뒤로가기 동작을 막음
      } else {
        setModalVisible(true)
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
    <View style={styles.modalBackground}>
      <View style={styles.alertBox}>
        <Text style={styles.alertTitle}>
          <Text style={styles.alertTitleFirstLetter}>E</Text>
          <Text>verstamp</Text>
        </Text>
        <Text style={styles.alertText}>앱을 종료하시겠습니까?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonNo} onPress={onClickButtonNo}>
            <Text style={styles.buttonText}>아니요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonYes} onPress={onClickButtonYes}>
            <Text style={styles.buttonText}>네</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.10)'
  },
  alertBox: {
    width: 350,
    padding: 30,

    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',

    elevation: 6,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  alertTitleFirstLetter: {
    color: '#acb2d3',
  },
  alertText: {
    fontSize: 16,
    fontWeight: '600',
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
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',  // 수직 정렬
    alignItems: 'center',       // 수평 정렬
    marginLeft: 4,
    marginRight: 4,
    paddingBottom: 1,
    backgroundColor: 'white',
    borderColor: '#cfd2e3',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  buttonYes: {
    width: 80,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',  // 수직 정렬
    alignItems: 'center',       // 수평 정렬
    marginLeft: 4,
    marginRight: 4,
    paddingBottom: 1,
    backgroundColor: '#cfd2e3',
    borderColor: '#cfd2e3',
    borderWidth: 2,
  }
});