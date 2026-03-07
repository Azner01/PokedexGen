import { useEffect, useState } from "react";

import {
  getPokemon,
  getMorePokemonInfo,
  getEvolutionInfo,
} from "@src/service/PokeAPI";
import UpperWord from "@components/UpperWord";
import {
  TypeColor,
  ArrowInfo,
  Sign,
  TextC,
  StatisticsPoke,
  ImageChart,
  EvolveInfo,
  EvolveDistinction,
} from "@components/elements/InfoPokemonElements";

export default function InfoPokemon({ pokeName }) {
  //Solo pondre los juegos originales y no remakes
  const pokeTextChoose = [
    "Red",
    "Blue",
    "Yellow",
    "Gold",
    "Silver",
    "Crystal",
    "Ruby",
    "Sapphire",
    "Emerald",
    "Diamond",
    "Pearl",
    "Platinum",
    "Black",
    "White",
    "X",
    "Y",
    "Sun",
    "Moon",
    "Sword",
    "Shield",
  ];
  const [pokeTextInfo, setPokeTextInfo] = useState("Red");
  const [selectTextInfo, setSelectTextInfo] = useState();
  const [pokeInfo, setPokeInfo] = useState();
  const [pokeMoreInfo, setPokeMoreInfo] = useState();
  const [pokeEvolutionInfo, setPokeEvolutionInfo] = useState();
  const [pokeEvolve1, setPokeEvolve1] = useState();
  const [pokeEvolve2, setPokeEvolve2] = useState();
  const [pokeEvolve3, setPokeEvolve3] = useState();

  useEffect(() => {
    async function fetchData() {
      //Datos de Pokemon
      let pokeData = await getPokemon(pokeName);
      setPokeInfo(pokeData);

      let pokeMoreData = await getMorePokemonInfo(pokeName);
      setPokeMoreInfo(pokeMoreData);

      let pokeEvolutionData = await getEvolutionInfo(
        pokeMoreData?.evolution_chain?.url,
      );
      //
      let pokeLength = pokeEvolutionData.chain.evolves_to.length;
      let pokeEE = [];
      let pokeAux;
      //
      let pokeE1 = [];
      let pokeE2 = [];
      let pokeE3 = [];

      if (
        pokeEvolutionData.chain.evolves_to[0] &&
        pokeEvolutionData.chain.evolves_to.length > 0
      ) {
        pokeE1 = await getPokemon(pokeEvolutionData.chain.species.name);
        //
        if (pokeEvolutionData.chain.evolves_to.length > 1) {
          for (let i = 0; i < pokeEvolutionData.chain.evolves_to.length; i++) {
            pokeAux = [];
            pokeAux = await getPokemon(
              pokeEvolutionData.chain.evolves_to[i].species.name,
            );
            pokeE2.push(pokeAux);
          }
        } else {
          pokeE2 = await getPokemon(
            pokeEvolutionData.chain.evolves_to[0].species.name,
          );
        }
        //
        setPokeEvolve1(pokeE1);
        setPokeEvolve2(pokeE2);

        //Datos de Evolución
        for (let i = 0; i < pokeEvolutionData.chain.evolves_to.length; i++) {
          if (
            pokeEvolutionData.chain.evolves_to[i].evolves_to &&
            pokeEvolutionData.chain.evolves_to[i].evolves_to.length > 0
          ) {
            for (
              let x = 0;
              x < pokeEvolutionData.chain.evolves_to[i].evolves_to.length;
              x++
            ) {
              pokeAux = await getPokemon(
                pokeEvolutionData.chain.evolves_to[i].evolves_to[x].species
                  .name,
              );
              pokeE3.push(pokeAux);
            }
          } else if (
            pokeEvolutionData.chain.evolves_to[i].evolves_to &&
            pokeEvolutionData.chain.evolves_to[i].evolves_to.length == 1
          ) {
            pokeE3 = await getPokemon(
              pokeEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
            );
          }
        }
        setPokeEvolve3(pokeE3);
      }
      setPokeEvolutionInfo(pokeEvolutionData);

      //Datos de texto

      let listTextChoose = pokeTextChoose.map((data) => data.toLowerCase());
      let filtroTextChoose = [];
      filtroTextChoose = pokeMoreData.flavor_text_entries
        .filter((data) => data.language.name == "en")
        .filter((data) => listTextChoose.includes(data.version.name));
      setSelectTextInfo(filtroTextChoose);
    }
    fetchData();
  }, []);
  //

  function LeftPoke() {
    if (pokeInfo) {
      return (
        <div className="grid gap-4 ">
          <div className="border border-gray-300 rounded-md bg-stone-200">
            <div className="flex gap-12 border-2 border-lime-900">
              <img
                className="w-80 h-80"
                src={pokeInfo.sprites.front_default}
                alt=""
              />
            </div>
          </div>
          <div className="grid justify-center gap-2 p-2 text-center border-2 border-lime-900 bg-stone-200">
            <h3 className="text-2xl font-medium">Type</h3>
            <div className="flex gap-4">
              {pokeInfo.types.map((data, i) => {
                return <TypeColor typeC={data.type.name} key={i} />;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function CenterPoke() {
    if (pokeInfo && pokeMoreInfo) {
      return (
        // {pokeInfo ? ( ) : ()}
        <div className="grid gap-2 text-center border-2 rounded-md bg-stone-200 border-lime-900 ">
          <div className="grid p-3 border border-black rounded-md ">
            <div className="grid grid-cols-2 gap-4 ">
              <TextC text1="Height" text2={pokeInfo.height + " m"} />
              <TextC text1="Weight" text2={pokeInfo.weight + " kg"} />
              <TextC text1="Shape" text2={pokeMoreInfo.shape.name} />
              <TextC text1="Category" text2={pokeMoreInfo.genera[7].genus} />
            </div>
            <div className="grid justify-center gap-2">
              <h3 className="text-xl font-bold text-center">Gender</h3>
              <div className="flex">
                {pokeMoreInfo.gender_rate === -1 ? (
                  <h3>Undiscovered</h3>
                ) : pokeMoreInfo.gender_rate === 0 ? (
                  <Sign image="/Gender_Male.png" />
                ) : pokeMoreInfo.gender_rate === 8 ? (
                  <Sign image="/Gender_Female.png" />
                ) : (
                  <div className="flex">
                    <Sign image="/Gender_Male.png" />
                    <Sign image="/Gender_Female.png" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function RightPoke() {
    const ChangeText = (value) => {
      setPokeTextInfo(value);
    };
    if (pokeMoreInfo && selectTextInfo) {
      return (
        <div className="w-[400px] max-w-sm gap-2 text-center border-2 rounded-md bg-stone-200 border-lime-900">
          <div className="grid gap-2 p-4 group">
            <div className="grid">
              <button className="flex justify-between w-40 h-8 bg-white border-2 border-black ">
                <h3 className="pl-2">{pokeTextInfo}</h3>
                <img src="/Arrow_Down.png" alt="" />
              </button>
              <div className="absolute z-10 hidden w-40 h-40 my-8 overflow-y-auto bg-white border-b border-black border-x group-focus-within:block">
                <ul className="grid divide-y divide-gray-300">
                  {pokeTextChoose.map((data, key) => {
                    return (
                      <button
                        className="h hover:bg-gray-400"
                        key={key}
                        value={data}
                        onClick={(e) => ChangeText(e.currentTarget.value)}
                      >
                        <li className="hover:text-blue-500 ">{data}</li>
                      </button>
                    );
                  })}
                </ul>
              </div>
            </div>
            <h2 className="font-bold text-left">Description</h2>
            <div className="grid p-2 h-[300px] border-2 border-black text-justify">
              {selectTextInfo.map((data, key) => {
                if (data.version.name == pokeTextInfo.toLowerCase()) {
                  return (
                    <p key={key}>
                      {data.flavor_text.replace(/[\n\f\r]/g, " ")}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  function Abilities() {
    if (pokeInfo) {
      return (
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">Ability</h2>
          <div className="grid gap-4 p-4 text-center border border-lime-900 bg-stone-200">
            <div className="flex justify-between gap-4">
              <h3 className="text-2xl font-semibold">Ability:</h3>
              <div className="grid">
                {pokeInfo.abilities.map((data, i) =>
                  data.is_hidden == false ? (
                    <h3 className="text-xl font-medium" key={i}>
                      <a
                        href={"../ability/" + data.ability.name}
                        className="hover:text-blue-400"
                      >
                        {data.ability.name}
                      </a>
                    </h3>
                  ) : null,
                )}
              </div>
            </div>
            <hr className="h-[2px] bg-black" />
            <div className="flex justify-between gap-4">
              <h3 className="text-2xl font-semibold">Hidden Ability:</h3>
              {pokeInfo.abilities.map((data, i) =>
                data.is_hidden == true ? (
                  <h3 className="text-xl font-medium" key={i}>
                    <a
                      href={"../ability/" + data.ability.name}
                      className="hover:text-blue-400"
                    >
                      {data.ability.name}
                    </a>
                  </h3>
                ) : null,
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  function Statistics() {
    if (pokeInfo) {
      return (
        <div className="">
          <div className="grid gap-2 ">
            <h3 className="text-3xl font-bold">Stadistics</h3>
            <StatisticsPoke data={pokeInfo.stats} />
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function InfoChart() {
    if (pokeEvolve1 && pokeEvolve2) {
      const evolveInfo1 = EvolveInfo(pokeEvolutionInfo, 1);
      let DataEvolve1 = EvolveDistinction(evolveInfo1);

      if (pokeEvolve3) {
        const evolveInfo2 = EvolveInfo(pokeEvolutionInfo, 2);
        let DataEvolve2 = EvolveDistinction(evolveInfo2);

        return (
          <div className="flex items-center justify-between ">
            <ImageChart
              text={pokeEvolve1.name}
              image={pokeEvolve1.sprites.front_default}
            />
            {pokeEvolve2.length > 1 && (
              <div className="grid">
                {pokeEvolve2.map((data, i) => {
                  return (
                    <div className="flex items-center justify-between" key={i}>
                      <ArrowInfo
                        trigger={DataEvolve1[1][i]}
                        text={DataEvolve1[0][i]}
                      />
                      <ImageChart
                        text={data.name}
                        image={data.sprites.front_default}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {pokeEvolve2.length === undefined && (
              <div className="flex items-center justify-between">
                <ArrowInfo trigger={DataEvolve1[1]} text={DataEvolve1[0]} />
                <ImageChart
                  text={pokeEvolve2.name}
                  image={pokeEvolve2.sprites.front_default}
                />
              </div>
            )}
            {pokeEvolve3.length > 1 && (
              <div className="grid">
                {pokeEvolve3.map((data, i) => {
                  return (
                    <div className="flex items-center justify-between" key={i}>
                      <ArrowInfo
                        trigger={DataEvolve2[1][i]}
                        text={DataEvolve2[0][i]}
                      />
                      <ImageChart
                        text={data.name}
                        image={data.sprites.front_default}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {pokeEvolve3.length === undefined ||
              (pokeEvolve3.length == 1 && (
                <div className="flex items-center justify-between">
                  <ArrowInfo trigger={DataEvolve2[1]} text={DataEvolve2[0]} />
                  <ImageChart
                    text={pokeEvolve3[0].name}
                    image={pokeEvolve3[0].sprites.front_default}
                  />
                </div>
              ))}
          </div>
        );
      }

      return (
        <div className="flex items-center justify-between ">
          <ImageChart
            text={pokeEvolve1.name}
            image={pokeEvolve1.sprites.front_default}
          />
          {pokeEvolve2.length > 1 && (
            <div className="grid">
              {pokeEvolve2.map((data, i) => {
                return (
                  <div className="flex items-center justify-between" key={i}>
                    <ArrowInfo
                      trigger={DataEvolve1[1][i]}
                      text={DataEvolve1[0][i]}
                    />
                    <ImageChart
                      text={data.name}
                      image={data.sprites.front_default}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {pokeEvolve2.length === undefined ||
            (pokeEvolve3.length == 1 && (
              <div className="flex items-center justify-between">
                <ArrowInfo trigger={DataEvolve1[1]} text={DataEvolve1[0]} />
                <ImageChart
                  text={pokeEvolve2.name}
                  image={pokeEvolve2.sprites.front_default}
                />
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div className="grid items-center justify-center">
          <h3 className="text-3xl font-bold text-center">Does not evolve</h3>
        </div>
      );
    }
  }

  function EvolutionChart() {
    if (pokeEvolutionInfo) {
      return (
        <div className="grid gap-2">
          <h3 className="text-3xl font-bold">Evolution Chart</h3>
          <div className="flex items-center justify-between p-2 border-2 rounded-md border-lime-900 bg-stone-200 ">
            <InfoChart />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="grid gap-4 m-4 justify-self-center ">
      {pokeInfo ? (
        <div className="grid justify-center gap-12">
          <div>
            <div className="flex justify-center gap-2 text-2xl font-bold text-center">
              <h1 className="">{UpperWord(pokeInfo.name)}</h1>
              <h2 className="text-2xl font-semibold text-gray-600">
                NO.{pokeInfo.id}
              </h2>
            </div>

            <div className="flex gap-2">
              <LeftPoke />
              <CenterPoke />
              <RightPoke />
            </div>
          </div>
          <Abilities />
          <Statistics />
          <EvolutionChart />
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}
