import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import BoardScreen from './screens/BoardScreen';
import MyPageScreen from './screens/MyPageScreen';
import FirstScreen from './screens/FirstScreen';
import LoginScreen from './screens/LoginScreen';
import BowFactoryScreen from './screens/BowFactoryScreen';
import FirstBowFactoryInfoScreen from './screens/FirstBowFactoryInfoScreen';
import SelectBowFactoryScreen from './screens/SelectBowFactoryScreen';
import ChangeUserInfoScreen from './screens/ChangeUserInfoScreen';
import CheckUserInfoScreen from './screens/CheckUserInfoScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';
import WritePostScreen from './screens/WritePostScreen';
import PostDetailScreen from './screens/PostDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Board') {
            iconName = 'list';
          } else if (route.name === 'MyPage') {
            iconName = 'person';
          } else if (route.name === 'BowFactory') {
            iconName = 'map';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title : "홈"}}/>
      <Tab.Screen name="BowFactory" component={BowFactoryScreen} options={{title : "활공장"}}/>
      <Tab.Screen name="Board" component={BoardStackScreen} options={{title : "게시판"}}/>
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{title : "마이페이지"}}/>
    </Tab.Navigator>
  );
}

const BoardStack = createStackNavigator();

function BoardStackScreen() {
  return (
    <BoardStack.Navigator>
      <BoardStack.Screen name="BoardScreen" component={BoardScreen} options={{ headerShown: false }} />
      <BoardStack.Screen name="WritePostScreen" component={WritePostScreen} options={{title : "게시글 작성"}}/>
      <BoardStack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{title : "게시글 조회"}}/>
    </BoardStack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" options = {{title : "로그인"}}>
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} options = {{title : "회원가입"}}/>
        {isLoggedIn && (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="BowFactoryScreen" component={BowFactoryScreen} options = {{title : "활공장"}}/>
            <Stack.Screen name="SelectBowFactoryScreen" component={SelectBowFactoryScreen} options = {{title : "활공장 선택"}}/>
            <Stack.Screen name="FirstBowFactoryInfoScreen" component={FirstBowFactoryInfoScreen} options = {{title : "활공장 메인"}}/>
            <Stack.Screen name="Board" component={BoardScreen} options = {{title : "게시판"}}/>
            <Stack.Screen name="WritePost" component={WritePostScreen} options = {{title : "글 작성"}}/>
            <Stack.Screen name="PostDetail" component={PostDetailScreen} options = {{headerShown : false}}/>
          </>
        )}
        <Stack.Screen name="ChangeUserInfo" component={ChangeUserInfoScreen} options={{ title: "개인정보 수정" }} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options = {{title : "회원탈퇴"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}