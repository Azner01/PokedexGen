import { useState, useEffect } from "react";
import PosterPoke from "@components/elements/PosterPoke";
import { getPokemon, getAllPokemon } from "@src/service/PokeAPI";

export default function ListPokGen1() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemon = async (data) => {
    let pokeName = data.results.map((poke) => poke.name);
    let pokemonData = await Promise.all(
      pokeName.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet;
      }),
    );
    setPokeList(pokemonData);
    setIsLoading(false);
    // console.log(pokeList);
  };

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon();
      await loadPokemon(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <h2 className="text-2xl pb-96">Cargando ...</h2>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-medium">Lista de pokemones</h1>
          <div className="grid justify-center gap-4 py-4 xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-2">
            {pokeList.map((data, i) => {
              return (
                <div key={i}>
                  <PosterPoke inf={data} id={i} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
