import React, {useState} from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.login}>Login</Text>
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput style={styles.textInput} placeholder="Contraseña" onChangeText={(text) => setContraseña(text)} value={contraseña} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text>Iniciar sesión</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navegar()}>
                <Text styles={styles.register}>Ir a Register</Text>
            </Pressable>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F7',
        paddingHorizontal: 18,
        paddingTop: 10
    },
    login: {
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
    register:{ 
        color: '#8C7A6B',
        textAlign: 'center',
        marginTop: 10,
    }
});