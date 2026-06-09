import React from "react";
import { View, Text, Pressable } from "react-native";

function Register(props) {
    function navegar() {
        props.navigation.navigate("Login")
    }
    return (
        <View>
            <Text>Register</Text>
            <Pressable onPress={() => navegar()}>
                <Text>Ir a Login</Text>
            </Pressable>
        </View>
    )
}
export default Register