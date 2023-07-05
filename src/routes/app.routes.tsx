import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
export function AppRouter() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
    </Navigator>
  );
}
