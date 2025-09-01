import { create } from "zustand";

type TypesMap = Record<string, string | null>;

interface TypesState {
  typesMap: TypesMap;
  setTypeLink: (type: string, link: string | null) => void;
}

export const useTypeStore = create<TypesState>((set) => ({
  typesMap: {
    normal: null,
    fighting: null,
    flying: null,
    poison: null,
    ground: null,
    rock: null,
    bug: null,
    ghost: null,
    steel: null,
    fire: null,
    water: null,
    grass: null,
    electric: null,
    psychic: null,
    ice: null,
    dragon: null,
    dark: null,
    fairy: null,
  },
  setTypeLink: (type, link) => set((state) => ({typesMap: {...state.typesMap,[type]: link}}))

}));
