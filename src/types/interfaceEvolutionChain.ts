interface InterfaceEvolutionChain {
    id: number,
    chain: InterfaceEvolutionDetail
}

interface InterfaceEvolutionDetail{
    species: {
        name: string
    },
    evolves_to: InterfaceEvolutionDetail[]
}

interface InterfaceEvolutionLayer{
    name: string
}

export {
    InterfaceEvolutionChain, InterfaceEvolutionDetail, InterfaceEvolutionLayer
}

