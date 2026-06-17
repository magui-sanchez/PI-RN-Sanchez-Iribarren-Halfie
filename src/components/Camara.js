import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
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
            
            <Pressable
                onPress={() => setTipo(tipo === "back" ? "front" : "back")}>
                <Text> Cambiar camara</Text>
            </Pressable>
            <Pressable
                onPress={sacarFoto}>
                <Text> Tomar foto</Text>
            </Pressable>
        </View>
    );
}

export default Camara;