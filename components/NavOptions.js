import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: "1",
        title: "Get a Ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },

    {
        id: "2",
        title: "become a Driver",
        image:  "https://media.istockphoto.com/vectors/business-person-driving-illustration-vector-id1145870715?k=6&m=1145870715&s=612x612&w=0&h=72phZMcepuZ_U8DPRitvNWLIrCLK_ytp32N66pPhla0=",
        screen: "DriverScreen",
    },
]

export default function NavOptions({navigation}) {

    const origin = useSelector(selectOrigin)


    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={() => {
                        if (item.screen == "MapScreen"){
                            navigation.navigate(item.screen, {driverPickUp: null})
                        }
                        else {

                            navigation.navigate(item.screen)
                        }
                    }}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    disabled={origin == null}
                >
                    <View style={tw`${origin == null && 'opacity-20'}`}>
                        <Image
                            style={{width: 120, height: 120, resizeMode: "contain"}}
                            source={{uri: item.image}}
                        ></Image>
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            type='antdesign'
                            name='arrowright'
                            color='white'
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        ></Icon>
                    </View>
                </TouchableOpacity>

            )}
        ></FlatList>
    )
}

const styles = StyleSheet.create({})
