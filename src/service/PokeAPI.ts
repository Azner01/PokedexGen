const PokeAPI = "https://pokeapi.co/api/v2/pokemon";

export function getPokemon({url}){
    return new Promise((resolve, reject)=>{
        fetch(url).then(res=>res.json()).then(data=>{
            resolve(data)
        })
    })
}

export async function getAllPokemon(){
    let gen1 = PokeAPI+"?offset=0&limit=151";
    return new Promise((resolve, reject)=>{
        fetch(gen1).then(res=>res.json()).then(data=>{
            resolve(data)
        })
    })
}

export async function getPokemonID(id){
    let poke = PokeAPI + "/" + id;
    return new Promise((resolve, reject)=>{
        fetch(poke).then(res => res.json()).then(data=>{
            resolve(data)
        })
    })
}

export async function getMorePokemonInfo(id){
    let poke = PokeAPI + "-species/" + id +"/";
    return new Promise((resolve, reject)=>{
        fetch(poke).then(res => res.json()).then(data=>{
            resolve(data)
        })
    })
}