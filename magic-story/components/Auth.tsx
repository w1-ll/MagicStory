import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Image, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/LogoDoOver.png')}
        style={styles.image}
      />
      <Text style={styles.heading}>Login</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.my20, styles.buttonStyle]}>
        <Button buttonStyle={[styles.buttonStyle]} title="Login" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.separator} />
      <View style={styles.verticallySpaced}>
        <Button buttonStyle={[styles.buttonStyle]} title="Sign up" disabled={loading} onPress={() => { navigation.navigate('Signup') }} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button buttonStyle={[styles.buttonStyle]} title="Back" onPress={() => { navigation.navigate('Landing') }} />
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
  heading: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  my20: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#218380',
    borderRadius: 25,
  },
})