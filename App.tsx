import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, RobotoCondensed_400Regular } from '@expo-google-fonts/roboto-condensed';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import HomeScreen from "./screens/HomeScreen"


export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoMono_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80, // TODO: make this more accurate using safe area
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
