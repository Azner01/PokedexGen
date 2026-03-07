import UpperWord from "@components/UpperWord";

export function TypeColor({ typeC }) {
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

export function ArrowInfo({ trigger, text }) {
  //   console.log(text);
  return (
    <div className="flex items-center justify-center">
      <div className="absolute z-10 p-10 text-[12px] font-medium text-white">
        <div className="grid w-40 text-center text-wrap">
          <h4 className="font-bold"> {trigger} </h4>
          <h4 className=""> {text}</h4>
        </div>
      </div>
      <img className="w-40 h-40" src="/ArrowRight.png" alt="" />
    </div>
  );
}

export function Sign({ image }) {
  return <img className="w-16 h-16" src={image} alt="Female Sign" />;
}

export function TextC({ text1, text2 }) {
  return (
    <div className="grid">
      <h3 className="text-lg font-bold">{text1} </h3>
      <h4 className="w-24 text-lg text-center text-sky-600">{text2}</h4>
    </div>
  );
}

export function StatisticsPoke({ data }) {
  const statistics = [
    "HP:",
    "Attack:",
    "Defense:",
    "Sp. Atk:",
    "Sp. Def:",
    "Speed:",
  ];

  return (
    <div className="grid p-4 border-2 rounded-lg bg-stone-200 border-lime-900">
      {statistics.map((stat, i) => {
        let estilo;
        let colorStat;
        // console.log(typeof data[i].base_stat);

        if (data[i].base_stat <= 60) {
          colorStat = "#e01c0d";
        } else if (data[i].base_stat <= 80 && data[i].base_stat > 60) {
          colorStat = "#e07e0d";
        } else if (data[i].base_stat <= 100 && data[i].base_stat > 80) {
          colorStat = "#eef207";
        } else if (data[i].base_stat <= 130 && data[i].base_stat > 100) {
          colorStat = "#36f207";
        } else {
          colorStat = "#0de0dd";
        }

        estilo = {
          backgroundColor: colorStat,
          width: `${data[i].base_stat / 2}%`,
        };

        return (
          <h4
            className="text-lg font-medium text-justify align-middle "
            key={i}
          >
            {stat} {data[i].base_stat}
            <div
              className="h-4 bg-red-600 border-2 border-black"
              style={estilo}
            ></div>
          </h4>
        );
      })}
    </div>
  );
}

export function ImageChart({ text, image }) {
  return (
    <div className="grid items-center text-center">
      <img className="w-48 h-48" src={image} alt="" />
      <h4 className="text-xl">{text}</h4>
    </div>
  );
}

export function EvolveInfo(info, type) {
  let infoPoke = [];
  let auxPoke = [];
  for (let i = 0; i < info.chain.evolves_to.length; i++) {
    //
    auxPoke = [];
    if (type == 1) {
      auxPoke = Object.entries(
        info.chain.evolves_to[i].evolution_details[0],
      ).filter(([key, value]) => {
        return value !== null && value !== "" && value !== false;
      });

      infoPoke.push(auxPoke);
    } else {
      for (let x = 0; x < info.chain.evolves_to[i].evolves_to.length; x++) {
        auxPoke = Object.entries(
          info.chain.evolves_to[i].evolves_to[x].evolution_details[0],
        ).filter(([key, value]) => {
          return value !== null && value !== "" && value !== false;
        });

        infoPoke.push(auxPoke);
      }
    }
  }
  return infoPoke;
}

export function EvolveDistinction(info) {
  let arrayPoke = [];
  let textInfo = [];
  let triggerInfo = [];
  let aux = "";
  //
  function MoreInfo(textIni, textMore) {
    let textFinal = "";
    if (textIni === undefined) {
      textFinal = textMore;
      return textFinal;
    } else {
      textFinal = textIni + " + " + textMore;
      return textFinal;
    }
  }
  //

  for (let i = 0; i < info.length; i++) {
    let lastInfoDetail = info[i].length - 1;
    if (info[i][lastInfoDetail][1].name === undefined) {
      aux = info[i][lastInfoDetail][1];
      triggerInfo[i] = MoreInfo(triggerInfo[i], aux);
    } else {
      aux = info[i][lastInfoDetail][1].name;
      triggerInfo[i] = MoreInfo(triggerInfo[i], aux);
    }
    //
    for (let x = 0; x < info[i].length - 1; x++) {
      if (
        info[i][x][0] === "min_level" ||
        info[i][x][0] === "min_happiness" ||
        info[i][x][0] === "min_beauty" ||
        info[i][x][0] === "time_of_day"
      ) {
        aux = info[i][x][1];
        textInfo[i] = MoreInfo(textInfo[i], aux);
      } else if (info[i][x][0] == "gender") {
        switch (info[i][1]) {
          case 1:
            aux = "Female";
            textInfo[i] = MoreInfo(textInfo[i], aux);
            break;
          case 2:
            aux = "Male";
            textInfo[i] = MoreInfo(textInfo[i], aux);
            break;
        }
      } else if (info[i][x][0] == "relative_physical_stats") {
        switch (info[i][x]) {
          case 1:
            aux = "Attack>Defense";
            textInfo[i] = MoreInfo(textInfo[i], aux);
            break;
          case -1:
            aux = "Attack<Defense";
            textInfo[i] = MoreInfo(textInfo[i], aux);
            break;
          case 0:
            aux = "Attack=Defense";
            textInfo[i] = MoreInfo(textInfo[i], aux);
            break;
        }
      } else if (info[i][x][0] == "turn_upside_down") {
        aux = "Turn upside down";
        textInfo[i] = MoreInfo(textInfo[i], aux);
      } else if (info[i][x][0] == "needs_overworld_rain") {
        aux = "Needs overworld rain";
        textInfo[i] = MoreInfo(textInfo[i], aux);
      } else if (info[i][x][0] == "known_move_type") {
        aux = "Know " + info[i][x][1].name + " move";
        textInfo[i] = MoreInfo(textInfo[i], aux);
      } else if (info[i][x][0] == "min_affection") {
        aux = "Min affection:" + info[i][x][1];
        textInfo[i] = MoreInfo(textInfo[i], aux);
      } else {
        aux = info[i][x][1].name;
        textInfo[i] = MoreInfo(textInfo[i], aux);
      }
    }
  }
  //
  arrayPoke.push(textInfo, triggerInfo);
  return arrayPoke;
}
