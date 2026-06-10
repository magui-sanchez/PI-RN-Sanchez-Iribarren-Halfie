import React from "react";
import { View, Text, Pressable } from "react-native";
import { auth } from "../config/firebase";

function Profile(props) {

    const logout = () => {
        auth.signOut();
        props.navigation.navigate("Login");
    }

    return (
        <View>
            <Text>Profile</Text>
            <Pressable onPress={() => logout()}>
                <Text>Desloguearse</Text>
            </Pressable>
        </View>
    )
}
export default Profile