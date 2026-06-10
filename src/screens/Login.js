import React, {useState} from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { auth } from "../config/firebase";

function Login(props) {
    const [email, setEmail] = React.useState("");
    const [contraseña, setContraseña] = React.useState("");
    const [error, setError] = React.useState("");

    function onSubmit() {
        auth.signInWithEmailAndPassword(email, contraseña)
            .then(() => {
                props.navigation.navigate("TabNavigation")
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            })
    }
    function navegar() {
        props.navigation.navigate("Register")
    }
    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput placeholder="Contraseña" onChangeText={(text) => setContraseña(text)} value={contraseña} />
            {error ? <Text>{error}</Text> : null}
            <Pressable onPress={() => onSubmit()}>
                <Text>Iniciar sesión</Text>
            </Pressable>
            <Pressable onPress={() => navegar()}>
                <Text>Ir a Register</Text>
            </Pressable>
        </View>
    )
}
export default Login