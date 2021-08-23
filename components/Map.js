import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin, selectPickUpLocation } from '../slices/navSlice'
import { selectDestination } from '../slices/navSlice'
import { setOrigin } from '../slices/navSlice'
import { setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import * as Location from 'expo-location'



export default function Map({isDriverMap, navigation}) {

    const origin = useSelector(selectOrigin)
 
    const destination = useSelector(selectDestination)

    const pickUpLocation = useSelector(selectPickUpLocation)


    const mapRef = useRef()

    const dispatch = useDispatch();


    const [currentPoint, setCurrentPoint] = useState({lat:null, lng:null})

    const [error, setError] = useState(null)
    

    
    /*
    setInterval(() => {
        Location.installWebGeolocationPolyfill()

        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60 * 24
        };

        function geoSuccess(position){
            console.log(position.coords.latitude);
            setCurrentPoint({lat: position.coords.latitude,lng:position.coords.longitude })
        }

        function geoFailure(err){
            setError({error: err.message});
        }

        navigator.geolocation.getCurrentPosition( geoSuccess, 
            geoFailure,
            geoOptions);


        if (currentPoint != origin.location){
            dispatch(setOrigin({
                location: {lat:null, lng:null},
                description: "You are moving"
            }))
        }

        
        
    }, 1000);
    */


    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50}

        })


    }, [origin, destination, GOOGLE_MAPS_KEY, pickUpLocation, navigation])

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json? units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
            
        }

        getTravelTime()

    }, [origin, destination, GOOGLE_MAPS_KEY, pickUpLocation, navigation])


    function destenationMarker(){
        if (destination != null){
            
            return (
                <Marker
        coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng

        }}
        title={isDriverMap ? "You will take your client here"  : "Your Elift will take you here"} 
        description={destination.description}
        identifier="destination"
        ></Marker>
            )
        }
    }




    function pickUpLocationMarker(){
        if (pickUpLocation != null){
            console.log(auth.currentUser.displayName + pickUpLocation)
            
            return (
                <Marker
        coordinate={{
            latitude: pickUpLocation.location.lat,
            longitude: pickUpLocation.location.lng

        }}
        title={isDriverMap ? "Pick Up your Client here" : "This is where you are"}
        description={pickUpLocation.description}
        identifier="pickUpLocation"
        ></Marker>
            )
        }

        
    }

    

    function drawMapLines(){
        if (origin != null && destination != null   &&  pickUpLocation == null){

           
            
            return (
                <MapViewDirections
                lineDashPattern={[0]}
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={3}
                strokeColor={"black"}
             />
            )
        }

        else if (origin != null && destination != null && pickUpLocation != null){
            return (
                <>
                <MapViewDirections
                lineDashPattern={[0]}
                origin={origin.description}
                destination={pickUpLocation.description}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={3}
                strokeColor={"black"} />

            <MapViewDirections
                lineDashPattern={[0]}
                origin={pickUpLocation.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={3}
                strokeColor={"black"} />

                </>
            )
        }
    }

    //console.log("This is pick up location" + JSON.stringify(pickUpLocation))


    function renderOriginMarker(){
        if (pickUpLocation != null && origin != null && isDriverMap == null){
            return (
                <Marker
            coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng

            }}
            title="This is where your driver currently is"
            description={origin.description}
            identifier="origin"
            ></Marker>
            )
        }
        else  {
            return (
                <Marker
            coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng

            }}
            title={isDriverMap   ? "This is where you are" : pickUpLocation == null ? "You and your driver are here" : "this is where your driver is"}
            description={origin.description}
            identifier="origin"
            ></Marker>
            )

        }
        
    }

    

    return (
    <MapView
        style={tw`flex-1`}
        ref={mapRef}
        initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
     }}>
        

        {pickUpLocationMarker()}

        {renderOriginMarker()}

        

        
         
         
        

        {destenationMarker()}

        {drawMapLines()}
         
    </MapView>

    )
}

const styles = StyleSheet.create({})
