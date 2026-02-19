import { useState, useEffect } from "react";
import { getPokemon, getAllPokemon } from "@src/service/PokeAPI";

export default function SearchBarPoke() {
  const [pokeName, setPokeName] = useState("");
  const [pokeList, setPokeList] = useState([]);
  // const [pokeFilter, setPokeFilter] = useState("");

  const filterList = (pokeList || []).filter((poke) => {
    return poke.toLowerCase().includes(pokeName.toLowerCase());
  });

  useEffect(() => {
    async function FetchData() {
      let response = await getAllPokemon();
      await loadPokemon(response);
    }
    FetchData();
  }, []);

  const loadPokemon = async (data) => {
    let pokeName = data.results.map((poke) => poke.name);
    let pokeData = await Promise.all(
      pokeName.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet.name;
      }),
    );
    setPokeList(pokeData);
    // console.log(typeof pokeList);
  };

  // console.log(pokeFilter);
  // console.log(typeof pokeList);

  const SearchBarChange = (event) => {
    setPokeName(event.currentTarget.value);
  };

  function ShowPokeName() {
    if (filterList != undefined) {
      return (
        <div className="absolute gap-1 h-48 overflow-y-auto z-[100] bg-white border border-black sm:w-52 md:w-96 xl:w-[500px]  my-11">
          {filterList.map((data, i) => {
            return (
              <div className=" hover:bg-green-300" key={i}>
                <button className="w-full text-2xl text-left">
                  <a href={"/pokemon/" + data}>{data}</a>
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function ShowList({ name }) {
    if (name === "") {
      return <div></div>;
    } else {
      return <ShowPokeName />;
    }
  }

  return (
    <div className="grid">
      <input
        className="p-2 xl:w-[500px] sm:w-52 md:w-96 "
        type="text"
        placeholder="Escribe el nombre del pokemon..."
        value={pokeName}
        onChange={SearchBarChange}
      />
      <ShowList name={pokeName} />
    </div>
  );
}
