import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function Story() {
    const navigation = useNavigation<NativeStackNavigationProp<{ Home: undefined }>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Story Page</Text>
            <Text style={styles.content}>
                This is where the story content will go. Add your story details here.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
