import React, {useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import { selectDestination } from '../slices/navSlice';
import {GOOGLE_MAPS_KEY} from '@env'
import { Icon } from 'react-native-elements';


export default function MapScreen({navigation}) {

    const Stack = createStackNavigator();

    const origin = useSelector(selectOrigin)

    const destination = useSelector(selectDestination)

    const mainNavigation = navigation

    

    return (
        <View>
            <TouchableOpacity style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-0 rounded-full shadow-lg`}
                onPress={() => navigation.navigate("HomeScreen")}
            >
                <Icon name="menu"></Icon>
            </TouchableOpacity>    

            <View style={tw`h-1/2`}>
                <Map originMain={origin}></Map>

            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{headerShown: false}}
                    />

                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{headerShown: false}}
                        
                    />

                </Stack.Navigator>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
