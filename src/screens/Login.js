import React from "react";
import { View, Text, Pressable } from "react-native";

function Login(props) {
    function navegar() {
        props.navigation.navigate("Register")
    }
    return (
        <View>
            <Text>Login</Text>
            <Pressable onPress={() => navegar()}>
                <Text>Ir a Register</Text>
            </Pressable>
        </View>
    )
}
export default Login