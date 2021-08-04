import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import {GOOGLE_MAPS_KEY} from '@env'

export default function findCars(props) {

    const {carType, carImage} = props.route.params

    const [allCars, setAllCars] = useState([])

    const [selected, setSelected] = useState(null)

    const [distance, setDistance] = useState('')

    const origin = useSelector(selectOrigin)


    useEffect(() => {
        db.collection("drivers")
            .where("uberType", "==", carType)
            .get()
            .then((snapshot) => setAllCars(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))))
        
    }, [])

    const getTravelTime =  (driverLoc) => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json? units=imperial&origins=${origin.description}&destinations=${driverLoc}&key=${GOOGLE_MAPS_KEY}`)
        .then(res => res.json())
        .then(data => {
            setDistance(data.rows[0].elements[0].distance.text)
        })
        
    }

    if (allCars.length == 0){
        return (
            <View>
                <Text style={tw`text-center py-5 text-xl`}>Currently no avalible {carType}</Text>
            </View>
        )
    } 

    return (
        <View>
         
            <Text style={tw`text-center py-5 text-xl`}>Avalible {carType} cars</Text>
            <FlatList
                data={allCars}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`flex-row justify-between items-center px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}
                    >
                        {getTravelTime(item.data.location.description)}
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{uri: carImage}}
                        ></Image>
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{item.data.driverName}</Text>
                            <Text>{distance} away from you</Text>
                        </View>
                        
                    </TouchableOpacity>
                )}  
            
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({})
