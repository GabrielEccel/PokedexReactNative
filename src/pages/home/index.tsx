import { InterfaceGen } from '@/src/types/interfaceGen';
import CheckBox from '@components/checkBox';
import ShowPokemon from '@components/show';
import { Feather } from '@expo/vector-icons';
import { getPokemon } from '@services/pokemonService';
import { usePokemonStore } from '@store/storePokemon';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export default function Home() {
    const {
        visiblePokemon,
        setVisiblePokemon,
        addVisiblePokemon,
        page,
        setPage,
        hasMore,
        setHasMore,
        loading,
        setLoading,
        showAll,
        setShowAll,
        selectedGens,
        setSelectedGens,
    } = usePokemonStore();

    const [pokemon, setPokemon] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const generations: InterfaceGen[] = [
        { gen: 'G1', firstId: 1, lastId: 151 },
        { gen: 'G2', firstId: 152, lastId: 251 },
        { gen: 'G3', firstId: 252, lastId: 386 },
        { gen: 'G4', firstId: 387, lastId: 494 },
        { gen: 'G5', firstId: 495, lastId: 649 },
        { gen: 'G6', firstId: 650, lastId: 721 },
        { gen: 'G7', firstId: 722, lastId: 809 },
        { gen: 'G8', firstId: 810, lastId: 908 },
        { gen: 'G9', firstId: 906, lastId: 1025 },
    ]

    useEffect(() => {
        setShowAll(true)
    }, [])

    useEffect(() => {
        if (showAll) {
            fetchAllPokemon();
        }
    }, [showAll])

    useEffect(() => {
        if (loading && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [loading]);


    const fetchPokemon = async () => {
        setVisiblePokemon([]);

        if (pokemon.trim() === '') {
            alert('Digite o nome de um pokemon');
            return;
        }

        try {
            setLoading(true)
            await new Promise(r => setTimeout(r, 1000));
            const response = await getPokemon(pokemon)
            setVisiblePokemon([response]);

        } catch (error) {
            console.log(error);
            alert("O pokemon não foi encontrado");
        }
        finally {
            setLoading(false);
            setPokemon('');
            setPage(1);
            setHasMore(true);
        }

    }

    const fetchAllPokemon = async () => {
        if (!hasMore || loading || !showAll) return;

        if (page === 1) {
            setVisiblePokemon([])
        }

        try {
            setLoading(true);
            await new Promise(r => setTimeout(r, 1000));

            const start = (page - 1) * 100 + 1;
            const end = page * 100;

            const requests: any = [];

            for (let i = start; i <= end && i <= 1025; i++) {
                requests.push(getPokemon(i));
            }

            const responses = await Promise.all(requests);
            const newPokemons = responses.map(res => res);

            addVisiblePokemon(newPokemons)

            if (end >= 1025) {
                setHasMore(false);
            } else {
                setPage(page + 1)
            }

        } catch (error) {
            console.log(error);
            alert("Erro ao carregar pokemons");
        } finally {
            setLoading(false);
        }
    };

    const toogleGens = (gen: InterfaceGen) => {
        if (selectedGens.some(g => g.gen === gen.gen)) {
            setSelectedGens(selectedGens.filter(g => g.gen !== gen.gen))
        } else {
            setSelectedGens([...selectedGens, gen])
        }
    }

    const fetchSelected = async () => {
        setVisiblePokemon([])
        setShowAll(false)

        try {
            setLoading(true)
            await new Promise(r => setTimeout(r, 1000));

            const requests: any = [];

            selectedGens.sort((a, b) => a.firstId - b.lastId).map((gen) => {
                for (let i = gen.firstId; i <= gen.lastId; i++) {
                    requests.push(getPokemon(i))
                }
            })

            const responses = await Promise.all(requests);
            const pokemons = responses.map((pokemon) => pokemon)

            setVisiblePokemon(pokemons)


        } catch (error) {
            console.log(error)
            alert('Erro ao carregar pokemons')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite o nome de um pokemon'
                    value={pokemon}
                    onChangeText={setPokemon}
                />
                <TouchableOpacity style={styles.buttonSend} onPress={() => { fetchPokemon(); setShowAll(false) }}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.options}>
                <TouchableOpacity onPress={() => setShowAll(true)}>
                    <Text style={styles.showAll}>Mostrar todos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Feather name='filter' color="#000" size={20} />
                </TouchableOpacity>
            </View>


            <FlatList
                ref={flatListRef}
                style={{ backgroundColor: "#e4e4e4ff" }}
                data={visiblePokemon}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ShowPokemon id={item.id} toggle={() => router.push({ pathname: '/details', params: { id: item.id.toString() } })} />}
                numColumns={3}
                onEndReached={fetchAllPokemon}
                ListFooterComponent={loading ? <ActivityIndicator size="large" style={styles.loading} /> : null}
            />

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                animationIn={'fadeInRight'}
                animationOut={'slideOutRight'}
                backdropOpacity={0.1}
                style={{ margin: 0, justifyContent: 'flex-start', alignItems: 'flex-end' }}
            >
                {isModalVisible && (
                    <View style={styles.filter}>
                        <Text style={styles.filterTitle}>Filtros</Text>
                        <Text style={styles.filterSubTitle}>Gerações: </Text>
                        <View>
                            {generations.map((gen) => (
                                <View style={styles.checkbox} key={gen.gen}>
                                    <CheckBox
                                        label={gen.gen}
                                        checked={selectedGens.some(g => g.gen === gen.gen)}
                                        ontoggle={() => toogleGens(gen)}
                                    />
                                </View>
                            ))}
                        </View>

                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.buttonApply} onPress={fetchSelected}>
                                <Text style={styles.applyText}>Aplicar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 70,
        paddingBottom: 24,
        height: 120,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    textInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 16,
        height: 40,
        width: '80%',
        paddingLeft: 16
    },
    buttonSend: {
        height: 40,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4630EB',
        borderRadius: 16
    },
    showAll: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    loading: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    filter: {
        backgroundColor: '#e4e4e4ff',
        width: '50%',
        padding: 20,
        marginTop: 136,
        borderBottomLeftRadius: 16
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    filterSubTitle: {
        fontSize: 16,
        marginBottom: 12
    },
    checkbox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    buttonView: {
        alignItems: 'center',
        marginTop: 24
    },
    buttonApply: {
        backgroundColor: '#4630EB',
        height: 30,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    applyText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    }
})