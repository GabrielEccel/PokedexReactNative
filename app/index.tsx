
import { api } from '@/services/api';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ShowPokemon from './components/show';

export default function Index() {
    const [pokemon, setPokemon] = useState('');
    const [loading, setLoading] = useState(false);
    const [visiblePokemon, setVisiblePokemon] = useState<any[]>([]);

    const fetchPokemon = async () => {
        if (pokemon.trim() === '') {
            alert('Digite o nome de um pokemon');
            return;
        }

        try {
            setLoading(true)
            const response = await api.get(`pokemon/${pokemon.toLowerCase()}`);
            setVisiblePokemon([response.data]);
        } catch (error) {
            console.log(error);
            alert("O pokemon não foi encontrado");
            setVisiblePokemon([]);
        }
        finally {
            setLoading(false);
        }

    }

    const fetchAllPokemon = async () => {
        try {
            setLoading(true);
            let pokemonsArray = [];
            for (let i = 1; i <= 1025; i++) {
                const response = await api.get(`pokemon/${i}/`);
                pokemonsArray.push(response.data);
            }
            setVisiblePokemon(pokemonsArray);
            console.log(pokemonsArray);

        } catch (error) {
            console.log(error);
            alert("Um pokemon não foi encontrado");
            setVisiblePokemon([]);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite o nome de um pokemon'
                    value={pokemon}
                    onChangeText={setPokemon}
                />
                <TouchableOpacity style={styles.buttonSend} onPress={fetchPokemon}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={fetchAllPokemon}>
                <Text style={styles.showAll}>Mostrar todos</Text>
            </TouchableOpacity>

            {loading ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando...</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.grid}>
                    {visiblePokemon.map((pokemon: any, index: number) => (
                        <ShowPokemon key={index} pokemon={pokemon} />
                    ))}
                </ScrollView>
                )}



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        backgroundColor: '#155ec4',
        borderRadius: 16
    },
    showAll: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: 16
    }
})