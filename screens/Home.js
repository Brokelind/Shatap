
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, View, Text , StyleSheet, Image} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import {Entypo} from "@expo/vector-icons"


 
import { auth } from "../config/firebase";
import Chat from "./Chat";


const Home = ()=> {
    const navigation = useNavigation();
    useEffect(()=> {
            navigation.setOptions({
                    // headerLeft: ()=> (
                    //      <Image      
                    //      style={{
                    //         width: 390,
                    //         height: 390,
                    //         marginTop:1000,
                    //         justifyContent:"center",
                    //         borderColor:"lightblue",
                    //         borderRadius:80,
                    //         borderWidth:7
                            
                            
                    //     }}
                    //     source={require("../images/CloverOak.png")}  />
                        
                    // ),
                    headerRight: ()=> {
                        // <image  
                        // style={{marginRight:15}}  />
                        <Text> ASd</Text>
                    },
            });
    }, [navigation]);

return(
    <View style={styles.container}>
        
        <TouchableOpacity onPress={()=> navigation.navigate("Chat")}>

            {/* <Entypo name="chat" size={40} color="grey" style={{borderColor:"green",
            borderWidth:0.151, marginTop:20, marginBottom:200
            }}
            /> */}
            <Image      
                         style={{
                            width:  "80%",
                            height: "80%",
                            marginTop:10,
                            alignItems:"center",
                            alignContent:"center",
                            alignSelf:"center",
                            justifyContent:"center",
                            borderColor:"#5E966A",
                            borderRadius:80,
                            borderWidth:7
                        }}
                        source={require("../images/CloverOak.png")}  />

        </TouchableOpacity>

    </View>
)

}

export default Home;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        
        flex:1,
        justifyContent:"center",

    }
}
)







