import { useEffect, useState } from "react";
import { getAllMoves, getMoveInfo } from "@src/service/PokeAPI";
import TypeColor from "@src/components/elements/typeColor";

export default function MovesInfo() {
  const [moves, setMoves] = useState();
  const [filterMove, setFilterMove] = useState("");
  const [physical, setPhysical] = useState(true);
  const [special, setSpecial] = useState(true);
  const [status, setStatus] = useState(true);

  const changeInput = (value) => {
    setFilterMove(value);
  };

  const physicalChange = () => {
    setPhysical(!physical);
  };

  const specialChange = () => {
    setSpecial(!special);
  };

  const statusChange = () => {
    setStatus(!status);
  };

  useEffect(() => {
    async function loadMoves() {
      let dataFetch = await getAllMoves(0, 50);
      let dataMove = await Promise.all(
        dataFetch.results.map(async (data) => {
          return await getMoveInfo(data.name);
        }),
      );
      let filterPhysical;
      let filterSpecial;
      let filterStatus;
      let filterData;
      //
      if (!physical) {
        filterPhysical = dataMove.filter(
          (d) => d.damage_class.name != "physical",
        );
        // console.log(filterPhysical);
      } else {
        filterPhysical = dataMove;
      }

      console.log(filterData);
      //
      setMoves(dataMove);
    }
    loadMoves();
  }, []);

  const ButtonCheck = ({ src, change, statustype }) => {
    if (statustype) {
      return (
        <button onClick={change}>
          <img className="w-24 h-24" src={src} alt="" />
        </button>
      );
    } else {
      return (
        <button onClick={change} className="opacity-40">
          <img className="w-24 h-24" src={src} alt="" />
        </button>
      );
    }
  };

  const ClassImages = ({ classT }) => {
    if (classT == "physical") {
      return (
        <img className="w-16 h-16" src={"/Physical_Icon.png"} alt=""></img>
      );
    } else if (classT == "special") {
      return <img className="w-16 h-16" src={"/Special_Icon.png"} alt=""></img>;
    } else {
      return <img className="w-16 h-16" src={"/Status_Icon.png"} alt=""></img>;
    }
  };

  return (
    <div className="grid gap-4 m-4 justify-self-center">
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-2xl font-medium text-left">Buscar</h2>
        <input
          className="border-black border p-2 bg-white w-[200px] rounded-md opacity-90"
          placeholder="Move Name"
          type="text"
          value={filterMove}
          onChange={(e) => changeInput(e.target.value)}
        ></input>
        <div className="flex">
          <ButtonCheck
            src="/Physical_Icon.png"
            change={physicalChange}
            statustype={physical}
          />
          <ButtonCheck
            src="/Special_Icon.png"
            change={specialChange}
            statustype={special}
          />
          <ButtonCheck
            src="/Status_Icon.png"
            change={statusChange}
            statustype={status}
          />
        </div>
      </div>
      {/* bg-stone-300 */}
      {moves && (
        <table className="grid justify-between w-auto ">
          <thead className="sticky">
            <tr className="text-white bg-black ">
              <th className="w-[50px] py-3 ">#</th>
              <th className="w-[150px] py-3">Name</th>
              <th className="w-[150px] py-3">Class</th>
              <th className="w-[150px] py-3">Type</th>
              <th className="w-[150px] py-3">Power</th>
              <th className="w-[50px] py-3">PP</th>
              <th className="w-[150px] py-3">Accuracy</th>
              <th className="w-[150px] py-3">Priority</th>
              <th className="w-[200px] py-3">Generation</th>
            </tr>
          </thead>
          <tbody className="w-auto h-[450px] overflow-auto border-2 border-black">
            {moves.map((data, i) => {
              return (
                <tr className="bg-white border-2 border-black" key={i}>
                  <th className="w-[50px] py-3 ">{data.id}</th>
                  <th className="w-[150px] py-3 hover:text-blue-300">
                    <a href={"/move/" + data.name}>{data.name}</a>
                  </th>
                  <th className="w-[150px] py-3 justify-center flex">
                    <ClassImages classT={data.damage_class.name} />
                  </th>
                  <th className="w-[150px] py-3">
                    <TypeColor typeC={data.type.name} />
                  </th>
                  <th className="w-[150px] py-3">{data.power}</th>
                  <th className="w-[50px] py-3">{data.pp}</th>
                  <th className="w-[150px] py-3">{data.accuracy}</th>
                  <th className="w-[150px] py-3">{data.priority}</th>
                  <th className="w-[200px] py-3">{data.generation.name}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
