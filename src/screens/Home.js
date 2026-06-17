import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../config/firebase";
import { ActivityIndicator, FlatList} from "react-native-web";
import CrearPost from "./CrearPost";

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                const postsObtenidos = docs.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setPosts(postsObtenidos);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Últimos posts</Text>
            
            {loading ? (
                <ActivityIndicator size='large' color= '#8C7A6B' />
            ) : posts.length === 0 ? (
                <Text style={styles.empty}>Todavía no hay posts.</Text>
            ) : (
                <FlatList 
                    data= {posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CrearPost postData={item} navegacion={props.navigation} />
                    )}
                />
            )}
        </View>
    );
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F7',
        paddingHorizontal: 18,
        paddingTop: 10
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#8C7A6B',
        textAlign: 'center',
        marinTop: 10,
        marginBottom: 6
    },
    empty: {
        textAlign: 'center',
        color: '#8C7A6B',
        fontSize: 18,
        marinTop: 30
    },
});