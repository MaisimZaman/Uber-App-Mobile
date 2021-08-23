import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth, db } from '../firebase'
import { useDispatch } from 'react-redux'
import { setDestination, setPickUpLocation } from '../slices/navSlice'
import { setOrigin } from '../slices/navSlice'
import { selectDestination } from '../slices/navSlice'
import { useSelector } from 'react-redux'
import { selectDocID } from '../slices/navSlice'
import tw from 'tailwind-react-native-classnames'


export default function DriverWaitingCard(props) {


    const dispatch = useDispatch()

    const [hasDriverReached, setDriverReached] = useState(false)
    const [hasDriverReachedDes, setDriverReachedDes] = useState(false)

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const documentID = useSelector(selectDocID)

    

    const destination = useSelector(selectDestination)



    setInterval(() => {
        db.collection("drivers").doc(documentID)
            .get()
            .then(doc => {
                if (doc.data().reachedPickUp == true){
                    setDriverReached(true)
                }
                else {
                    setDriverReached(false)
                    
                }

                if (doc.data().reachedDes == true){
                    setDriverReachedDes(true)
                }
                else {
                    setDriverReachedDes(false)
                }

            })

        if (hasDriverReached){
            dispatch(setPickUpLocation(null))

        }

        if (hasDriverReachedDes){
            dispatch(setOrigin(destination))
            dispatch(setPickUpLocation(null))
            dispatch(setDestination(null))
            
        }

    }, 1000);

    if (hasDriverReachedDes){
        return (
            <View>
                <Text style={tw`text-center py-5 text-xl`}>You have reached your desitination</Text>
            </View>
        )
    }


    if (hasDriverReached){
        return (
            <View>
                <Text style={tw`text-center py-5 text-xl`}>Your Driver has arrived and is waiting for you</Text>
            </View>
        )
    }

    return (
        <View>
            <Text style={tw`text-center py-5 text-xl`}>Your Driver is on his way</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
