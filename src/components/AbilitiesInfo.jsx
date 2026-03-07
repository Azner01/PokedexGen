import { useEffect, useState } from "react";
import { getAllAbility, getAbilityInfo, DataInfo } from "@src/service/PokeAPI";

export default function AblitiesInfo() {
  const [abilities, setAbilities] = useState();
  const [filterAbility, setFilterAbility] = useState("");
  const [numPages, setNumPages] = useState();
  const [pageActual, setPageActual] = useState(1);
  const [showSpecificPage, setShowSpecificPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      //Calcular las páginas para restringir el número de movimiento en pantalla
      let count;
      const listAbilities = await getAllAbility();
      let num = Math.round(listAbilities.count / 30);
      let res = (listAbilities.count / 30 - num) * 100;
      if (res == 0) {
        count = Math.round(listAbilities.count / 30);
      } else {
        count = Math.round(listAbilities.count / 30) + 1;
      }
      setNumPages(count - 1);

      //Solo traer los primeros 30 elementos
      const firstDataList = await getAbilityInfo("?offset=0&limit=" + 30);
      let DataListMove = [];
      for (let x = 0; x < firstDataList.results.length; x++) {
        const dataMove = await DataInfo(firstDataList.results[x].url);
        DataListMove.push(dataMove);
      }
      setAbilities(DataListMove);
      // console.log(DataListMove);
    }
    fetchData();
  }, []);

  // useEffect(() => {}, [numPages]);

  const changeInput = (value) => {
    setFilterAbility(value);
  };

  const changePage = (num) => {
    //
    async function NewAbilities(num) {
      setAbilities();
      let initialNum = 30 * num;
      const DataList = await getAbilityInfo(
        "?offset=" + initialNum + "&limit=" + 30,
      );
      let DataListMove = [];
      for (let x = 0; x < DataList.results.length; x++) {
        const dataMove = await DataInfo(DataList.results[x].url);
        DataListMove.push(dataMove);
      }
      setAbilities(DataListMove);
    }
    if (num != "..." && num != Number(pageActual)) {
      setPageActual(Number(num));
      NewAbilities(Number(num));
      // setAbilities()
      // console.log(num);
    } else if (num == "...") {
      setShowSpecificPage(!showSpecificPage);
    }
  };

  function PageChange() {
    function PageNumber({ num }) {
      if (num == pageActual) {
        return (
          <button
            className="h-16 text-center bg-blue-400 border border-black rounded-md place-content-center w-14 hover:bg-blue-200"
            value={num}
            onClick={(e) => changePage(e.currentTarget.value)}
          >
            <h2 className="text-2xl font-medium">{num}</h2>
          </button>
        );
      } else {
        return (
          <button
            className="h-16 text-center bg-gray-300 border border-black rounded-md place-content-center w-14 hover:bg-blue-200"
            value={num}
            onClick={(e) => changePage(e.currentTarget.value)}
          >
            <h2 className="text-2xl font-medium">{num}</h2>
          </button>
        );
      }
    }

    function ListPage() {
      let ItemsPages = [];

      function PushPages(num) {
        ItemsPages.push(
          <li>
            <PageNumber num={num} />
          </li>,
        );
      }
      //pageActual
      if (numPages <= 6) {
        for (let x = 1; x < numPages + 1; x++) {
          ItemsPages.push(
            <li>
              <PageNumber num={x} />
            </li>,
          );
        }
      }
      //
      else {
        PushPages(1);
        //
        if (pageActual >= 1 && pageActual <= 3) {
          for (let x = 2; x <= 6; x++) {
            PushPages(x);
          }
          PushPages("...");
        }
        //
        else if (pageActual >= numPages - 3 && pageActual <= numPages + 1) {
          PushPages("...");
          for (let x = numPages - 5; x < numPages; x++) {
            PushPages(x);
          }
        } else {
          PushPages("...");
          PushPages(Number(pageActual) - 1);
          PushPages(Number(pageActual));
          PushPages(Number(pageActual) + 1);
          PushPages(Number(pageActual) + 2);
          PushPages("...");
        }
        PushPages(numPages);
      }
      return <ul className="flex gap-2">{ItemsPages}</ul>;
    }

    if (numPages) {
      return <ListPage />;
    }
  }

  function SpecificPage() {
    const [selectPage, setSelectPage] = useState("");
    return (
      <div className="flex gap-2 ">
        {/* <button
          className="w-12 h-12 px-2 text-xl font-extrabold text-white bg-red-500 border border-black rounded-md"
          onClick={() => setShowSpecificPage(false)}
        >
          X
        </button> */}
        <input
          className="border-2 rounded-md text-xl p-2 border-black [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          placeholder="Enter page's number"
          value={selectPage}
          onChange={(e) => setSelectPage(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(pageActual);
              if (selectPage <= numPages && selectPage > 0) {
                // setPageActual(Number(selectPage));
                changePage(Number(selectPage));
              } else {
                console.log(selectPage);
                alert("The entry: " + selectPage + " is not valid");
              }
            }
          }}
        />
      </div>
    );
  }

  function ListAbilities() {
    if (abilities && numPages) {
      // console.log(pageActual);
      let numAbility = (Number(pageActual) - 1) * 30;
      return (
        <div className="grid gap-2 p-4 border bg-stone-300 boder-black w-[510px] text-center rounded-md  h-[1300px] divide-y-2 divide-black">
          {abilities.map((data, key) => {
            return (
              <div key={key} className="flex justify-between gap-2 ">
                <h3 className="text-xl font-medium">
                  {Number(key) + Number(numAbility)}.
                </h3>
                <a
                  className="text-xl font-medium hover:text-blue-500"
                  href={"/ability/" + data.name}
                >
                  {data.name}
                </a>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="grid gap-2 p-4 border bg-stone-300 boder-black w-[510px] text-center rounded-md  h-[1200px]">
          <h3 className="text-2xl font-medium text-center">Cargando...</h3>
        </div>
      );
    }
  }

  return (
    <div className="grid m-4 justify-self-center ">
      <div className="grid gap-4 place-items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-medium text-left">Buscar</h2>
          <input
            className="border-black border p-2 bg-white w-[200px] rounded-md opacity-90"
            placeholder="Ability Name"
            type="text"
            value={filterAbility}
            onChange={(e) => changeInput(NUmber(e.target.value))}
          ></input>
        </div>
        <ul>
          <PageChange />
        </ul>
        {showSpecificPage && <SpecificPage />}

        <ListAbilities />
        <PageChange />
      </div>
    </div>
  );
}
