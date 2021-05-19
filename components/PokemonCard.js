import { useEffect, useState } from 'react'
import styles from '../styles/components/PokemonCard.module.scss'
import pokemonService from '../services/pokemon'
import Link from 'next/link'

// import withAuth from '../../services/withAuth'

export default function PokemonCard({ url, pokemonItem }) {
  const [pokemon, setPokemon] = useState(null)
  useEffect(async () => {
    if (url) {
      const result = await pokemonService.getPokemonsByUrl(url)
      setPokemon(result)
    } else {
      if (pokemonItem) {
        setPokemon(pokemonItem)
      }
    }
  }, [url])

  return pokemon ? (
    <div className={styles['pokemon-card-container']}>
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className={styles.pokemonCard + ' ' + styles[pokemon.types[0].type.name]}>
          <div className={styles['img-container']}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <p className={styles.number}>#{pokemon.order.toString().padStart(3, '0')}</p>
          <p className={styles.name}>{pokemon.name}</p>
          <p className={styles.info}>Type: {pokemon.types[0].type.name}</p>
        </div>
      </Link>
    </div>
  ) : null
}
