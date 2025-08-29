import { InterfaceGen } from '@/src/types/interfaceGen';
import { InterfacePokemon } from '@/src/types/interfacePokemon';
import { create } from 'zustand';

interface PokemonState {
  visiblePokemon: InterfacePokemon[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  showAll: boolean;
  selectedGens: InterfaceGen[];

  setVisiblePokemon: (pokemons: InterfacePokemon[]) => void;
  addVisiblePokemon: (pokemons: InterfacePokemon[]) => void;
  setPage: (page: number) => void;
  setHasMore: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setShowAll: (value: boolean) => void;
  setSelectedGens: (gens: InterfaceGen[]) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  visiblePokemon: [],
  page: 1,
  hasMore: true,
  loading: false,
  showAll: false,
  selectedGens: [],

  setVisiblePokemon: (pokemons) => set({ visiblePokemon: pokemons }),
  addVisiblePokemon: (pokemons) => set((state) => ({ visiblePokemon: [...state.visiblePokemon, ...pokemons] })),
  setPage: (page) => set({ page }),
  setHasMore: (value) => set({ hasMore: value }),
  setLoading: (value) => set({ loading: value }),
  setShowAll: (value) => set({ showAll: value }),
  setSelectedGens: (gens) => set({ selectedGens: gens }),
}));
