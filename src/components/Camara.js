import { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet} from "react-native";
import {CameraView, Camera} from "expo-camera";

function Camara(props) {

    const [permisos, setPermisos] = useState(false);
    const [tipo, setTipo]= useState("back");

    const camaraRef = useRef(null)

    useEffect(() => {
        Camera.requestCameraPermissionsAsync()
            .then(() => setPermisos(true))
            .catch((error) => console.log(error))
    }, []);

    const sacarFoto = async () => {
        if(camaraRef.current) {
            const foto = await camaraRef.current.takePictureAsync();
            props.setImagen(foto.uri);
        }
    };

    if(!permisos) {
        return (
            <View>
                <Text>Necesitas dar permisos para usar la camara</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={camaraRef}
                style={styles.camara}
                facing={tipo}
                />
        
            <Pressable style={styles.button}
                onPress={sacarFoto}>
                <Text style={styles.camara} > Tomar foto</Text>
            </Pressable>
        </View>
    );
}

export default Camara;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F7',
        paddingHorizontal: 18,
        paddingTop: 10
    },
    camara: {
        width: '100%',
        height: 300,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#8C7A6B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10
    }
});