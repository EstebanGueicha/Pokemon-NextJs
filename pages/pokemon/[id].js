import styles from '../../styles/pages/Pokemon.module.scss'
import pokemonService from '../../services/pokemon'
import Link from 'next/link'
import { withAuthSync } from '../../services/withAuth'
import Layout from '../../components/Layout'
// import withAuth from '../../services/withAuth'

const PokemonById = ({ pokemon, evolutions, evolvesFrom }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <h1>{pokemon.name}</h1>
        <div className={styles.main}>
          <div className={styles.card}>
            <h2>Movimientos</h2>
            <div className="row">
              {pokemon.moves.map((move, index) => (
                <div key={index} className="col col-lg-4">
                  <p>{move.move.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <h2>Evoluciones</h2>
            {evolutions.chain.evolves_to.map((evolves, index) => (
              <div key={index}>
                {evolves.species.name !== pokemon.name && evolves.species.name !== evolvesFrom ? (
                  <Link href={`/evolution/${evolves.species.name}`}>
                    <p className={styles.evolves}>{evolves.species.name}</p>
                  </Link>
                ) : null}

                {evolves.evolves_to && evolves.evolves_to.length
                  ? evolves.evolves_to.map((evolves, index) =>
                      evolves.species.name !== pokemon.name &&
                      evolves.species.name !== evolvesFrom ? (
                        <Link key={index} href={`/evolution/${evolves.species.name}`}>
                          <p className={styles.evolves}>{evolves.species.name}</p>
                        </Link>
                      ) : null,
                    )
                  : null}
              </div>
            ))}
            {evolvesFrom ? (
              <>
                <h2>Evoluciona De</h2>
                <Link href={`/evolution/${evolvesFrom}`}>
                  <p className={styles.evolves}>{evolvesFrom}</p>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </Layout>
    </div>
  )
}

PokemonById.getInitialProps = async ({ query }) => {
  const pokemon = await pokemonService.getPokemonsById(query.id)
  const species = await pokemonService.getPokemonSpeciesByUrl(pokemon.species.url)
  const evolvesFrom = species.evolves_from_species ? species.evolves_from_species.name : ''
  const evolutions = await pokemonService.getPokemonsEvolutionsByUrl(species.evolution_chain.url)
  return { pokemon, evolutions, evolvesFrom }
}

export default withAuthSync(PokemonById)
