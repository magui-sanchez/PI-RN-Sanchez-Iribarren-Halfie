import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { auth, db } from "../config/firebase";

function Register(props) {

    const [email, setEmail] = React.useState("");
    const [nombreUsuario, setNombreUsuario] = React.useState("");
    const [contraseña, setContraseña] = React.useState("");
    const [error, setError] = React.useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user!=null) {
                props.navigation.navigate("TabNavigation")
            }
        })
    }, [])

    function navegar() {
        props.navigation.navigate("Login")
    }

    function onSubmit() {
        auth.createUserWithEmailAndPassword(email, contraseña)
            .then(() => {
                auth.currentUser.updateProfile({
                    displayName: nombreUsuario,
                });
                db.collection("users").add({
                    email: email,
                    nombreUsuario: nombreUsuario,
                    createdAt: Date.now()
                })
                props.navigation.navigate("Login")
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            })
    }

    return (
        <View>
            <Text>Register</Text>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput placeholder="Nombre de usuario" onChangeText={(text) => setNombreUsuario(text)} value={nombreUsuario} />
            <TextInput placeholder="Contraseña" onChangeText={(text) => setContraseña(text)} value={contraseña} />
            {error ? <Text>{error}</Text> : null}
            <Pressable onPress={() => onSubmit()}>
                <Text>Registrarme</Text>
            </Pressable>
            <Pressable onPress={() => navegar()}>
                <Text>Ir a Login</Text>
            </Pressable>
        </View>
    )
}
export default Register