export interface InterfacePokemonSpecies {
    flavor_text_entries: {
        flavor_text: string,
        language: {
            name: string
        },
    }[]
    generation: {
        name: string
    }
    evolution_chain:{
        url: string
    }
}