import firebase from '../config/firebase';
import { View, Text, Image, Pressable } from 'react-native';
import { useState } from 'react';

function Post(props) {
    const [like, setLike] = useState(false);
    const post = props.postData;

    useEffect(()=> {
        if (post.likes.includes(auth.currentUser.email)) {
            setLike(true);
        }
    }, []);

    const darLike = () => {
        db.collection('posts')
        .doc(post.id)
        .update({
            like: firebase.firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => setLike(true))
        .catch((error) => {console.error(error);
        });
    };

    const quitarLike = () => {
        db.collection('posts')
        .doc(post.id)
        .update({
            like: firebase.firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => setLike(false))
        .catch((error) => {console.error('Error al quitar like: ', error);
        });
    };

    const comentar = () => {
        // hacercomentario del posteo
    }

    return (
        <View style={styles.container}>
            <Text style={styles.usuario}>{post.email}</Text>
            <Image
            source={{uri:post.imagen}}
            style={{width: 200, height: 200}}
            />
            <Text style={styles.description}>{post.descripcion}</Text>
            <Pressable style={styles.button} onPress={like ? quitarLike : darLike}>
                <Text style={styles.like}>Me gusta</Text>
            </Pressable>
            <Text style={styles.cantidadLikes}>Likes: {post.likes.length}</Text>
        </View>
    );
}

export default Post;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF9F7',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    usuario: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#8C7A6B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 5,
    },
    like: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cantidadLikes: {
        fontSize: 14,
    }
});