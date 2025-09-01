import CheckBox from '@components/checkBox';
import ShowPokemon from '@components/show';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useHomeController } from './homeController';
import { homeStyles as styles } from './homeStyles';

export default function Home() {
    const {pokemon, flatListRef, visiblePokemon, loading, isModalVisible, generations, selectedGens,
        toggleGens, fetchAllPokemon, fetchPokemon, fetchSelected, togglePokemon, toggleShowAll, toggleModalVisible
    } = useHomeController()
    

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite o nome de um pokemon'
                    value={pokemon}
                    onChangeText={togglePokemon}
                />
                <TouchableOpacity style={styles.buttonSend} onPress={() => { fetchPokemon(); toggleShowAll(false) }}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.options}>
                <TouchableOpacity onPress={() => toggleShowAll(true)}>
                    <Text style={styles.showAll}>Mostrar todos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleModalVisible(true)}>
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
                onBackdropPress={() => toggleModalVisible(false)}
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
                                        ontoggle={() => toggleGens(gen)}
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

