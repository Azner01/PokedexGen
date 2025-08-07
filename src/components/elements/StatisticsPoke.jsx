export default function ({ data }) {
  const statistics = [
    "HP:",
    "Attack:",
    "Defense:",
    "Sp. Atk:",
    "Sp. Def:",
    "Speed:",
  ];

  return (
    <div className="grid p-4 bg-gray-400 border-2 rounded-lg ">
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
            <div className="h-4 bg-red-600" style={estilo}></div>
          </h4>
        );
      })}
    </div>
  );
}
