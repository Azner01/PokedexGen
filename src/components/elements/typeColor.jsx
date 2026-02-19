import UpperWord from "@components/UpperWord";

export default function TypeColor({ typeC }) {
  let pokeType = UpperWord(typeC);

  //   console.log(typeC);
  let color = "";
  switch (typeC) {
    case "normal":
      color = "bg-slate-100/80";
      break;

    case "fire":
      color = "bg-red-500/80";
      break;

    case "water":
      color = "bg-blue-400/80";
      break;

    case "grass":
      color = "bg-green-400/80";
      break;

    case "flying":
      color = "bg-blue-300/80";
      break;

    case "fighting":
      color = "bg-orange-700/80";
      break;

    case "poison":
      color = "bg-purple-500/80";
      break;

    case "electric":
      color = "bg-yellow-300/80";
      break;

    case "ground":
      color = "bg-orange-300/80";
      break;

    case "rock":
      color = "bg-yellow-700/80";
      break;

    case "psychic":
      color = "bg-pink-400/80";
      break;

    case "ice":
      color = "bg-blue-200/80";
      break;

    case "bug":
      color = "bg-lime-300/80";
      break;

    case "ghost":
      color = "bg-indigo-500/80";
      break;

    case "dragon":
      color = "bg-indigo-500/80";
      break;

    case "dark":
      color = "bg-zinc-800/80";
      break;

    case "steel":
      color = "bg-slate-400/80";
      break;

    case "fairy":
      color = "bg-fuchsia-500/80";
      break;
  }
  return (
    <div>
      <h2
        className={
          "p-2 w-[75px] text-sm font-bold  border-black border rounded-xl " +
          color
        }
      >
        {pokeType}
      </h2>
    </div>
  );
}
