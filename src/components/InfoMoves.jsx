import { useEffect, useState } from "react";
import { getMoveInfo } from "@src/service/PokeAPI";
import ColorMove from "@src/components/elements/ColorMove";

export default function InfoMoves({ dataMove }) {
  const nameM = dataMove.toUpperCase();
  const [infoMove, setInfoMove] = useState([]);
  //   console.log(infoMove);

  useEffect(() => {
    const loadMove = async () => {
      let data = await getMoveInfo(dataMove);
      console.log(data);
      setInfoMove(data);
    };
    loadMove();
  }, []);

  const LeftData = () => {
    return (
      <div>
        {infoMove && (
          <div className="grid gap-2 p-2 border border-lime-900 bg-stone-200">
            <h2 className="text-xl font-medium text-center">{nameM}</h2>
            <ColorMove
              DataType={infoMove.type.name}
              DataClass={infoMove.damage_class.name}
            />
            {/* <div className="flex gap-6 p-2 text-justify text-white bg-black border border-white rounded-xl">
              <h3>Type: </h3> <h3>{infoMove.type.name}</h3>
            </div>
            <div className="flex gap-6 p-2 text-justify text-white bg-black border border-white rounded-xl">
              <h3>Category: </h3> <h3>{infoMove.damage_class.name}</h3>
            </div> */}
            <div className="flex gap-6 p-2 text-justify bg-white border border-gray-700 rounded-xl">
              <h3>PP: </h3> <h3>{infoMove.pp}</h3>
            </div>
            <div className="flex gap-6 p-2 text-justify bg-white border border-gray-700 rounded-xl">
              <h3>Power: </h3> <h3>{infoMove.power}</h3>
            </div>
            <div className="flex gap-6 p-2 text-justify bg-white border border-gray-700 rounded-xl">
              <h3>Accuracy: </h3> <h3>{infoMove.accuracy}</h3>
            </div>
            <div className="flex gap-6 p-2 text-justify bg-white border border-gray-700 rounded-xl">
              <h3>Introduced: </h3> <h3>{infoMove.accuracy}</h3>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RightData = () => {
    return (
      <div>
        <h2>Description</h2>
        <div className="border border-lime-900 bg-stone-200"></div>
      </div>
    );
  };

  return (
    <div className="grid gap-2 p-2">
      {infoMove && (
        <div>
          <h1 className="text-3xl font-medium text-center">{nameM}</h1>
          <div className="flex justify-between gap-2 px-20">
            <LeftData />
            <RightData />
          </div>{" "}
        </div>
      )}
    </div>
  );
}
