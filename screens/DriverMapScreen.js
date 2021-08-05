import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import ClientRequestCard from '../components/ClientRequestCard';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import { selectDestination } from '../slices/navSlice';
import {GOOGLE_MAPS_KEY} from '@env'
import { Icon } from 'react-native-elements';
import { db, auth } from '../firebase';


export default function DriverMapScreen({navigation}) {

    const Stack = createStackNavigator();

    const origin = useSelector(selectOrigin)

    const destination = useSelector(selectDestination)

    const mainNavigation = navigation
    const [docId, setDocID] = useState('')


    function resetDriver(){
        db.collection("drivers")
            .where("driverId", "==", auth.currentUser.uid)
            .get()
            .then((snap) => {
                setDocID(snap[0].id)

            })

        db.collection("drivers")
            .doc(docId)
            .delete()

        navigation.replace("HomeScreen")

    }

    

    return (
        <View>
            <TouchableOpacity style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-0 rounded-full shadow-lg`}
                onPress={resetDriver}
            >
                <Icon name="menu"></Icon>
            </TouchableOpacity>    

            <View style={tw`h-1/2`}>
                <Map isDriverMap={true}></Map>

            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="ClientRequestCard"
                        component={ClientRequestCard}
                        options={{headerShown: false}}
                    />

                    

                </Stack.Navigator>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
