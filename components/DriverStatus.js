import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { selectDestination, selectDocID, selectOrigin, setDestination, setPickUpLocation } from '../slices/navSlice'
import { setOrigin } from '../slices/navSlice'
import { useSelector } from 'react-redux'
import { selectPickUpLocation } from '../slices/navSlice'
import { auth, db } from '../firebase'
import tw from 'tailwind-react-native-classnames'

export default function DriverStatus({navigation}) {

    //const {docID} = props.route.params

    const dispatch = useDispatch();

    const pickUpLocation = useSelector(selectPickUpLocation)

    const origin = useSelector(selectOrigin)

    const destination = useSelector(selectDestination)

    const [onTheWay, setOnTheWay] = useState(false)

    const [eLiftComplete, setELiftComplete] = useState(false);

    const [documentID, setDocumentId] = useState('')

    //const documentID = useSelector(selectDocID)

    useEffect(() => {
        db.collection("drivers")
            .where("driverId", "==", auth.currentUser.uid)
            .get()
            .then(snap => {
                snap.forEach((doc => setDocumentId(doc.id)))
            })
    }, [])







    function setArrivedStatus(){
        dispatch(setPickUpLocation(null))
        db.collection("drivers")
            .doc(documentID)
            .update({
                reachedPickUp: true
                
            })

        setOnTheWay(true)

        



    }

    function setDestinationStatus(){
        dispatch(setOrigin(destination))
        dispatch(setPickUpLocation(null))
        dispatch(setDestination(null))

        db.collection("drivers")
            .doc(documentID)
            .update({
                reachedDes: true            
            })

        setELiftComplete(true)

        



    }

    function completeResetDrive(){
        db.collection("drivers")
            .doc(documentID)
            .update({
                reachedPickUp: false,
                reachedDes: false,
                location: origin,
            })

        navigation.navigate("DriverScreen")

        
    }

    
    if (onTheWay){
        return (
            <View>
                <Text style={tw`text-center py-5 text-xl`}>Driver Status</Text>
                <Button title="I have succesfully brought my client to their destination" onPress={() => setDestinationStatus()}></Button>
            </View>
        )

    }

    if (eLiftComplete){
        return (
            <View>
            <Text style={tw`text-center py-5 text-xl`}>Driver Status</Text>
            <Button title="Finish Drive" onPress={() => completeResetDrive()}></Button>
            </View>

        )
    }


    return (
        <View>
            <Text style={tw`text-center py-5 text-xl`}>Driver Status</Text>
            <Button title="Arrived and Ready to Pick Up!" onPress={() => setArrivedStatus()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({})
