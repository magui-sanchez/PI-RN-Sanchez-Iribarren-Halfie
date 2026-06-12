import { useEffect, useState } from "react";
import { View, Text } from "react-native";

function Camara(props) {

    const [permisos, setPermisos] = useState(false);

    useEffect(() => {
        Camara.requestCameraPermissionsAsync()
            .then(() => setPermisos(true))
            .catch((error) => console.log(error))
    }, []);

    return (
        <View style={styles.container}>
            {
                !permisos ?
                    <View>
                        <Text>Necesitas dar permisos para usar la camara</Text>
                    </View>
                    :
                     //Aqui vamos a usar y configurar el componente CameraView

  
	}
        </View>
    )

}
export default Camara