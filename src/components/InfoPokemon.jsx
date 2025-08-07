import { useEffect, useState } from "react";

import { getPokemonID, getMorePokemonInfo } from "@src/service/PokeAPI";
import UpperWord from "@components/UpperWord";
import TypeColor from "@components/elements/typeColor";
import StatisticsPoke from "@components/elements/StatisticsPoke";

export default function InfoPokemon({ pokeId }) {
  const [pokeInfo, setPokeInfo] = useState();
  const [pokeMoreInfo, setPokeMoreInfo] = useState();

  useEffect(() => {
    async function fetchData() {
      let pokeData = await getPokemonID(pokeId);
      setPokeInfo(pokeData);
    }
    async function fetchMoreData() {
      let pokeMoreData = await getMorePokemonInfo(pokeId);
      setPokeMoreInfo(pokeMoreData);
    }
    fetchData();
    fetchMoreData();
  }, []);
  console.log(pokeMoreInfo);

  const MaleSign = () => {
    return (
      <img className="w-16 h-16" src="/Gender_Female.png" alt="Female Sign" />
    );
  };

  const FemaleSign = () => {
    return <img className="w-16 h-16" src="/Gender_Male.png" alt="Male Sign" />;
  };

  function LeftPoke() {
    return (
      <div className="grid">
        <div className="flex gap-12">
          <img
            className="w-36 h-36"
            src={pokeInfo.sprites.front_default}
            alt=""
          />
        </div>
        <div>
          <StatisticsPoke data={pokeInfo.stats} />
        </div>
      </div>
    );
  }

  function TextC({ text1, text2 }) {
    return (
      <div className="grid">
        <h3 className="text-lg text-white">{text1} </h3>
        <h4 className="w-24 text-lg text-center text-black">{text2}</h4>
      </div>
    );
  }

  function RightPoke() {
    // let height = numbersData(pokeInfo.height);
    return (
      // {pokeInfo =! n}
      <div className="grid gap-2 text-center">
        <div className="grid p-3 bg-blue-500 rounded-md ">
          <div className="grid grid-cols-2 gap-4 ">
            <TextC text1="Height" text2={pokeInfo.height + " m"} />
            <TextC text1="Weight" text2={pokeInfo.weight + " kg"} />

            <TextC text1="Shape" text2={pokeMoreInfo.shape.name} />
            <TextC text1="Category" text2={pokeMoreInfo.genera[7].genus} />
          </div>
          <div className="grid justify-center gap-2">
            <h3 className="text-xl text-center text-white">Género</h3>
            <div className="flex">
              {pokeMoreInfo.gender_rate === -1 ? (
                <h3>Undiscovered</h3>
              ) : pokeMoreInfo.gender_rate === 0 ? (
                <MaleSign />
              ) : pokeMoreInfo.gender_rate === 8 ? (
                <FemaleSign />
              ) : (
                <div className="flex">
                  <MaleSign />
                  <FemaleSign />
                </div>
              )}
              {/* <MaleSign />
              <FemaleSign /> */}
            </div>
          </div>
        </div>
        <div className="grid justify-center ">
          <h3 className="text-2xl font-medium">Tipos</h3>
          <div className="flex gap-4">
            {pokeInfo.types.map((data, i) => {
              return <TypeColor typeC={data.type.name} key={i} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 m-4 border-2 border-black border-solid justify-self-center md:w-1/2">
      {pokeInfo != undefined ? (
        <div className="grid justify-center">
          <h1 className="text-2xl font-bold text-center">
            {UpperWord(pokeInfo.name)} NO.{pokeId}
          </h1>
          <div className="flex gap-2 p-2">
            <LeftPoke />
            <RightPoke />
          </div>
        </div>
      ) : (
        <div>
          <h2>Cargando...</h2>
        </div>
      )}
    </div>
  );
}
