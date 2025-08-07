export default function (word) {
  let name = word;
  let firstL = name[0].toUpperCase();
  let restL = name.slice(1);
  let Upperword = firstL + restL;
  return Upperword;
}
