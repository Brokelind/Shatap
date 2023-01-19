import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Home from "./screens/Home";
import SignUp from "./screens/Signup";
import { ActivityIndicator, View, } from "react-native";
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "./config/firebase";



const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return(
    <AuthenticatedUserContext.Provider value = {{ user,setUser }}>
        {children}
    </AuthenticatedUserContext.Provider>
  )
}


function ChatStack(){
return(
    
  <Stack.Navigator defaultScreenOptions={Home} screenOptions={{headerShown:true}}>

    <Stack.Screen name="On the train" component={Home}   />
    <Stack.Screen name="Chat" component={Chat}     />

  </Stack.Navigator>


)
}

function AuthStack ( ){
  return(
      
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login}     />
      <Stack.Screen name="Signup" component={SignUp}     />
    </Stack.Navigator>
  
  
  )
  }

function RootNavigator() {
  const {user,setUser} = useContext(AuthenticatedUserContext);
  const [loading,setLoading] = useState(true);

  useEffect(()=> {
    const unSubscribe = onAuthStateChanged(auth,
      async authenticatedUser =>{
        authenticatedUser ? setUser(authenticatedUser) : setUser(null); 
        setLoading(false);

      }
      ); 
    return ()=>unSubscribe();

  }, [user]);
  if (loading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return(
    <NavigationContainer>
      {user ? <ChatStack/> : <AuthStack/>}
    </NavigationContainer>

  )
}
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
    
  );
}
