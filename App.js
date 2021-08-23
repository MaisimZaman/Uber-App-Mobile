import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import CreateLocation from './screens/CreateLocation';
import DriverScreen from './screens/DriverScreen';
import findCars from './screens/findCars';
import DriverMapScreen from './screens/DriverMapScreen';
import WaitingMapScreen from './screens/WaitingMapScreen';
import MyLocation from './screens/MyLocation';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <Stack.Navigator>
              <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
              <Stack.Screen name="CreateLocation" component={CreateLocation}/>
              <Stack.Screen name="DriverScreen" component={DriverScreen}/>
              <Stack.Screen name="FindCars" component={findCars}/>
              <Stack.Screen name="MyLocation" component={MyLocation} options={{headerShown: false}}/>
              <Stack.Screen name="DriverMapScreen" component={DriverMapScreen} options={{
                headerShown: false,
              }}></Stack.Screen>
              <Stack.Screen name="WaitingMapScreen" component={WaitingMapScreen} options={{
                headerShown: false,
              }}></Stack.Screen>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                headerShown: false,
              }}></Stack.Screen>
              <Stack.Screen name="MapScreen" component={MapScreen} options={{
                headerShown: false,
              }}></Stack.Screen>
            </Stack.Navigator>
            </KeyboardAvoidingView>
        </SafeAreaProvider>

      </NavigationContainer>
      
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
