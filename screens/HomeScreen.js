import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_KEY} from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'





export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();


    

  
    return (
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image 
                style={{
                    width: 100, height: 100, resizeMode: 'contain'
                }}
                source={
                    require("../assets/Elift_logo.png")
                }
            />
        </View>

        <View>
        <GooglePlacesAutocomplete 
            placeholder="Where From?"
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            debounce={400}
            minLength={2}
            onPress={(data, details = null) => {

               dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))

                //setDestination(null)

            }}
            fetchDetails={true}
            returnKeyType={"search"}
            styles={{
                container: {
                    flex: 0,
                },
                textInput: {
                    fontSize: 18
                }
            }}
            query={{
                key: GOOGLE_MAPS_KEY,
                language: 'en'
            }}

        
        />
        <NavOptions navigation={navigation} />
        <NavFavourites navigation={navigation}></NavFavourites>
        </View>
        
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
