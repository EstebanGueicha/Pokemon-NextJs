import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

const pokemonService = {}

pokemonService.getPokemons = () => {
  return api
    .get('/pokemon')
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonsById = (id) => {
  return api
    .get(`/pokemon/${id}/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
pokemonService.getPokemonsByUrl = (url) => {
  const route = url.split('https://pokeapi.co/api/v2').pop()
  return api
    .get(route)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
pokemonService.getPokemonSpeciesByUrl = (url) => {
  const route = url.split('https://pokeapi.co/api/v2').pop()
  return api
    .get(route)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonsEvolutionsByUrl = (url) => {
  const route = url.split('https://pokeapi.co/api/v2').pop()
  return api
    .get(route)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonsEvolutionsById = (id) => {
  return api
    .get(`/evolution-chain/${id}/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonsEvolutionsInfoByName = (name) => {
  return api
    .get(`/pokemon/${name}/`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getNextPokemonByUrl = (url) => {
  const route = url.split('https://pokeapi.co/api/v2').pop()
  return api
    .get(route)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPrevPokemonByUrl = (url) => {
  const route = url.split('https://pokeapi.co/api/v2').pop()
  return api
    .get(route)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

export default pokemonService
