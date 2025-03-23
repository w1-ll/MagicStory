import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function Landing({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Magic Story</Text>
            <Text style={styles.subText}>Create Your Own Adventure and Choose What Happens Next in a Magical World!</Text>
            <Image
                source={require('@/assets/magic-story-logo.jpg')}
                style={styles.image}
            />
            <Pressable style={styles.button} onPress={() => { navigation.navigate('Login') }}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => { navigation.navigate('Signup') }}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#dbe9ee',
    },
    text: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#218380',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'stretch',
        marginHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    subText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
});

