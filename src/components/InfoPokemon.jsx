import { useEffect, useState } from "react";

import {
  getPokemon,
  getMorePokemonInfo,
  getEvolutionInfo,
} from "@src/service/PokeAPI";
import UpperWord from "@components/UpperWord";
// import TypeColor from "@components/elements/typeColor";
// import StatisticsPoke from "@components/elements/StatisticsPoke";
// import ArrowInfo from "@components/elements/ArrowInfo";
// import ImageChart from "@components/elements/ImageChart";
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
  const [pokeInfo, setPokeInfo] = useState();
  const [pokeMoreInfo, setPokeMoreInfo] = useState();
  const [pokeEvolutionInfo, setPokeEvolutionInfo] = useState();
  const [pokeEvolve1, setPokeEvolve1] = useState();
  const [pokeEvolve2, setPokeEvolve2] = useState();
  const [pokeEvolve3, setPokeEvolve3] = useState();

  useEffect(() => {
    async function fetchData() {
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
        // if (pokeE2.length === undefined) {
        //   console.log(pokeE2);
        //   console.log("Hoola");
        // }
        setPokeEvolve1(pokeE1);
        setPokeEvolve2(pokeE2);

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
    }
    fetchData();
  }, []);
  //

  function LeftPoke() {
    if (pokeInfo) {
      return (
        <div className="grid gap-4 ">
          <div className="bg-gray-300 border border-gray-300 rounded-md">
            <div className="flex gap-12 border-2 border-lime-900">
              <img
                className="w-80 h-80"
                src={pokeInfo.sprites.front_default}
                alt=""
              />
            </div>
          </div>
          <div className="grid justify-center gap-2 p-2 text-center border-2 border-lime-900 bg-stone-300">
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

  function RightPoke() {
    if (pokeInfo && pokeMoreInfo) {
      return (
        // {pokeInfo ? ( ) : ()}
        <div className="grid gap-2 text-center border-2 rounded-md bg-stone-200 border-lime-900">
          <div className="grid p-3 border border-black rounded-md ">
            <div className="grid grid-cols-2 gap-4 ">
              <TextC text1="Height" text2={pokeInfo.height + " m"} />
              <TextC text1="Weight" text2={pokeInfo.weight + " kg"} />
              <TextC text1="Shape" text2={pokeMoreInfo.shape.name} />
              <TextC text1="Category" text2={pokeMoreInfo.genera[7].genus} />
            </div>
            <div className="grid justify-center gap-2">
              <h3 className="text-xl font-bold text-center">Género</h3>
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

  function Abilities() {
    if (pokeInfo) {
      return (
        <div className="">
          <h2 className="text-3xl font-bold">Ability</h2>
          <div className="grid gap-8 p-2 text-center border border-lime-900 bg-stone-300">
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
        <div>
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

  // function EvolveDistinction(info) {
  //   let arrayPoke = [];
  //   let textInfo = [];
  //   let triggerInfo = [];
  //   let aux = "";
  //   //
  //   function MoreInfo(textIni, textMore) {
  //     let textFinal = "";
  //     if (textIni === undefined) {
  //       textFinal = textMore;
  //       return textFinal;
  //     } else {
  //       textFinal = textIni + " + " + textMore;
  //       return textFinal;
  //     }
  //   }
  //   //

  //   for (let i = 0; i < info.length; i++) {
  //     let lastInfoDetail = info[i].length - 1;
  //     if (info[i][lastInfoDetail][1].name === undefined) {
  //       aux = info[i][lastInfoDetail][1];
  //       triggerInfo[i] = MoreInfo(triggerInfo[i], aux);
  //     } else {
  //       aux = info[i][lastInfoDetail][1].name;
  //       triggerInfo[i] = MoreInfo(triggerInfo[i], aux);
  //     }
  //     //
  //     for (let x = 0; x < info[i].length - 1; x++) {
  //       if (
  //         info[i][x][0] === "min_level" ||
  //         info[i][x][0] === "min_happiness" ||
  //         info[i][x][0] === "min_beauty" ||
  //         info[i][x][0] === "time_of_day"
  //       ) {
  //         aux = info[i][x][1];
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       } else if (info[i][x][0] == "gender") {
  //         switch (info[i][1]) {
  //           case 1:
  //             aux = "Female";
  //             textInfo[i] = MoreInfo(textInfo[i], aux);
  //             break;
  //           case 2:
  //             aux = "Male";
  //             textInfo[i] = MoreInfo(textInfo[i], aux);
  //             break;
  //         }
  //       } else if (info[i][x][0] == "relative_physical_stats") {
  //         switch (info[i][x]) {
  //           case 1:
  //             aux = "Attack>Defense";
  //             textInfo[i] = MoreInfo(textInfo[i], aux);
  //             break;
  //           case -1:
  //             aux = "Attack<Defense";
  //             textInfo[i] = MoreInfo(textInfo[i], aux);
  //             break;
  //           case 0:
  //             aux = "Attack=Defense";
  //             textInfo[i] = MoreInfo(textInfo[i], aux);
  //             break;
  //         }
  //       } else if (info[i][x][0] == "turn_upside_down") {
  //         aux = "Turn upside down";
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       } else if (info[i][x][0] == "needs_overworld_rain") {
  //         aux = "Needs overworld rain";
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       } else if (info[i][x][0] == "known_move_type") {
  //         aux = "Know " + info[i][x][1].name + " move";
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       } else if (info[i][x][0] == "min_affection") {
  //         aux = "Min affection:" + info[i][x][1];
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       } else {
  //         aux = info[i][x][1].name;
  //         textInfo[i] = MoreInfo(textInfo[i], aux);
  //       }
  //     }
  //   }
  //   //
  //   arrayPoke.push(textInfo, triggerInfo);
  //   return arrayPoke;
  // }

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
                    text={pokeEvolve3.name}
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
        <div className="grid items-center justify-center ">
          <h3 className="text-3xl font-bold">Does not evolve</h3>
        </div>
      );
    }
  }

  function EvolutionChart() {
    if (pokeEvolutionInfo) {
      return (
        <div className="grid gap-2">
          <h3 className="text-3xl font-bold">Evolution Chart</h3>
          <div className="flex items-center justify-between p-2 border-2 rounded-md border-lime-900 bg-stone-300 ">
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

            <div className="flex gap-2 p-2">
              <LeftPoke />
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
