import { useState } from "react";
import { View, Text, Pressable, TextInput, Image, ActivityIndicator, StyleSheet } from "react-native";
import Camara from '../components/Camara';
import { auth, db } from "../config/firebase";

function CrearPost(props) {
    const[descripcion, setDescripcion] = useState("");
    const[imagen, setImagen] = useState(null);;
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState('');

   

    const subirPost = async () => {
        if(!descripcion.trim() || !imagen){
            setError('La descripcion y la imagen son obligatorias');
            return;
        }
        setError('');
        setLoading(true);

        const user = auth.currentUser;

        try {
            await db.collection('posts').add({
                descripcion: descripcion.trim(),
                imagen: imagen,
                email: user.email,
                createdAt: Date.now(),
                likes: [],
            });
            setDescripcion('');
            setImagen(null);
            alert('Post publicado exitosamente');
            props.navigation.navigate('Home');
        } catch (error) {
            setError('Error al publicar el posteo');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.create}>Crear Post</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Descripcion"
                value={descripcion}
                onChangeText = {(text) => setDescripcion(text)}
                multiline
            />

            <Camara setImagen={setImagen}/>

            {imagen && <Image source={{uri: imagen}} style={{width: 200, height: 200}} />}
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? 
            <ActivityIndicator/> : 
            <Pressable style={styles.button} onPress={subirPost}>
                <Text style={styles.publicate}>Publicar</Text>
            </Pressable>
            }
        </View>
    );
}
export default CrearPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    create: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#8C7A6B',
        padding: 10,
        borderRadius: 5,
    },
    publicate: {
        color: 'white',
        fontWeight: 'bold',
    },
});