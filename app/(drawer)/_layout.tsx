import { Feather } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen name='index' options={{ headerShown: false, drawerLabel: "Inicio", drawerIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }} />
                <Drawer.Screen name='favorites' options={{ headerShown: false, drawerLabel: "Favoritos", drawerIcon: ({ color, size }) => <Feather name="star" size={size} color={color} /> }} />
            </Drawer>
        </GestureHandlerRootView>

    )
}