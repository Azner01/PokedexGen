import { useState, useEffect, useRef, useCallback } from "react";
import PosterPoke from "@components/elements/PosterPoke";
import { getPokemon, getAllPokemon } from "@src/service/PokeAPI";

export default function ListPokGen1() {
  //Cargar list
  const [pokeList, setPokeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //Infinite Scroll
  const [hasMore, setHasMore] = useState(true);
  const [offsets, setOffsets] = useState(0);
  const observerRef = useRef();
  //Filtro
  // const [filterName, setFilterName] = useState("");
  const [filterGen, setFilterGen] = useState({
    Gen: "None",
    Offset: "0",
    Limit: "0",
  });
  const [filterType1, setFilterType1] = useState("None");
  const [filterType2, setFilterType2] = useState("None");
  const [isDisabled, setIsDisabled] = useState(true);
  //Tipos
  const PokeTypes = [
    "None",
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];
  //Generaciones
  const PokeGen = [
    { Gen: "None", Offset: 0, Limit: 10000 }, // Un límite alto para que entren todos
    { Gen: "Generation 1", Offset: 0, Limit: 151 },
    { Gen: "Generation 2", Offset: 151, Limit: 251 },
    { Gen: "Generation 3", Offset: 251, Limit: 386 },
    { Gen: "Generation 4", Offset: 386, Limit: 493 },
    { Gen: "Generation 5", Offset: 493, Limit: 649 },
    { Gen: "Generation 6", Offset: 649, Limit: 721 },
    { Gen: "Generation 7", Offset: 721, Limit: 809 },
    { Gen: "Generation 8", Offset: 809, Limit: 905 },
    { Gen: "Generation 9", Offset: 905, Limit: 1025 },
  ];

  // console.log(offsets);

  const loadPokemon = async () => {
    // console.log(isLoading);
    if (isLoading) return;
    setIsLoading(true);
    try {
      // console.log(offsets + " >= " + filterGen.Limit);
      let data = await getAllPokemon(offsets);
      if (!data || !data.results || offsets > filterGen.Limit) {
        setHasMore(false);
        return;
      }

      let pokeName = data.results.map((poke) => poke.name);
      let pokemonData = await Promise.all(
        pokeName.map(async (pokemon) => {
          let pokemonGet = await getPokemon(pokemon);
          return pokemonGet;
        }),
      );
      //
      let pokeFilter;
      let pokeFilter1;
      let pokeFilter2;
      //
      if (filterGen.Gen == "None") {
        pokeFilter1 = pokemonData;
      } else {
        pokeFilter1 = pokemonData.filter(
          (data) => data.id > filterGen.Offset && data.id <= filterGen.Limit,
        );
      }
      // console.log(pokeFilter[0].types[0].type.name);
      // console.log(data.types[0].type.name);

      pokeFilter2 = pokeFilter1.filter((data) => {
        const pokeTypes = data.types.map((d) => d.type.name);
        if (filterType1 != "None" && filterType2 == "None") {
          return pokeTypes.includes(filterType1);
        }
        if (filterType1 == "None" && filterType2 != "None") {
          return pokeTypes.includes(filterType2);
        }
        if (filterType1 != "None" && filterType2 != "None") {
          return (
            pokeTypes.includes(filterType1) && pokeTypes.includes(filterType2)
          );
        }
        return true;
      });

      //
      pokeFilter = pokeFilter2;
      setPokeList((prev) => {
        const newData = pokeFilter.filter(
          (newD) => !prev.some((oldD) => oldD.id === newD.id),
        );
        return [...prev, ...newData];
      });
      //
      if (pokeFilter.length == 0 && hasMore) {
        const nextOffsets = offsets + 18;
        if (nextOffsets <= filterGen.Limit) {
          setOffsets(nextOffsets);
        } else {
          setHasMore(false);
        }
      } else {
        setOffsets((prev) => prev + 18);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const filterPokeData = async () => {
  //   try {
  //     let data = await getAllPokemon(offsets);
  //     let pokeName = data.results.map((poke) => poke.name);
  //     let pokemonData = await Promise.all(
  //       pokeName.map(async (pokemon) => {
  //         let pokemonGet = await getPokemon(pokemon);
  //         return pokemonGet;
  //       }),
  //     );
  //     setPokeList((prev) => {
  //       const newData = pokemonData.filter(
  //         (newD) => !prev.some((oldD) => oldD.id === newD.id),
  //       );
  //       return [...prev, ...newData];
  //     });
  //     setOffsets((prev) => prev + 18);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // console.log(pokeList);

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(offsets);
      //
      if (response.length === 0) {
        setHasMore(false);
      } else {
        await loadPokemon();
      }
    }
    fetchData();
  }, [hasMore]);

  useEffect(() => {
    if (pokeList.length == 0) {
      loadPokemon();
    }
  }, [filterGen, filterType1, filterType2]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPokemon();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore],
  );

  function FilterOptions() {
    return (
      <div className="flex gap-4">
        {/* Filtro por generacion */}
        <div className="grid group">
          <h3 className="text-xl font-medium">Generation</h3>
          <button className="p-2 w-[200px] bg-white border border-black rounded-md  place-con">
            <div className="flex justify-between">
              <h3>{filterGen.Gen}</h3>
              <img src="/Arrow_Down.png" alt="" />
            </div>
          </button>
          <ul className="absolute hidden h-[250px] overflow-y-auto w-[200px] border-black border-x border-b  bg-white  z-10  mt-[65px] group-focus-within:block">
            <div className="grid">
              {PokeGen.map((data, i) => {
                return (
                  <button
                    className="p-2 hover:bg-gray-200"
                    key={i}
                    onClick={async () => {
                      setFilterGen(data);
                      setPokeList([]);
                      setHasMore(true);
                      if (data.Gen == "None") {
                        setOffsets(Number(0));
                      } else {
                        setOffsets(Number(data.Offset));
                      }
                    }}
                  >
                    <li className="hover:text-blue-800">{data.Gen}</li>
                  </button>
                );
              })}
            </div>
          </ul>
        </div>
        {/* Filtro por tipo 1 */}
        <div className="grid group">
          <h3 className="text-xl font-medium">Type 1</h3>

          <button className="p-2 w-[200px] bg-white border border-black rounded-md  place-con">
            <div className="flex justify-between">
              <h3>{filterType1}</h3>
              <img src="/Arrow_Down.png" alt="" />
            </div>
          </button>
          <ul className="absolute hidden h-[250px] overflow-y-auto w-[200px] border-black border-x border-b  bg-white  z-10  mt-[65px] group-focus-within:block">
            <div className="grid">
              {PokeTypes.map((data, i) => {
                return (
                  <button
                    className="p-2 hover:bg-gray-200"
                    key={i}
                    onClick={async () => {
                      setFilterType1(data);
                      if (data != "None") {
                        setIsDisabled(false);
                      } else {
                        setIsDisabled(true);
                        setFilterType2("None");
                      }
                      setPokeList([]);
                      setHasMore(true);
                      setOffsets(Number(filterGen.Offset));
                    }}
                  >
                    <li className="hover:text-blue-800">{data}</li>
                  </button>
                );
              })}
            </div>
          </ul>
        </div>
        {/* filtro por tipo 2 */}
        <div className="grid group">
          <h3 className="text-xl font-medium">Type 2</h3>

          <button
            disabled={isDisabled}
            className="p-2 w-[200px] bg-white border border-black rounded-md  place-con"
          >
            <div className="flex justify-between">
              <h3>{filterType2}</h3>
              <img src="/Arrow_Down.png" alt="" />
            </div>
          </button>
          <ul className="absolute hidden h-[250px] overflow-y-auto w-[200px] border-black border-x border-b  bg-white  z-10  mt-[65px] group-focus-within:block">
            <div className="grid">
              {PokeTypes.map((data, i) => {
                return (
                  <button
                    className="p-2 hover:bg-gray-200"
                    key={i}
                    onClick={async () => {
                      setFilterType2(data);
                      setPokeList([]);
                      setHasMore(true);
                      if (data.Gen == "None") {
                        setOffsets(Number(0));
                      } else {
                        setOffsets(Number(filterGen.Offset));
                      }
                    }}
                  >
                    <li className="hover:text-blue-800">{data}</li>
                  </button>
                );
              })}
            </div>
          </ul>
        </div>
        {/*  */}
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 ">
        <h1 className="text-4xl font-medium">Lista de pokemones</h1>
        <FilterOptions />
        <div className="grid justify-center gap-4 py-4 xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-2">
          {pokeList.map((data, i) => {
            if (pokeList.length === i + 1) {
              return (
                <div ref={lastItemRef} key={i}>
                  <PosterPoke inf={data} id={i} />
                </div>
              );
            }
            return (
              <div key={i}>
                <PosterPoke inf={data} id={i} />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="w-full p-10 text-center">
            <h2 className="text-3xl pb-96">Cargando ...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
