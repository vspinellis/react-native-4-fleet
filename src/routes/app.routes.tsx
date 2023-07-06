import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Departure from '../screens/Departure';
export function AppRouter() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='departure' component={Departure} />
    </Navigator>
  );
}
