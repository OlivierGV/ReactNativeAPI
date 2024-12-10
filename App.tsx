/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Card } from '@rneui/themed';
import { Utilisateur } from './components/utilisateur.component';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';
import { plusieursUsers } from './util/api';
import { BoutonAjout } from './components/bouton.component';


function App(): React.JSX.Element {
  const [utilisateurs, setUtilisateurs] = React.useState<Utilisateur[]>([]);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    plusieursUsers(setUtilisateurs);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
          
        {
          utilisateurs.map((utilisateur) => {
            return (
              <View style={styles.user}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: utilisateur.picture.medium }}
                />
                <Text style={styles.name}>{utilisateur.name.title}. {utilisateur.name.last}</Text>
              </View>
            )
          })
        }
      <BoutonAjout utilisateurs={utilisateurs} setUtilisateurs={setUtilisateurs}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });
  
export default App;
