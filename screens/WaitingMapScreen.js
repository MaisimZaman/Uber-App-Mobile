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
import { useDispatch } from 'react-redux';
import { setPickUpLocation } from '../slices/navSlice';
import { setOrigin } from '../slices/navSlice';
import { Icon } from 'react-native-elements';
import DriverWaitingCard from '../components/DriverWaitingCard';
import { setDocID } from '../slices/navSlice';


export default function WaitingMapScreen(props) {

    const dispatch = useDispatch();

    const origin = useSelector(selectOrigin)

    const navigation = props.navigation

    const {driverPickUp} = props.route.params

    


    const Stack = createStackNavigator();

    useEffect(() => {
        if (driverPickUp != null){
            console.log("This Happened")
            dispatch(setPickUpLocation(origin))
            dispatch(setOrigin(driverPickUp))
        }
    }, [])

    return (
        <View>
            <TouchableOpacity style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-0 rounded-full shadow-lg`}
                onPress={() => navigation.navigate("HomeScreen")}
            >
                <Icon name="menu"></Icon>
            </TouchableOpacity>    

            <View style={tw`h-1/2`}>
                <Map isDriverMap={false} navigation={navigation}></Map>

            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator >
                    <Stack.Screen
                        name="DriverWaitingCard"
                        component={DriverWaitingCard}
                        options={{headerShown: false}}
                        
                        listeners={({ navigation }) => ({
                            tabPress: event => {
                                event.preventDefault();
                                navigation.navigate("DriverWaitingCard")
                            }})}
                        
                    />

                </Stack.Navigator>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
