import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'



export default class MyLocation extends React.Component {

    
    constructor(){
        super();
        this.state = {
            ready: true,
            where: {lat:null, lng:null},
            error: null
        }
    }
    
        
            
        
        
    
    geoSuccess = (position) => {
        console.log(position.coords.latitude);
        
        this.setState({
            ready:true,
            where: {lat: position.coords.latitude,lng:position.coords.longitude }
        })
    }
    geoFailure = (err) => {
        this.setState({error: err.message});
    }
    render() {



        

        Location.installWebGeolocationPolyfill()

        setInterval(() => {
            let geoOptions = {
                enableHighAccuracy: true,
                timeOut: 20000,
                maximumAge: 60 * 60 * 24
            };
    
            
            this.setState({ready:false, error: null });
            navigator.geolocation.getCurrentPosition( this.geoSuccess, 
                                                    this.geoFailure,
                                                    geoOptions);
            
        }, 1000);
        return (
            <View style={styles.container}>
                { !this.state.ready && (
                <Text style={styles.big}>Using Geolocation in React Native.</Text>
                )}
                { this.state.error && (
                <Text style={styles.big}>{this.state.error}</Text>
                )}
                { this.state.ready && (
                     
                    <Text style={styles.big}>{
                    `Latitude: ${this.state.where.lat}
                    Longitude: ${this.state.where.lng}`
                    }</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    big: {
        fontSize: 48
    }
});