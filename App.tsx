import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen        from './src/screens/HomeScreen'
import CapitulosScreen   from './src/screens/CapitulosScreen'
import LecturaScreen     from './src/screens/LecturaScreen'
import RutasScreen       from './src/screens/RutasScreen'
import RutaDetalleScreen from './src/screens/RutaDetalleScreen'
import EmocioneScreen    from './src/screens/EmocioneScreen'
import AcercaDeScreen   from './src/screens/AcercaDeScreen'
import PreguntasScreen  from './src/screens/PreguntasScreen'
import AlegriasScreen  from './src/screens/AlegriasScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home"        component={HomeScreen} />
        <Stack.Screen name="Capitulos"   component={CapitulosScreen} />
        <Stack.Screen name="Lectura"     component={LecturaScreen} />
        <Stack.Screen name="Rutas"       component={RutasScreen} />
        <Stack.Screen name="RutaDetalle" component={RutaDetalleScreen} />
        <Stack.Screen name="Emociones"  component={EmocioneScreen} />
        <Stack.Screen name="AcercaDe"   component={AcercaDeScreen} />
        <Stack.Screen name="Preguntas"  component={PreguntasScreen} />
        <Stack.Screen name="Alegrias"   component={AlegriasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  )
}
