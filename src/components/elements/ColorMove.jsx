// import UpperWord from "@components/UpperWord";

export default function ColorMove({ DataType, DataClass }) {
  // let pokeType = UpperWord(typeC);

  //   console.log(typeC);
  let colorType = "";
  let colorClass = "";
  switch (DataType) {
    case "normal":
      colorType = "bg-slate-100";
      break;

    case "fire":
      colorType = "bg-red-500";
      break;

    case "water":
      colorType = "bg-blue-400";
      break;

    case "grass":
      colorType = "bg-green-400";
      break;

    case "flying":
      colorType = "bg-blue-300";
      break;

    case "fighting":
      colorType = "bg-orange-700";
      break;

    case "poison":
      colorType = "bg-purple-500";
      break;

    case "electric":
      colorType = "bg-yellow-300";
      break;

    case "ground":
      colorType = "bg-orange-300";
      break;

    case "rock":
      colorType = "bg-yellow-700";
      break;

    case "psychic":
      colorType = "bg-pink-400";
      break;

    case "ice":
      colorType = "bg-blue-200";
      break;

    case "bug":
      colorType = "bg-lime-300";
      break;

    case "ghost":
      colorType = "bg-indigo-500";
      break;

    case "dragon":
      colorType = "bg-indigo-500";
      break;

    case "dark":
      colorType = "bg-zinc-800";
      break;

    case "steel":
      colorType = "bg-slate-400";
      break;

    case "fairy":
      colorType = "bg-fuchsia-500";
      break;
  }

  switch (DataClass) {
    case "physical":
      colorType = "bg-orange-100";
      break;

    case "special":
      colorType = "bg-blue-800";
      break;

    case "status":
      colorType = "bg-gray-400";
      break;
  }
  return (
    <div className="grid gap-2">
      <div
        className={
          "flex gap-6 p-2 text-justify text-white  border border-white rounded-xl " +
          colorType
        }
      >
        <h3>Type: </h3> <h3>{DataType}</h3>
      </div>
      <div
        className={
          "flex gap-6 p-2 text-justify text-white border border-white rounded-xl " +
          colorClass
        }
      >
        <h3>Category: </h3> <h3>{DataClass}</h3>
      </div>
    </div>
  );
}
