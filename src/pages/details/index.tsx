import { InterfaceEvolutionDetail, InterfaceEvolutionLayer } from '@/src/types/interfaceEvolutionChain';
import { InterfacePokemon } from '@/src/types/interfacePokemon';
import ShowPokemon from '@components/show';
import { Feather } from '@expo/vector-icons';
import { getEvelotionChain, getPokemon, getPokemonSpecies, getTypeService } from '@services/pokemonService';
import { generationMap } from '@utils/genUtils';
import { sanitize, upperCase } from '@utils/stringUtils';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Details() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<InterfacePokemon>();
  const [gen, setGen] = useState<Number>();
  const [types, setTypes] = useState<string[]>([]);
  const [desc, setDesc] = useState('');
  const [chain, setChain] = useState<InterfaceEvolutionLayer[][]>([])

  const [errorMessage, seterrorMessage] = useState<string>();

  useEffect(() => {
    buildPokemon();
  }, [])

  useEffect(() => {
    getInfo();

  }, [pokemon])

  async function buildPokemon() {
    if (!id) return;
    try {
      const response = await getPokemon(id.toString())
      setPokemon(response)
    } catch (error) {
      seterrorMessage("Erro no build")
      console.log(error)
    } finally {
    }
  }

  function extracrEvolutionLayer(chain: InterfaceEvolutionDetail): InterfaceEvolutionLayer[][] {
    const layers: InterfaceEvolutionLayer[][] = [];

    function getLayer(node: InterfaceEvolutionDetail, depth: number = 0) {
      if (!layers[depth]) {
        layers[depth] = [];
      }

      layers[depth].push({
        name: node.species.name
      });

      node.evolves_to.forEach((item) => getLayer(item, depth + 1));
    }

    getLayer(chain)

    return layers;
  }

  async function getInfo() {
    if (!pokemon) return;
    try {
      const response = await getPokemonSpecies(pokemon.id)
      const generationName = response.generation.name
      const generationNumber = generationMap[generationName]
      setGen(generationNumber)

      const description = response.flavor_text_entries.find((item: any) => item.language.name === 'en')
      if (description) {
        setDesc(sanitize(description.flavor_text))
      }

      const pokeChain = await getEvelotionChain(pokemon.id)
      const list = extracrEvolutionLayer(pokeChain.chain)
      setChain(list)

      const typesInit = pokemon?.types.map(item => item.type.name).join(' ').split(' ');
      const imgTypes = [];

      if (typesInit?.length) {
        for (let i = 0; i < typesInit?.length; i++) {
          const response = await getTypeService(typesInit[i])
          imgTypes.push(response.sprites['generation-vi']['x-y'].name_icon)
        }
        setTypes(imgTypes)
      }

    } catch (error) {
      console.log("info", error)
    } finally {
      await new Promise(r => setTimeout(r, 500));
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ActivityIndicator size='large' style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
    )
  }

  if (errorMessage) {
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
  },
  back:{
    margin: 6,
    width: 25,
  },
  card: {
    backgroundColor: 'rgba(208,208,208, 0.4)',
    borderRadius: 24,
    flex: 1,
    marginBottom: 80
  },
  info: {
    height: 200,
    padding: 20,
    flexDirection: 'row'
  },
  imgView: {
    height: 150,
    width: 150,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8
  },
  image: {
    width: 150,
    height: 150,
  },
  content: {
    flex: 1,
    gap: 8
  },
  imgTypes: {
    height: 25,
    width: 65
  },
  viewTypes: {
    flexDirection: 'row',
    gap: 3
  },
  descriptionArea: {
    paddingHorizontal: 20,
    gap: 5,
  },
  descriptionCard: {
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8,
    padding: 8
  },
  evolutions: {
    backgroundColor: 'rgba(208,208,208, 1)',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  evolutionsText: {
    padding: 8
  },
  layer: {
    alignItems: 'center',
    marginTop: 8,
  },
  layerItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})