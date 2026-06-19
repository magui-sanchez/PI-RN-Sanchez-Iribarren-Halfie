import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Comentario from '../screens/Comentario';

const Stack=createNativeStackNavigator ();
function MenuHome() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Comentarios" component={Comentario} options={{}}/>
        </Stack.Navigator>
    )
}
export default MenuHome;