import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Keyboard, Platform } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    name: '',
    birthdate: '',
    phone: '',
    email: '',
    code: ''
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isUsernameValid, setUsernameValid] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isCodeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignUp = () => {
    if (isUsernameValid && isEmailVerified) {
      axios.post('http://121.127.165.28:5000/api/signup', userInfo)
        .then(response => {
          navigation.navigate('FirstScreen');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleSendCode = () => {
    axios.post('http://121.127.165.28:5000/api/send-code', { email: userInfo.email })
      .then(response => {
        alert('인증번호가 발송되었습니다.');
        setCodeSent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleVerifyCode = () => {
    axios.post('http://121.127.165.28:5000/api/verify-code', { email: userInfo.email, code: userInfo.code })
      .then(response => {
        alert('인증번호가 확인되었습니다.');
        setEmailVerified(true);
      })
      .catch(error => {
        alert('인증번호가 일치하지 않습니다.');
        console.error(error);
      });
  };

  const handleCheckUsername = () => {
    axios.post('http://121.127.165.28:5000/api/check-username', { username: userInfo.username })
      .then(response => {
        if (response.data.available) {
          alert('사용 가능한 아이디입니다.');
          setUsernameValid(true);
        } else {
          alert('이미 사용 중인 아이디입니다.');
          setUsernameValid(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const isSignUpButtonEnabled = () => {
    const { username, password, name, birthdate, phone, email } = userInfo;
    return username && password && name && birthdate.length === 8 && phone && email && isUsernameValid && isEmailVerified;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.siteName}>GlideMate</Text>
        <View style={styles.inputContainer}>
          <View style={styles.usernameContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="아이디"
              onChangeText={text => setUserInfo({ ...userInfo, username: text })}
            />
            <TouchableOpacity style={styles.checkButton} onPress={handleCheckUsername}>
              <Text style={styles.buttonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            onChangeText={text => setUserInfo({ ...userInfo, password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="이름"
            onChangeText={text => setUserInfo({ ...userInfo, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="생년월일 8자리"
            keyboardType="numeric"
            maxLength={8}
            onChangeText={text => setUserInfo({ ...userInfo, birthdate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="휴대전화번호"
            keyboardType="phone-pad"
            onChangeText={text => setUserInfo({ ...userInfo, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="이메일"
            keyboardType="email-address"
            onChangeText={text => setUserInfo({ ...userInfo, email: text })}
          />
          <View style={styles.verificationContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="인증번호(코드)"
              onChangeText={text => setUserInfo({ ...userInfo, code: text })}
            />
            <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode} disabled={isCodeSent}>
              <Text style={styles.buttonText}>인증번호 발송</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.verifyCodeButton} onPress={handleVerifyCode}>
              <Text style={styles.buttonText}>인증하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {!isKeyboardVisible && (
        <TouchableOpacity style={[styles.signUpButton, !isSignUpButtonEnabled() && styles.disabledButton]} onPress={handleSignUp} disabled={!isSignUpButtonEnabled()}>
          <Text style={styles.signUpButtonText}>가입하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end'
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16
  },
  siteName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 10
  },
  usernameContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  checkButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  sendCodeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  verifyCodeButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold'
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: '#CCCCCC'
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default SignUpScreen;