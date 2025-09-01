import ShowPokemon from '@components/show';
import { Feather } from '@expo/vector-icons';
import { upperCase } from '@utils/stringUtils';
import { router } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDetailsController } from './detailsController';
import { detailsStyles as styles } from './detailsStyles';

export default function Details() {
  const {loading, pokemon, chain, gen, types, desc} = useDetailsController()

  if (loading) {
    return (
      <ActivityIndicator size='large' style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
    )
  }

  return (
    <ScrollView style={styles.container}>
    <TouchableOpacity style={styles.back} onPress={router.back}>
      <Feather name='arrow-left' size={22}/>
    </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.info}>
          <View style={styles.imgView}>
            <Image
              source={{ uri: pokemon?.sprites.front_default }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.content}>
            <Text>#{pokemon?.id} - {upperCase(pokemon?.name ?? '')}</Text>
            <Text>Geração: {gen?.toString()}</Text>
            {types.length > 1 ? <Text>Tipos:</Text> : <Text>Tipo: </Text>}
            <View style={styles.viewTypes}>
              <Image
                source={{ uri: types[0] }}
                style={styles.imgTypes}
              />
              <Image
                source={{ uri: types[1] }}
                style={styles.imgTypes}
              />

            </View>
          </View>
        </View>

        <View style={styles.descriptionArea}>
          <Text>Descrição: </Text>
          <View style={styles.descriptionCard}>
            <Text>{desc}</Text>
          </View>
        </View>

        <View style={styles.evolutions}>
          <View style={styles.evolutionsText}>
            <Text>Linha Evolutiva: </Text>
          </View>

          {chain.map((layer, layerIndex) => (
            <View key={layerIndex} style={[styles.layer, layerIndex === chain.length - 1 ? { marginBottom: 16 } : null,]}>
              {layerIndex > 0 ? <Feather name='arrow-down' size={20} /> : null}
              <View style={styles.layerItem}>
                {layer.map((item) => (
                  <ShowPokemon
                    key={item.name}
                    id={item.name}
                    toggle={() =>
                      router.push({
                        pathname: '/details',
                        params: { id: item.name.toString() }
                      })
                    }
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}