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
        <View style={styles.container}>
            <Text style={styles.register}>Register</Text>
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput style={styles.textInput} placeholder="Nombre de usuario" onChangeText={(text) => setNombreUsuario(text)} value={nombreUsuario} />
            <TextInput style={styles.textInput} placeholder="Contraseña" onChangeText={(text) => setContraseña(text)} value={contraseña} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.register}>Registrarme</Text>
            </Pressable>
            <Pressable style={styles.login} onPress={() => navegar()}>
                <Text>Ir a Login</Text>
            </Pressable>
        </View>
    )
}
export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F7',
        paddingHorizontal: 18,
        paddingTop: 10
    },
    register: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8C7A6B',
        textAlign: 'center',
        marginTop: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#8C7A6B',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#8C7A6B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    login: {
        backgroundColor: '#8C7A6B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
    }
});