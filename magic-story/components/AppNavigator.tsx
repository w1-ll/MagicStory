import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./Landing";
import Auth from "./Auth";
import { NavigationContainer } from '@react-navigation/native';
import SignUp from "./SignUp";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Auth} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}