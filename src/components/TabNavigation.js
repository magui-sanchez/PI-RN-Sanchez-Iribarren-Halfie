import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import CrearPost from "../screens/CrearPost";


let Tab = createBottomTabNavigator();
function TabNavigation() {
    return (
        <Tab.Navigator style={styles.container}>
            <Tab.Screen style={styles.home} name="Home" component={Home} options={{}}/>
            <Tab.Screen style={styles.crearPost} name="Crear Post" component={CrearPost} options={{}}/>
            <Tab.Screen style={styles.profile} name="Profile" component={Profile} options={{}}/>
        </Tab.Navigator>
    )
}
export default TabNavigation;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#FAF9F7',
        paddingHorizontal: 18,
        paddingTop: 10
    },
    home: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8C7A6B',
        textAlign: 'center',
        marinTop: 10,
        marginBottom: 6
    },
    crearPost: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8C7A6B',
        textAlign: 'center',
        marinTop: 10,
        marginBottom: 6
    },
    profile: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8C7A6B',
        textAlign: 'center',
        marinTop: 10,
        marginBottom: 6
    }
});