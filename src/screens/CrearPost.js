import { useState } from "react";
import { View, Text, Pressable, TextInput, Image, ActivityIndicator } from "react-native";
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
        <View>
            <Text>Crear Post</Text>

            <TextInput
                placeholder="Descripcion"
                value={descripcion}
                onChangeText = {(text) => setDescripcion(text)}
                multiline
            />
            <Pressable onPress={seleccionDesdeGaleria}>
                <Text>Seleccionar desde galeria</Text>
            </Pressable>
            <Pressable onPress={tomarFoto}>
                <Text>Tomar foto</Text>
            </Pressable>

            {imagen && <Image source={{uri: imagen}} style={{width: 200, height: 200}} />}
            {error ? <Text>{error}</Text> : null}

            {loading ? <ActivityIndicator/> : <Pressable onPress={subirPost}>
                <Text>Publicar</Text>
            </Pressable>
            }
        </View>
    )
}
export default CrearPost;