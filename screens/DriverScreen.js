import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { auth, db } from '../firebase'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'


const data = [
    {
        id: "Elift-X-123",
        title: "Elift-X",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Elift-XL-456",
        title: "Elift-XL",
        multiplier: 1.75,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Elift-LUX-789",
        title: "Elift-LUX",
        multiplier: 1.2,
        image: "https://links.papareact.com/7pf"
    },
]

export default function DriverScreen({navigation}) {

    const [selected, setSelected] = useState(null)
    const [uberExists, setUberExists] = useState(null)

    const origin = useSelector(selectOrigin)


    useEffect(() => {
        db.collection("drivers").where("driverId", "==",auth.currentUser.uid).get().then((snapshot) => {
           
            if (snapshot.size > 0){
                snapshot.forEach((doc) => {

            
                    if (doc.data().location.description == origin.description){
                        setUberExists(true)
                        navigation.navigate("DriverMapScreen")
    
                    }
                    else {
                        db.collection("drivers")
                            .doc(doc.id)
                            .delete()
                        setUberExists(false)
                    }
            })

            }

            else {
                setUberExists(false)
            }
            
            
        })

    }, [uberExists])



    function addDriver(){

    
        db.collection("drivers")
        .add({ 
            driverName: auth.currentUser.displayName,
            driverId: auth.currentUser.uid,
            uberType: selected.title,
            location: origin,
            reachedPickUp: false,
            reachedDes: false
        })

        setUberExists(true)

        

        

    }


    return (
        <View>
            <Text style={tw`text-center py-5 text-xl`}>What Type of car will you use?</Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`flex-row justify-between items-center px-10 ${item.id === selected?.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{uri: item.image}}
                        ></Image>
                        <View>
                            <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                            <Text>${item.multiplier}/Km charge rate</Text>
                        </View>
                        
                    </TouchableOpacity>
                )}  
            
            ></FlatList>

                <TouchableOpacity style={tw`bg-black py-3 m-3`} disabled={!selected}
                    onPress={addDriver}
                >
                    <Text style={tw`text-center text-white`}>
                        Go with {selected?.title}
                        </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})
