import { useState, useEffect } from "react";
import PosterPoke from "@components/elements/PosterPoke";
import { getPokemon, getAllPokemon } from "@src/service/PokeAPI";

export default function ListPokGen1() {
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet;
      })
    );
    setPokeList(pokemonData);
    setIsLoading(false);
    // console.log(pokeList);
  };

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon();
      await loadPokemon(response.results);
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
        <div className="grid justify-center gap-4 p-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {pokeList.map((data, i) => {
            return (
              <div key={i}>
                <PosterPoke inf={data} id={i} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
