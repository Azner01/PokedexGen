import { useState } from "react";
import TypeColor from "@components/elements/typeColor";
import UpperWord from "@components/UpperWord";

export default function PosterPoke({ inf, id }) {
  const [types, setTypes] = useState(inf.types);
  const typesL = Object.values(types).length;
  let name = inf.species.name;
  let pokeName = UpperWord(name);

  return (
    <div className="grid justify-center ">
      <button className="size-full hover:opacity-25  w-[200px]">
        <a href={"/pokemon/" + pokeName}>
          <div className="grid justify-center p-2 px-6 pb-8 border border-black rounded-md ">
            <h4 className="text-xl font-bold text-blue-500 place-self-start">
              #{id + 1}
            </h4>
            <div className="grid">
              <h2 className="text-2xl font-semibold">{pokeName}</h2>
            </div>
            <img className="w-36 h-36" src={inf.sprites.front_default} alt="" />

            <div className="flex justify-center gap-2">
              {types.map((data, i) => {
                return <TypeColor typeC={data.type.name} key={i} />;
              })}
            </div>
            {typesL > 1 ? <div></div> : <div className=""></div>}
          </div>
        </a>
      </button>
    </div>
  );
}
