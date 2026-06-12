import React from "react";
import {useState, useEffect} from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { FlatList } from "react-native-web";

function Profile(props) {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const user = auth.currentUser;
        db.collection('posts')
            .where('owner', '==', user.email)
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                postsArr.push({
                    id: docs.id,
                    data: docs.data(),
                });
            });
    }, []);

    const logout = () => {
        auth.signOut();
        props.navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <Text style={styles.label}>Usuario</Text>
                <Text style={styles.value}>
                    {auth.currentUser.displayName
                        ? auth.currentUser.displayName
                        : "Sin nombre de usuario"}
                </Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{auth.currentUser.email}</Text>
            </View>

            <Text style={styles.sectionTitle}>Mis posteos</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#6200ea" />
            ) : myPosts.length === 0 ? (
                <Text style={styles.emptyText}>Todavía no tenés posteos.</Text>
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={myPosts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.postCard}>
                                <Text style={styles.postDescription}>
                                    {item.data.description}
                                </Text>
                                <Text style={styles.postDate}>
                                    {item.data.createdAt
                                        ? new Date(item.data.createdAt).toLocaleDateString()
                                        : ""}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}

            <Pressable style={styles.logoutBtn} onPress={() => logout()}>
                <Text style={styles.logoutText}>Desloguearse</Text>
            </Pressable>

        </View>
    );
}
export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    userCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 16,
      marginBottom: 24,
      borderWidth: 0.5,
      borderColor: "#ddd",
    },
    label: {
      fontSize: 12,
      color: "#888",
      marginTop: 8,
      textTransform: "uppercase",
    },
    value: {
      fontSize: 16,
      color: "#333",
      marginTop: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "500",
      color: "#333",
      marginBottom: 12,
    },
    listContainer: {
      flex: 1,
      width: "100%",
    },
    postCard: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 14,
      marginBottom: 10,
      borderWidth: 0.5,
      borderColor: "#ddd",
    },
    postDescription: {
      fontSize: 15,
      color: "#333",
    },
    postDate: {
      fontSize: 12,
      color: "#aaa",
      marginTop: 6,
    },
    emptyText: {
      fontSize: 14,
      color: "#aaa",
      textAlign: "center",
      marginTop: 20,
    },
    logoutBtn: {
      backgroundColor: "#6200ea",
      borderRadius: 8,
      padding: 14,
      alignItems: "center",
      marginTop: 16,
    },
    logoutText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "500",
    },
  });