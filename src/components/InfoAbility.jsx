import { useState, useEffect } from "react";
import { getAbilityInfo, getPokemon } from "@src/service/PokeAPI";

export default function ({ dataName }) {
  const nameUpper = dataName.toUpperCase();
  const [dataAbility, setDataAbility] = useState([]);
  const [dataPokemon, setDataPokemon] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let dataFetch = await getAbilityInfo(nameUpper);
      setDataAbility(dataFetch);
      //
      let pokeD = await Promise.all(
        dataFetch.pokemon?.map(async (d) => {
          return await getPokemon(d.pokemon.name);
        }),
      );
      setDataPokemon(pokeD);
    };
    loadData();
  }, []);
  // console.log(
  //   dataAbility.effect_entries?.find((data) => data.language.name == "en"),
  // );
  // console.log(dataPokemon);

  function LeftData() {
    const data = dataAbility.effect_entries?.find(
      (data) => data.language.name == "en",
    )?.effect;
    return (
      <div className="relative gap-6 m-2 ">
        {dataAbility && data && (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h2 className="text-xl font-medium text-center">Description</h2>
              <div className="p-4 border w-[300px] border-gray-300 rounded-md bg-stone-200">
                <h4 className="text-lg text-justify">{data}</h4>
              </div>
            </div>
            <div className="grid gap-2">
              <h2 className="text-xl font-medium text-center">Generation</h2>
              <div className="p-4 border w-[300px] border-gray-300 rounded-md bg-stone-200">
                <h4 className="text-lg text-center">
                  {dataAbility.generation.name}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function RigthData() {
    return (
      <div className="grid m-2">
        {dataAbility && dataPokemon && (
          <div className="grid gap-2">
            <h2 className="text-xl font-medium text-center">
              Pokemon with {nameUpper}
            </h2>
            <div className="grid p-2 border border-gray-300 bg-stone-200">
              <table className="grid justify-between w-auto m-2 border-2 border-collapse border-black">
                <thead>
                  <tr className="text-white bg-black divide-black ">
                    <th className="w-[100px] py-3 text-sm">#</th>
                    <th className="w-[100px] py-3 text-sm">name</th>
                    <th className="w-[150px] py-3 text-sm">1° Ability</th>
                    <th className="w-[150px] py-3 text-sm">2° Ability</th>
                    <th className="w-[150px] py-3 text-sm">Hidden Ability</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPokemon?.map((data, i) => {
                    let pokeAbilities = [];
                    let pokeAbilityH = "";
                    if (data.abilities.length > 2) {
                      data.abilities.map((d, i) => {
                        if (d.is_hidden == false) {
                          pokeAbilities[i] = d.ability.name;
                        } else {
                          pokeAbilityH = d.ability.name;
                        }
                      });
                    } else {
                      data.abilities.map((d, i) => {
                        if (d.is_hidden == false) {
                          pokeAbilities[i] = d.ability.name;
                        } else {
                          if (d.ability.name) {
                            pokeAbilityH = d.ability.name;
                          }
                          pokeAbilityH = "--------";
                        }
                      });
                      pokeAbilities[1] = "--------";
                    }

                    // console.log(data.name);

                    function THAbilities({ name, section }) {
                      return (
                        <th className="w-[150px] py-3 text-sm hover:text-blue-300">
                          <a href={"/" + section + "/" + name}>{name}</a>
                        </th>
                      );
                    }

                    return (
                      <tr className="divide-y-2 divide-black " key={i}>
                        <th className="relative gap-2 w-[100px] py-3 border-y-2 border-black">
                          <h3>{data.id}</h3>
                          <img src={data.sprites.front_default} alt="" />
                        </th>
                        <th className="w-[100px] py-3 text-sm hover:text-blue-300">
                          <a href={"/pokemon/" + data.name}>{data.name}</a>
                        </th>

                        <th className="w-[150px] py-3 text-sm hover:text-blue-300">
                          <a href={"/ability/" + pokeAbilities[0]}>
                            {pokeAbilities[0]}
                          </a>
                        </th>
                        <th className="w-[150px] py-3 text-sm hover:text-blue-300">
                          <a href={"/ability/" + pokeAbilities[1]}>
                            {pokeAbilities[1]}
                          </a>
                        </th>
                        <th className="w-[150px] py-3 text-sm hover:text-blue-300">
                          <a href={"/ability/" + { pokeAbilityH }}>
                            {pokeAbilityH}
                          </a>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-2 m-4 place-self-center">
      {dataAbility && (
        <div className="grid">
          <h1 className="mb-4 text-3xl font-medium text-center">{nameUpper}</h1>
          <div className="flex gap-4">
            <LeftData />
            <RigthData />
          </div>
        </div>
      )}
    </div>
  );
}
