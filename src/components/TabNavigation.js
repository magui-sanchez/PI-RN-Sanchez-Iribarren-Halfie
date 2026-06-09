import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CrearPost from "../screens/CrearPost";


let Tab = createBottomTabNavigator();
function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{}}/>
            <Tab.Screen name="Crear Post" component={CrearPost} options={{}}/>
            <Tab.Screen name="Profile" component={Profile} options={{}}/>
        </Tab.Navigator>
    )
}
export default TabNavigation;