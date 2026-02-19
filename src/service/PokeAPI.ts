const PokeAPI = "https://pokeapi.co/api/v2/";

export async function getPokemon(name){
    let gen1 = PokeAPI + "pokemon/" + name;
    // return new Promise((resolve, reject)=>{
    //     fetch(gen1).then(res=>res.json()).then(data=>{
    //         resolve(data)
    //     })
    // })
    try{
        const resp = await fetch(gen1)
        if(!resp.ok){
            throw new Error("No se encontro pokemon")
        }
        return await resp.json()

    } catch(error){
        console.error("Error en getPokemon: ",error)
        return null
    }
}

export async function getPokemonID(id){
    let poke = PokeAPI + "pokemon/" + id;
    try{
        const resp = await fetch(poke)
        if(!resp.ok){
            throw new Error("No se encontro pokemon") 
        }
        return await resp.json()
    } catch(error){
        console.error("Error en getPokemonID: ", error)
        return null
    }
}

export async function getAllPokemon(){
    let gen1 = PokeAPI+"pokemon/?offset=0&limit=151";
    try{
        const resp = await fetch(gen1)
        if(!resp.ok){
            throw new Error("No se encontro ningun pokemon")
        }
        return await resp.json()

    } catch(error){
        console.error("Error en getAllPokemon: ", error)
        return null
    }
}

export async function getMorePokemonInfo(id){
    let poke = PokeAPI + "pokemon-species/" + id +"/";
    try{
        const resp = await fetch(poke)
        if(!resp.ok){
            throw new Error("No se encontro ningun pokemon")
        }
        return await resp.json()

    } catch(error){
        console.error("Error en getMorePokemonInfo: ", error)
        return null
    }
}

export async function getEvolutionInfo(url){
    // let evolution = PokeAPI + "evolution-chain/"+id
    try{
        const resp = await fetch(url)
        if(!resp.ok){
            throw new Error ("No se encontro la información")
        }
        return await resp.json()

    }catch(error){
        console.error("Error en getEvolutionInfo:", error)
        return null
    }
}

export async function getAbilityInfo(name){
    let ability = PokeAPI + "/" + name
    try{
        const resp = await fetch(ability)
        if(!resp.ok){
            throw new Error("No se encontro ninguna abilidad")
        }
        return await resp.json()

    }catch(error){
        console.error("Error en getAbility: ", error)
        return null
    }

}