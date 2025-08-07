import { useState } from "react";
import TypeColor from "@components/elements/typeColor";
import UpperWord from "@components/UpperWord";

export default function PosterPoke({ inf, id }) {
  const [types, setTypes] = useState(inf.types);
  const typesL = Object.values(types).length;
  let name = inf.species.name;
  let pokeName = UpperWord(name);
  let pokeID = id + 1;

  return (
    <div className="grid">
      <button className="hover:opacity-25">
        <a href={"/pokemon/" + pokeID}>
          <div className="grid justify-center gap-4 p-4 bg-green-300 border border-black rounded-md md:w-3/5">
            <div className="grid">
              <h4 className="text-xl font-bold text-left text-blue-800">
                #{id}
              </h4>
              <h2 className="p-2 text-2xl font-semibold">{pokeName}</h2>
            </div>
            <img className="w-36 h-36" src={inf.sprites.front_default} alt="" />

            <div className="grid gap-4">
              {types.map((data, i) => {
                return <TypeColor typeC={data.type.name} key={i} />;
              })}
            </div>
            {typesL > 1 ? <div></div> : <div className="mt-12"></div>}
          </div>
        </a>
      </button>
    </div>
  );
}
