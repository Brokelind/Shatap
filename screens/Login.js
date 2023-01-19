import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { Alert, View, Text , StyleSheet, ImageBackground} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { Image } from "react-native";

import { auth } from "../config/firebase";


export default function Login({navigation}){


    const [email, setEmail] = useState("");
    const[password,setPassword]= useState("");

    const onHandleLogin = ()=>{
        if (email !== "" && password!==""){
            signInWithEmailAndPassword(auth,email,password)
            .then(()=> console.log("login sucess"))
            .catch((err)=> Alert.alert("loginerror",err.message));
        }
    }

    return(
        <ImageBackground 
        source={require("../images/ColorSplash.png")}style={{width: '100%', height: '100%'}}>

        <View style={styles.container}>
        <Image source={require("../images/ColorSplash.png")}style={{
            width: '100%', height: '50%',
            borderRadius:40}}/>


           
                

            <SafeAreaView style={styles.container}>
                <Text style={{alignContent:'center'}}> Log in </Text>
                <TextInput
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                
                />
                <Text> Password </Text>
                <TextInput
                    placeholder="Enter Password"
                    autoCapitalize="none"
                    keyboardType="visible-password"
                    textContentType="password"
                    autoFocus={true}
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                
                />

                <TouchableOpacity onPress={onHandleLogin}
                
                style={{
                    borderRadius:10,
                    backgroundColor:"#E4C392",
                    shadowColor:"green",
                    padding:20
                }}>
                    <Text style={{fontSize:28}}>Enter Shatap</Text>
                </TouchableOpacity>

                <View style={{justifyContent:"flex-start",flexDirection:"row"}}>
                <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
                    <Text style={{fontSize:13, color:"orange"}}>Sign Up </Text>
                </TouchableOpacity>



                </View>


            </SafeAreaView>
           
        </View>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({

    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:"space-evenly",
        alignItems:"center"
    },

    signs:{color:"blue", borderRightWidth:2

    }




}
)







