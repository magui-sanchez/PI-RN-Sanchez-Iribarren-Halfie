import React, { useState } from "react";
import { db } from "../config/firebase";
import { FlatList, Text, TextInput, View } from "react-native-web";
import { Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function Comentario(props) {
    const [comentario, setComentario] = useState("");
    const [listaComentarios, setListaComentarios] = useState(props.rout.params.data.data.comentarios);
    function comentar() {
        const info = {
            texto: comentario,
            user: auth.currentUser,email
        };
        db.collection('posts')
            .doc(props.route.params.data.id)
            .update({
                comentarios: firebase.firebase.FieldValue.arrayUnion(info)
            })
            .then(() => {
                const nuevaLista = [...listaComentarios, info];
                setComentario('');
                setListaComentarios(nuevaLista);            
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const data = props.rout.params.data;

    return(
        <View style={styles.card}>
            <Text style={styles.owner}> {data.data.email} </Text>
            <Text style={styles.description}> Posteo: {data.data.texto} </Text>

            <View style={styles.footer}> 
                <Text style={styles.likeCount}> Cantidad de likes: {data.data.likes.length} </Text>
            </View>
            
            {listaComentarios.length === 0 ? ( <Text style={styles.noComments}> No hay ningún comentario </Text>) : ( 
                <FlatList 
                    data={listaComentarios} 
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={styles.commentBox}>
                            <Text style={styles.commentUser}> {item.user} </Text>
                            <Text style={styles.commentText}> {item.texto} </Text>
                        </View>
                    )}
                />
            )}

            <View style={styles.commentSection}>
                <TextInput
                    style={styles.input}
                    placeholder= 'Escribe un comentario...'
                    onChangeText={(text) => setComentario(text)}
                    value = {comentario}
                />

                <Pressable style={styles.buttonLike} onPress={() => comentar()}>
                    <View style={styles.buttonPrimaryContent}>
                        <FontAwesome5 name="comment" size={24} color="white" />
                        <text style={styles.buttonText}> Comentar </text>
                    </View>
                </Pressable>

                <Pressable style={styles.buttonSecondary} onPress={() => props.navigation.navigate('Home')}>
                    <View style={styles.buttonSecondaryContent}>
                        <FontAwesome5 name="volver" size={24} color="black" />
                        <text style={styles.buttonSecondaryText}> Volver a Home </text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

export default Comentario

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FAF9F7',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    owner: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    likeCount: {
        fontSize: 14,
        color: '#8C7A6B',
    },
    noComments: {
        fontStyle: 'italic',
        color: '#8C7A6B',
        marginBottom: 10,
    },
    commentBox: {
        backgroundColor: '#EDEAE3',
        padding: 5,
        borderRadius: 5,
        marginBottom: 5,
    },
    commentUser: {
        fontWeight: 'bold',
    },
    commentText: {
        marginTop: 2,
    },
    commentSection: {
        marginTop: 10,
    },
    input: {
        borderColor: '#8C7A6B',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    buttonLike: {
        backgroundColor: '#8C7A6B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonPrimaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
    },
    buttonSecondary: {
        backgroundColor: '#EDEAE3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonSecondaryContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSecondaryText: {
        color: 'black',
        marginLeft: 5,
    }
});