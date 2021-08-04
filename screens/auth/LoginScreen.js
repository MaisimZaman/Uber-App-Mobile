import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../../firebase'


export default function LoginScreen({ navigation }){

    const [email, setEmail]  = useState("");
    const [password, setPassword ] = useState("");

 
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace("HomeScreen"); 

            }

        });

        return unsubscribe;
        
    }, [])
    

    function signIn(){
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error))

        //console.log("This is a corrrect sign in")
        
    }
    
    
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light"></StatusBar>
            <Image
                source={
                    {uri: "https://cdn.vox-cdn.com/thumbor/8HW8iithLFbyZ62FRsgHUm3SpMY=/0x34:800x567/1400x1400/filters:focal(0x34:800x567):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/48711819/IMG_0713.0.0.jpg"}
                }

                style={{width: 200, height: 200}}
            ></Image>

            <View style={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                autoFocus 
                type="Email" 
                value={email} 
                onChangeText={(text) => setEmail(text)} />
                <Input 
                placeholder="Passowrd"  
                secureTextEntry   
                type="password" 
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login"></Button>
            <Button containerStyle={styles.button} onPress={() => navigation.navigate("RegisterScreen")} type="outline" title="Register"></Button>
            
        </KeyboardAvoidingView>
    )
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",


    },
    inputContainer: {
        width: 300,


    },
    button: {
        width: 200,
        marginTop: 10,

    },


})

