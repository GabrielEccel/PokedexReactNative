import { InterfacePokemon } from '@/src/types/interfacePokemon';
import { create } from 'zustand';

interface FavoritesState{
    favoritePokemons: InterfacePokemon[];

    setFavoritePokemons: (id: InterfacePokemon[]) => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favoritePokemons: [],

    setFavoritePokemons: (pokemon) => set({ favoritePokemons: pokemon }),

}));