import { InterfaceEvolutionChain } from '@/src/types/interfaceEvolutionChain'
import { InterfacePokemon } from '@/src/types/interfacePokemon'
import { InterfacePokemonSpecies } from '@/src/types/interfacePokemonSpecies'
import { InterfaceType } from '@/src/types/interfaceType'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

async function getPokemonSpecies(id: number | string, iter: number = 1): Promise<InterfacePokemonSpecies> {
    let idFinal = id
    const maxIter = 2
        
    try {
        const response = await api.get(`pokemon-species/${idFinal}`)
        return response.data as InterfacePokemonSpecies
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404 && iter < maxIter) {
                idFinal = id.toString().split("-")[0];
                return await getPokemonSpecies(idFinal, iter + 1)
                
            }
            else {
                console.log('species', error)
                throw error
            }
        }
        throw error
    }

}

async function getPokemon(id: number | string): Promise<InterfacePokemon> {
    try {
        const response = await api.get(`pokemon/${id}`);
        return response.data as InterfacePokemon
    } catch (error) {
        console.log('getPokemon', error)
        throw error;
    }
}

async function getType(id: number | string): Promise<InterfaceType> {
    try {
        const response = await api.get(`type/${id}`)
        return response.data as InterfaceType
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function getEvelotionChain(id: number | string): Promise<InterfaceEvolutionChain> {
    try {
        const pokemon = await getPokemonSpecies(id)
        const response = await axios.get(pokemon.evolution_chain.url)
        return response.data

    } catch (error) {
        console.log('evolution', error)
        throw error
    }
}

export { getEvelotionChain, getPokemon, getPokemonSpecies, getType }

