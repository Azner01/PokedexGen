import ListPokGen1 from "@components/elements/ListPokGen1";

export default function PagePrincipal() {
  return (
    <div className="grid gap-2 p-6 align-middle xl:ml-16 ">
      <h1 className="text-4xl font-medium">Lista de pokemones</h1>
      <ListPokGen1 />
    </div>
  );
}
