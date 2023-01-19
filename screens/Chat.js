import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { addDoc, collection, orderBy, query,onSnapshot } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { auth, database } from "../config/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import {AntDesign} from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function Chat (){

    const [messages,setMessages] = useState([]);
    const navigation = useNavigation();


    const onSignOut= ()=> {
        signOut(auth).catch(error=>console.log(error));
    };

    useLayoutEffect(()=>{
                navigation.setOptions({
                  headerRight:()=>(  
                    <TouchableOpacity style={{marginRight:15, backgroundColor:"white"}}
                        onPress={onSignOut} >
                            <AntDesign name="logout" size={23}
                            color="black" style={{marginRight:10, marginBottom:10,
                            color:"black", backgroundColor:"white", flex:1 }}
                            />

                    </TouchableOpacity>

                  )

                })



    } , [navigation]);

    useLayoutEffect(()=>{
        const collectionRef=collection(database,'chats');
        const q = query(collectionRef, orderBy("createdAt","desc"));
        const unsubscribe= onSnapshot(q, snapshot => {
            console.log("snapshot",snapshot);
            setMessages(snapshot.docs.map(doc => ({
                _id:doc.id,
                createdAt:doc.data().createdAt.toDate(),
                text: doc.data().text,
                user:doc.data().user,
            })))
        });
        return ()=> unsubscribe();
    },[]);

    const onSend = useCallback((messages=[])=>{
        setMessages(previousMessages => GiftedChat.append(previousMessages,messages));

        const {_id,createdAt,text,user}=messages[0];
        addDoc(collection(database,"chats"),{
                _id, createdAt,text,user,
        });

    },[]);


    return(
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          showUserAvatar={true}
          onSend={messages => onSend(messages)}
          renderAvatarOnTop={true}
          messagesContainerStyle={{
            
          }}
          textInputStyle={{
           
            borderRadius: 20,
          }}
        user={{
            _id: auth?.currentUser?.email,
            avatar: "https://placeimg.com/640/480/animals"
        }}
        />
    )
}