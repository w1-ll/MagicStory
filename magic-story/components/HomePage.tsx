import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button } from '@rneui/themed'

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <View style={styles.verticallySpaced}>
                <Button buttonStyle={[styles.buttonStyle]} title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#dbe9ee',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    buttonStyle: {
        backgroundColor: '#218380',
        borderRadius: 25,
    },
})
