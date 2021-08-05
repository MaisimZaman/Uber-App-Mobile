import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin, selectPickUpLocation } from '../slices/navSlice'
import { selectDestination } from '../slices/navSlice'
import { setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env'
import { useDispatch } from 'react-redux'



export default function Map({isDriverMap}) {

    const origin = useSelector(selectOrigin)
 
    const destination = useSelector(selectDestination)

    const pickUpLocation = useSelector(selectPickUpLocation)


    const mapRef = useRef()

    const dispatch = useDispatch();

    


    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {top: 50, right: 50, bottom: 50, left: 50}

        })


    }, [origin, destination])

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

    }, [origin, destination, GOOGLE_MAPS_KEY])


    function destenationMarker(){
        if (destination != null){
            
            return (
                <Marker
        coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng

        }}
        title={isDriverMap ? "You will take your client here"  : "This is where you will go"} 
        description={destination.description}
        identifier="destination"
        ></Marker>
            )
        }
    }


    function pickUpLocationMarker(){
        if (pickUpLocation != null && isDriverMap == true){
            
            return (
                <Marker
        coordinate={{
            latitude: pickUpLocation.location.lat,
            longitude: pickUpLocation.location.lng

        }}
        title="Pick Up your Client here"
        description={pickUpLocation.description}
        identifier="pickUpLocation"
        ></Marker>
            )
        }

        
    }

    

    function drawMapLines(){
        if (origin != null && destination != null   && isDriverMap == false){

           
            
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

        else if (origin != null && destination != null && pickUpLocation != null && isDriverMap == true){
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
        
        {drawMapLines()}
         
         
        <Marker
        coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng

        }}
        title="This is where you are"
        description={origin.description}
        identifier="origin"
        ></Marker>

        {destenationMarker()}
         
    </MapView>

    )
}

const styles = StyleSheet.create({})
