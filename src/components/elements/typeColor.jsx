import UpperWord from "@components/UpperWord";

export default function TypeColor({ typeC }) {
  let pokeType = UpperWord(typeC);

  //   console.log(typeC);
  let color = "";
  switch (typeC) {
    case "normal":
      color = "bg-slate-100";
      break;

    case "fire":
      color = "bg-red-500";
      break;

    case "water":
      color = "bg-blue-400";
      break;

    case "grass":
      color = "bg-green-400";
      break;

    case "flying":
      color = "bg-blue-300";
      break;

    case "fighting":
      color = "bg-orange-700";
      break;

    case "poison":
      color = "bg-purple-500";
      break;

    case "electric":
      color = "bg-yellow-300";
      break;

    case "ground":
      color = "bg-orange-300";
      break;

    case "rock":
      color = "bg-yellow-700";
      break;

    case "psychic":
      color = "bg-pink-400";
      break;

    case "ice":
      color = "bg-blue-200";
      break;

    case "bug":
      color = "bg-lime-300";
      break;

    case "ghost":
      color = "bg-indigo-500";
      break;

    case "dragon":
      color = "bg-indigo-500";
      break;

    case "dark":
      color = "bg-zinc-800";
      break;

    case "steel":
      color = "bg-slate-400";
      break;

    case "fairy":
      color = "bg-fuchsia-500";
      break;
  }
  return (
    <div>
      <h2
        className={
          "p-4 text-sm font-medium border-black border rounded-xl " + color
        }
      >
        {pokeType}
      </h2>
    </div>
  );
}
