import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { auth, db } from '../firebase'
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { setDestination, setPickUpLocation } from '../slices/navSlice';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { useSelector } from 'react-redux';
import { selectDocID } from '../slices/navSlice';

export default function ClientRequestCard({navigation}) {

    const [requests, setRequests] = useState([]);

    const [selected, setSelected] = useState(null)
    
    

    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(setDestination(null))
        const unsubscribe = db.collection('driverRequest')
                    .doc(auth.currentUser.uid).collection('thisDriverRequests')
                    .onSnapshot((snapshot) => setRequests(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
        }))))

        return unsubscribe

    }, [])

    function dispatchInfo(client){
        setSelected(client)
        dispatch(setDestination(client.data.clientDestination))
        dispatch(setPickUpLocation(client.data.clientLocation))
        db.collection("driverRequest")
            .doc(client.data.clientId)
            .collection("thisDriverRequests")
            .doc(client.id)
            .update({
                accepted: true,
        })

        navigation.navigate("DriverStatusCard")

    }

    function declineInfo(client){
        db.collection("driverRequest")
            .doc(client.data.clientId)
            .collection("thisDriverRequests")
            .doc(client.id)
            .delete()
    }

   

    if (requests.length == 0){
        return (
            <Text style={tw`text-center py-5 text-xl`}>You have no client requests yet</Text>
        )
    }
    

    return (
        <View>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`flex-row justify-between items-center px-1 ${item.id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => dispatchInfo(item)}
                    >
                        
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: "contain",
                            }}
                            source={{uri: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}
                        ></Image>
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{item.data.clientName}</Text>
                            <Text>wants to go to {item.data.clientDestination.description}</Text>
                        </View>
                        <Text style={tw`text-center text-black text-xl`}>
                            Paid: {item.data.drivePrice}
                        </Text>
                        <Button title="Accept" onPress={() => dispatchInfo(item)}></Button>
                        <Button title="Decline" onPress={() => declineInfo(item)}></Button>
                        
                    </TouchableOpacity>
                )}  
            
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({})
