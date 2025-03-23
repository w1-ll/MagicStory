import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Account from './components/Account';
import { View, ActivityIndicator } from 'react-native';
import { Session } from '@supabase/supabase-js';
import AppNavigator from './components/AppNavigator';
import LoggedInNavigator from './components/LoggedInNavigator';

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // undefined for initial loading state

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 🚀 Show a loading indicator while checking session state
  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? <LoggedInNavigator key={session.user.id} session={session} /> : <AppNavigator />}
    </View>
  );
}