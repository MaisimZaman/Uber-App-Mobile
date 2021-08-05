import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useSelector } from 'react-redux'
import { selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import Intl from 'intl';
import 'intl/locale-data/jsonp/en'; 

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "UberXL",
        multiplier: 1.75,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX-789",
        title: "UberLUX",
        multiplier: 1.2,
        image: "https://links.papareact.com/7pf"
    },
]

const SURE_CHARGE_RATE = 1.5


export default function RideOptionsCard(props) {
    const {navigation} = props

    const [selected, setSelected] = useState(null)
    
    const travelTimeInformation = useSelector(selectTravelTimeInformation)


    return (
     
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <TouchableOpacity style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`} 
                onPress={() => navigation.navigate("NavigateCard")}
            >
                <Icon type="fontawesome" name="chevron-left"></Icon>
            </TouchableOpacity>

            <View>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

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
                            <Text>{travelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-center text-black text-xl`}>
                            {new Intl.NumberFormat('en-us', {
                                style: "currency",
                                currency: "USD"
                            }).format(
                                (travelTimeInformation?.duration?.value * SURE_CHARGE_RATE * item.multiplier)/100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}  
            
            ></FlatList>

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity style={tw`bg-black py-3 m-3`} disabled={!selected}
                    onPress={() => navigation.navigate("FindCars", {carType: selected.title, carImage: selected.image, drivePrice: Intl.NumberFormat('en-us', {
                        style: "currency",
                        currency: "USD"
                    }).format(
                        (travelTimeInformation?.duration?.value * SURE_CHARGE_RATE * selected.multiplier)/100
                    ), driveTime: travelTimeInformation?.duration?.text})}
                >
                    <Text style={tw`text-center text-white`}>
                        Choose a {selected?.title}
                        </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
