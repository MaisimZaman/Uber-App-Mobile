import React, {useState, useLayoutEffect} from 'react'
import { View,  StyleSheet, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import {auth, db} from '../firebase'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_KEY} from '@env'


export default function CreateLocation({ navigation }){

    const [placeRefer, setPlaceRefer] = useState('');
    
    const [placeName, setPlaceName] = useState('');

    const [locationPoints, setLocationPoints] = useState(null);




    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Save a Location"
        })
    }, [navigation])

    function saveLocation(){
        db.collection("locations")
            .doc(auth.currentUser.uid)
            .collection("userLocations")
            .add({
                placeRefer: placeRefer,
                placeName: placeName,
                locationPoints: locationPoints
            })

        navigation.goBack()

    }



    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            
            <Text h3 style={{marginBottom: 50}}>
                Add a Favourite Location
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Name this Place"
                    autoFocus
                    type='text'
                    value={placeRefer}
                    onChangeText={text => setPlaceRefer(text)}
                ></Input>

        <GooglePlacesAutocomplete 
            placeholder="Enter Location"
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            debounce={400}
            minLength={2}
            onPress={(data, details = null) => {
                setPlaceName(data.description)
                setLocationPoints(details.geometry.location)

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

                


            </View>
            <View>
                <Button
                    style={styles.button}
                    raised
                    title="Add Location"
                    onPress={saveLocation}
                    disabled={locationPoints == null}
                    
                ></Button>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 500,
        marginTop: 10,
    },


})
