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
        <View>
            <Text>{post.email}</Text>
            <Image
            source={{uri:post.imagen}}
            style={{width: 200, height: 200}}
            />
            <Text>{post.descripcion}</Text>
            <Pressable onPress={like ? quitarLike : darLike}>
                <Text>Me gusta</Text>
            </Pressable>
            <Text>Likes: {post.likes.length}</Text>
        </View>
    );
}

export default Post;