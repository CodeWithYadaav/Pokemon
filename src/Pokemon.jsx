import { useEffect } from 'react'
import './index.css'
import { useState } from 'react'
import { PokemonCards } from './PokemonCards'

export const Pokemon = () => {
  const [pokemon, setPokeon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const API = 'https://pokeapi.co/api/v2/pokemon?limit=500'

  const fetchpokemon = async () => {
    try {
      const res = await fetch(API)
      const data = await res.json()

      const detailedPokemon = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url)
        const data = await res.json()
        return data
      })
      const response = await Promise.all(detailedPokemon)
      setPokeon(response)
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    fetchpokemon()
  }, [])

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    )
  }

  return (
    <>
      <section className='container'>
        <header>
          <h1>Let's Catch Pokémon!</h1>
        </header>
        <div className='pokemon-search'>
          <input type='text' placeholder='Search pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className='cards'>
            {searchData.map((currPokemon) => (
              <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
