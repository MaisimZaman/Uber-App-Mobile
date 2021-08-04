import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button} from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { auth, db } from '../firebase'


/*
const data = [
    {
        id: "1",
        icon: "home",
        location: "Home",
        locationPoint: {location: {lat: 43.7081325, lng: -79.8184677}, description: "15 CharlesWood-Circle, Brampton, ON, Canada"},
        destenation: "15 CharlesWood-Circle, Brampton, ON, Canada"
    },
    {
        id: "2",
        icon: "briefcase",
        location: "work",
        destenation: "Tesla, Toronto"
    }
]
*/

export default function NavFavourites({navigation}) {

    const dispatch = useDispatch();

    const [data, setData] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('locations')
        .doc(auth.currentUser.uid).collection('userLocations')
        .onSnapshot((snapshot) => setData(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))))
                            

        return unsubscribe
    }, [])

    
    
    return (
        <View>
            <Button title="Add Location" onPress={() => navigation.navigate("CreateLocation")}></Button>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                    <View style={[tw`bg-gray-200`, {height: 0.5}]}></View>
                )}
                renderItem={({item}) => (
                    <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={() => dispatch(setDestination({location: item.data.locationPoints, description: item.data.placeName}))}>
                        <Icon
                        style={"mr-4 rounded-full bg-gray-300 p-3"}
                        name={"home"}
                        type="ionicon"
                        color="black"
                        size={18}
                        ></Icon>

                        <View>
                            <Text style={tw`font-semibold text-lg`}>{item.data.placeRefer}</Text>
                            <Text style={tw`text-gray-500`}>{item.data.placeName}</Text>
                        </View>
                    </TouchableOpacity>
            ) }
            ></FlatList>
        </View>
    
    )
}

const styles = StyleSheet.create({})
