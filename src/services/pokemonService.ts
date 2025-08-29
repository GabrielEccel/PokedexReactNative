import { InterfaceEvolutionChain } from '@/src/types/interfaceEvolutionChain'
import { InterfacePokemon } from '@/src/types/interfacePokemon'
import { InterfacePokemonSpecies } from '@/src/types/interfacePokemonSpecies'
import { InterfaceType } from '@/src/types/interfaceType'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

async function getPokemonSpecies(id: number | string): Promise<InterfacePokemonSpecies> {
    try {
        const response = await api.get(`pokemon-species/${id}`)
        return response.data as InterfacePokemonSpecies
    } catch (error) {
        console.log(error)
        throw error
    }

}

async function getPokemon(id: number | string): Promise<InterfacePokemon> {
    try {
        const response = await api.get(`pokemon/${id}`);
        return response.data as InterfacePokemon
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function getTypeService(id: number | string): Promise<InterfaceType> {
    try {
        const response = await api.get(`type/${id}`)
        return response.data as InterfaceType
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function getEvelotionChain(id: number | string): Promise<InterfaceEvolutionChain>{
    try {
        const pokemon = await getPokemonSpecies(id)
        const response = await axios.get(pokemon.evolution_chain.url)
        return response.data

    } catch (error) {
        console.log(error)
        throw error
    }
}

export { getEvelotionChain, getPokemon, getPokemonSpecies, getTypeService }

