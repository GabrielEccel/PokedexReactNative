import ShowPokemon from '@components/show';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFavoritesController } from './favoritesController';
import { favoritesStyles as styles } from './favoritesStyles';

export default function Favorites() {
  const { pokemon, visiblePokemon, exists, toggleExists, togglePokemon, searchPokemon,showAll, excludeAll, empty, toggleEmpty } = useFavoritesController()

  if(!exists){
    toggleExists(true)
    return (
      Alert.alert('Pokemon não encontrado', 'Esse pokemon pode não existir ou não estar em seus favoritos')
    )
  }

  if(empty){
    toggleEmpty(false)
    return(
      Alert.alert('Nenhum pokemon marcado como favorito', 'Marque algum pokemon como favorito antes de usar esta função')
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <DrawerToggleButton tintColor='black' />

        <View style={styles.search}>
          <TextInput
            style={styles.textInput}
            placeholder='Digite o nome de um pokemon'
            value={pokemon}
            onChangeText={togglePokemon}
          />
          <TouchableOpacity style={styles.buttonSend} onPress={() => searchPokemon(pokemon)}>
            <Text>Enviar</Text>
          </TouchableOpacity>

        </View>

      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={showAll}>
          <Text style={styles.showAll}>Mostrar todos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={excludeAll}>
          <Text style={styles.showAll}>Excluir todos</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        style={{ backgroundColor: "#e4e4e4ff" }}
        data={visiblePokemon}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ShowPokemon id={item.id.toString()} toggle={() => router.push({ pathname: '/details', params: { id: item.id.toString() } })} />}
        numColumns={3}
      />
    </View>
  );
}