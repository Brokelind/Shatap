import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { Alert, View, Text , StyleSheet} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";

import { auth } from "../config/firebase";


export default function Signup({navigation}){

    const [email, setEmail] = useState("");
    const[password,setPassword]= useState("");

    const onHandleSignup = ()=>{
        if (email !== "" && password!==""){
            createUserWithEmailAndPassword(auth,email,password)
            .then(()=> console.log("signup sucess"))
            .catch((err)=> Alert.alert("signuperror",err.message));
        }
    }

    return(
        <View style={styles.container}>

            <SafeAreaView style={styles.container}>
                <Text style={{alignContent:'center'}}> Sign up</Text>
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

                <TouchableOpacity onPress={onHandleSignup}>
                    <Text style={{
                    borderRadius:24,
                    color:"green",
                    borderStartColor:"green",
                    backgroundColor:"#E4C392",
                    shadowColor:"green",
                    padding:30,
                    borderWidth:1,
                    borderColor:"blue"
                }}> 
                Sign Up </Text>
                </TouchableOpacity>

                <View style={{justifyContent:"flex-start",flexDirection:"row"}}>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                    <Text style={{fontSize:13, color:"orange"}}>Back to log in </Text>
                </TouchableOpacity>



                </View>


            </SafeAreaView>

        </View>

    )
}


const styles = StyleSheet.create({

    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:"space-evenly",
        alignItems:"center"
    },




}
)







