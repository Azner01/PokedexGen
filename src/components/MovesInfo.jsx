import { useEffect, useState } from "react";

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

  return (
    <div className="grid gap-4 m-4 justify-self-center">
      <div className="flex items-center gap-2">
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
      <div className="grid w-40 h-40 p-2 border border-black bg-stone-300"></div>
    </div>
  );
}
