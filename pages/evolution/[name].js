import styles from '../../styles/pages/Pokemon.module.scss'
import pokemonService from '../../services/pokemon'
import PokemonCard from '../../components/PokemonCard'
import { withAuthSync } from '../../services/withAuth'
import Layout from '../../components/Layout'

const EvolutionPokemon = ({ pokemon }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <PokemonCard pokemonItem={pokemon} />
      </Layout>
    </div>
  )
}

EvolutionPokemon.getInitialProps = async ({ query }) => {
  const pokemon = await pokemonService.getPokemonsEvolutionsInfoByName(query.name)
  return { pokemon }
}

export default withAuthSync(EvolutionPokemon)
