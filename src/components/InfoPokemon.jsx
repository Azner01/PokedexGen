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

      if (pokeEvolutionData.chain.evolves_to[0]) {
        let pokeE1 = await getPokemon(pokeEvolutionData.chain.species.name);
        let pokeE2 = await getPokemon(
          pokeEvolutionData.chain.evolves_to[0].species.name,
        );
        setPokeEvolve1(pokeE1);
        setPokeEvolve2(pokeE2);
        if (pokeEvolutionData.chain.evolves_to[0].evolves_to) {
          let pokeE3 = await getPokemon(
            pokeEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
          );
          setPokeEvolve3(pokeE3);
        }
      }
      setPokeEvolutionInfo(pokeEvolutionData);
    }
    fetchData();
  }, []);
  //
  if (pokeEvolutionInfo) {
    let data = pokeEvolutionInfo.chain.evolves_to[0].evolution_details;
    let data1 = pokeEvolutionInfo.chain.evolves_to[0];
    let data2 = pokeEvolve1;
    // console.log(pokeEvolutionInfo);
  }

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
    let infoPoke = [];
    if (type == 1) {
      infoPoke = Object.entries(
        info.chain.evolves_to[0].evolution_details[0],
      ).filter(([key, value]) => {
        return value !== null && value !== "" && value !== false;
      });
    } else {
      infoPoke = Object.entries(
        pokeEvolutionInfo.chain.evolves_to[0].evolves_to[0]
          .evolution_details[0],
      ).filter(([key, value]) => {
        return value !== null && value !== "" && value !== false;
      });
    }

    return infoPoke;
  }

  function EvolveDistinction(info) {
    let arrayPoke = [];
    let textInfo;
    if (info[0][0] == "min_level") {
      textInfo = info[0][1];
    } else {
      textInfo = info[0][1].name;
    }
    let triggerInfo = "";
    let add = false;
    if (info.length > 1) {
      triggerInfo = info[1][1].name;
      add = true;
    }
    arrayPoke.push(textInfo, triggerInfo, add);
    return arrayPoke;
  }

  function InfoChart() {
    if (pokeEvolve1 && pokeEvolve2) {
      const evolveInfo1 = EvolveInfo(pokeEvolutionInfo, 1);

      let DataEvolve1 = EvolveDistinction(evolveInfo1);
      console.log(DataEvolve1);
      //
      if (pokeEvolve3) {
        const evolveInfo2 = EvolveInfo(pokeEvolutionInfo, 2);
        let DataEvolve2 = EvolveDistinction(evolveInfo2);
        console.log(DataEvolve2);
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
              additional={DataEvolve1[2]}
            />
            <ImageChart
              text={pokeEvolve2.name}
              image={pokeEvolve2.sprites.front_default}
            />
            <ArrowInfo
              trigger={DataEvolve2[1]}
              text={DataEvolve2[0]}
              additional={DataEvolve2[2]}
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
          <ArrowInfo
            trigger={DataEvolve1[1]}
            text={DataEvolve1[0]}
            additional={DataEvolve1[2]}
          />
          <ImageChart
            text={pokeEvolve2.name}
            image={pokeEvolve2.sprites.front_default}
          />
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
            {/* {pokeEvolutionInfo.chain.evolve_to} */}
            {/* <h4>{pokeEvolutionInfo.chain.species.name}</h4> */}
            {/* {pokeEvolutionInfo.chain.evolves_to[0].evolution_details.map(
              (data) => {
                console.log(data);
                if (data != null) {
                  <ArrowInfo text={":"} />;
                }
              },
            )} */}
            {/* <ArrowInfo text={"Level 32"} /> */}
            {/* <h4>a</h4>
            <ArrowInfo text={"Dusk Stone"} />
            <h4>a</h4> */}
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
