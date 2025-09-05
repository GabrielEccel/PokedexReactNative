import { useFavoritesStore } from "@store/favoritesStore";
import { formatName } from "@utils/stringUtils";
import { useEffect, useState } from "react";

export function useFavoritesController(){
    const {favoritePokemons, setFavoritePokemons} = useFavoritesStore();
    const [visiblePokemon, setVisiblePokemon] = useState(favoritePokemons);
    const [pokemon, setPokemon] = useState<string>('');
    const [exists, setExists] = useState<boolean>(true);
    const [empty, setEmpty] = useState<boolean>(false)

    useEffect(() => {
        setVisiblePokemon(favoritePokemons)
    }, [favoritePokemons])

    function togglePokemon(poke: string){
        setPokemon(poke)
    }

    function searchPokemon(poke: string){
        const pokeName = formatName(poke)
        if(favoritePokemons.some(p => p.name === pokeName)){
            setVisiblePokemon(favoritePokemons.filter(p=> p.name === pokeName))
        } else{
            setExists(false)
        }
        setPokemon('')
    }

    function toggleExists(bool: boolean){
        setExists(bool)
    }

    function showAll(){
        if(favoritePokemons.length > 0){
            setVisiblePokemon(favoritePokemons)
        }
        else{
            setEmpty(true)
        }
    }

    function toggleEmpty(bool: boolean){
        setEmpty(bool)
    }

    function excludeAll(){
        if(favoritePokemons.length > 0){
            setFavoritePokemons([])
        }
        else{
            setEmpty(true)
        }
    }

    return{
        favoritePokemons,
        pokemon,
        togglePokemon,
        searchPokemon,
        visiblePokemon,
        showAll,
        exists,
        toggleExists,
        excludeAll,
        empty,
        toggleEmpty
    }
}