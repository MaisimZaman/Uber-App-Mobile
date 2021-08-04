import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_KEY} from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { auth } from '../firebase'

export default function NavigateCard({navigation}) {

    const dispatch = useDispatch();



    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning {auth.currentUser.displayName}</Text>

            <View  style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={styles}
                        placeholder="Where to?"
                        debounce={400}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        query={{
                            key: GOOGLE_MAPS_KEY,
                            language: 'en'
                        }}
                        returnKeyType={"Search"}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))

                            navigation.navigate("RideOptionsCard")
                        }}

            

                    />

                </View>
                    <ScrollView>
                    <NavFavourites navigation={navigation}></NavFavourites>
                    </ScrollView>

            </View>

            
                
            

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={() => navigation.navigate("RideOptionsCard")}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16}></Icon>
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16}></Icon>
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,

    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
