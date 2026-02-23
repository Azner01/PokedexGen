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
      // console.log(pokeEvolutionData.chain.evolves_to.length);
      // console.log(pokeEvolutionData.chain.evolves_to);
      // if (pokeEvolutionData.chain.evolves_to.length > 1) {
      let pokeLength = pokeEvolutionData.chain.evolves_to.length;
      let pokeEE = [];
      let pokeAux;
      // for (let i = 0; i < pokeLength; i++) {
      //   pokeAux = [];
      //   pokeAux = await getPokemon(
      //     pokeEvolutionData.chain.evolves_to[i].species.name,
      //   );
      //   pokeEE.push(pokeAux);
      // }
      // console.log(pokeEvolutionData.chain.evolves_to[0].species.name);
      // console.log(pokeEE);
      // console.log(pokeEvolutionData.chain.evolves_to.length);
      // }

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
        //

        if (
          pokeEvolutionData.chain.evolves_to[0].evolves_to &&
          pokeEvolutionData.chain.evolves_to[0].evolves_to.length > 0
        ) {
          pokeE3 = await getPokemon(
            pokeEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
          );
          //
          if (pokeEvolutionData.chain.evolves_to.length > 1) {
            for (
              let i = 0;
              i < pokeEvolutionData.chain.evolves_to[0].evolves_to.length;
              i++
            ) {
              pokeAux = [];
              pokeAux = await getPokemon(
                pokeEvolutionData.chain.evolves_to[0].evolves_to[0].species
                  .name,
              );
              pokeE2.push(pokeAux);
            }
          } else {
            pokeE3 = await getPokemon(
              pokeEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
            );
          }
          //
          setPokeEvolve3(pokeE3);
        }
      }
      setPokeEvolutionInfo(pokeEvolutionData);
    }
    fetchData();
  }, []);
  //
  // if (pokeEvolutionInfo) {
  //   let data = pokeEvolutionInfo.chain.evolves_to[0].evolution_details;
  //   let data1 = pokeEvolutionInfo.chain.evolves_to[0];
  //   let data2 = pokeEvolve1;
  //   console.log(pokeEvolutionInfo);
  // }

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

  function EvolveInfo(info, type) {
    // console.log(info.chain.evolves_to.length);

    let infoPoke = [];
    let auxPoke = [];
    for (let i = 0; i < info.chain.evolves_to.length; i++) {
      // console.log(info.chain.evolves_to[i].evolution_details[0]);
      auxPoke = [];
      if (type == 1) {
        auxPoke = Object.entries(
          info.chain.evolves_to[i].evolution_details[0],
        ).filter(([key, value]) => {
          return value !== null && value !== "" && value !== false;
        });
        infoPoke.push(auxPoke);
      } else {
        auxPoke = Object.entries(
          pokeEvolutionInfo.chain.evolves_to[i].evolves_to[0]
            .evolution_details[0],
        ).filter(([key, value]) => {
          return value !== null && value !== "" && value !== false;
        });
        infoPoke.push(auxPoke);
      }
    }
    // if (type == 1) {
    //   infoPoke = Object.entries(
    //     info.chain.evolves_to[0].evolution_details[0],
    //   ).filter(([key, value]) => {
    //     return value !== null && value !== "" && value !== false;
    //   });
    // } else {
    //   infoPoke = Object.entries(
    //     pokeEvolutionInfo.chain.evolves_to[0].evolves_to[0]
    //       .evolution_details[0],
    //   ).filter(([key, value]) => {
    //     return value !== null && value !== "" && value !== false;
    //   });
    // }
    // console.log(infoPoke);
    return infoPoke;
  }

  function EvolveDistinction(info) {
    let arrayPoke = [];
    let textInfo = [];
    let triggerInfo = [];
    let aux = "";
    // let add = false;
    //
    // function MoreInfo(textI, textM) {
    //   let textFinal = "";
    //   // console.log(textI);
    //   // console.log(textM);
    //   if (textI === "") {
    //     textFinal = textM;
    //     return textFinal;
    //   } else {
    //     textFinal = textI + " + " + textM;
    //     return textFinal;
    //   }
    // }
    //

    // console.log(info[0][1]);
    for (let i = 0; i < info.length; i++) {
      if (info[i][1][1].name === undefined) {
        aux = info[i][1][1];
        triggerInfo.push(aux);
      } else {
        aux = info[i][1][1].name;
        triggerInfo.push(aux);
      }

      if (
        info[i][0][0] === "min_level" ||
        info[i][0][0] === "min_happiness" ||
        info[i][0][0] === "min_beauty" ||
        info[i][0][0] === "time_of_day"
      ) {
        aux = info[i][0][1];
        // console.log(info);
        textInfo.push(aux);
      } else if (info[i][0][0] == "gender") {
        switch (info[i][1]) {
          case 1:
            aux = "Female";
            textInfo.push(aux);
            break;
          case 2:
            aux = "Male";
            textInfo.push(aux);
            break;
        }
      } else if (info[i][0][0] == "relative_physical_stats") {
        switch (info[i][1]) {
          case 1:
            aux = "Attack>Defense";
            textInfo.push(aux);
            break;
          case -1:
            aux = "Attack<Defense";
            textInfo.push(aux);
            break;
          case 0:
            aux = "Attack=Defense";
            textInfo.push(aux);
            break;
        }
      } else if (
        info[i][0][0] == "needs_overworld_rain" ||
        info[i][0][0] == "turn_upside_down"
      ) {
        if (info[i][0][0] == "needs_overworld_rain") {
          aux = "Needs overworld rain";
          textInfo.push(aux);
        } else {
          aux = "Turn upside down";
          textInfo.push(aux);
        }
      } else {
        aux = info[i][0][1].name;
        textInfo.push(aux);
      }
    }

    // if (
    //   info[0][0] === "min_level" ||
    //   info[0][0] === "min_happiness" ||
    //   info[0][0] === "min_beauty" ||
    //   info[0][0] === "time_of_day"
    // ) {
    //   // textInfo = info[0][1];
    //   textInfo = MoreInfo(textInfo, info[0][1]);
    // } else if (info[0][0] == "gender") {
    //   switch (info[0][1]) {
    //     case 1:
    //       textInfo = MoreInfo(textInfo, "Female");
    //       break;
    //     case 2:
    //       textInfo = MoreInfo(textInfo, "Male");
    //       break;
    //   }
    // } else if (info[0][0] == "relative_physical_stats") {
    //   switch (info[0][1]) {
    //     case 1:
    //       textInfo = MoreInfo(textInfo, "Attack>Defense");
    //       break;
    //     case -1:
    //       textInfo = MoreInfo(textInfo, "Attack<Defense");
    //       break;
    //     case 0:
    //       textInfo = MoreInfo(textInfo, "Attack=Defense");
    //       break;
    //   }
    // } else if (
    //   info[0][0] == "needs_overworld_rain" ||
    //   info[0][0] == "turn_upside_down"
    // ) {
    //   if (info[0][0] == "needs_overworld_rain") {
    //     textInfo = MoreInfo(textInfo, "Needs overworld rain");
    //   } else {
    //     textInfo = MoreInfo(textInfo, "Turn upside down");
    //   }
    // } else {
    //   textInfo = MoreInfo(textInfo, info[0][1].name);
    // }
    //
    // console.log(info[1]);
    //
    // console.log(info);
    // if (info.length > 1) {
    //   triggerInfo = info[1][1].name;
    //   add = true;
    // }
    //
    // arrayPoke.push(textInfo, triggerInfo, add);
    arrayPoke.push(textInfo, triggerInfo);
    //
    // let textIn = ""
    // let triggerIn = ""
    // textInfo.map((data, i)=>{
    //   textIn = textIn + " + "+data[0][0];
    // })
    //
    // console.log(arrayPoke);
    //
    //Debe revolver solo el nombre del trigger y el texto
    // console.log(arrayPoke);
    return arrayPoke;
  }

  function InfoChart() {
    if (pokeEvolve1 && pokeEvolve2) {
      const evolveInfo1 = EvolveInfo(pokeEvolutionInfo, 1);

      let DataEvolve1 = EvolveDistinction(evolveInfo1);

      //
      if (pokeEvolve3) {
        const evolveInfo2 = EvolveInfo(pokeEvolutionInfo, 2);
        let DataEvolve2 = EvolveDistinction(evolveInfo2);

        // console.log(DataEvolve1[0][0][1].name);
        //

        return (
          <div className="flex items-center justify-between ">
            <ImageChart
              text={pokeEvolve1.name}
              image={pokeEvolve1.sprites.front_default}
            />
            <ArrowInfo
              trigger={DataEvolve1[1]}
              text={DataEvolve1[0]}
              // additional={DataEvolve1[2]}
            />
            <ImageChart
              text={pokeEvolve2.name}
              image={pokeEvolve2.sprites.front_default}
            />
            <ArrowInfo
              trigger={DataEvolve2[1]}
              text={DataEvolve2[0]}
              // additional={DataEvolve2[2]}
            />
            <ImageChart
              text={pokeEvolve3.name}
              image={pokeEvolve3.sprites.front_default}
            />
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
          {pokeEvolve2.length === undefined && (
            <div className="flex items-center justify-between">
              <ArrowInfo trigger={DataEvolve1[1]} text={DataEvolve1[0]} />
              <ImageChart
                text={pokeEvolve2.name}
                image={pokeEvolve2.sprites.front_default}
              />
            </div>
          )}
          {/* <ArrowInfo
            trigger={DataEvolve1[1]}
            text={DataEvolve1[0]}
          />
          <ImageChart
            text={pokeEvolve2.name}
            image={pokeEvolve2.sprites.front_default}
          /> */}
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
