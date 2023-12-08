import { randomUUID } from "crypto"

export class DatabaseMemory{
#Tenis = new Map()

list(search){
    return Array.from(this.#Tenis.entries()).map((TenisArray) =>{
    // acessando primeira posição
        const id = TenisArray[0]
        const data = TenisArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(tenis => {
        if (search){
            return tenis.Marca.includes(search)
        }
        return true
    })
}
create(tenis){
    const tenisId = randomUUID()
    this.#Tenis.set(tenisId, tenis)
}
update(id, tenis){
    this.#Tenis.set(id, tenis)
}
delete(id, tenis){
    this.#Tenis.delete(id, tenis)
}
}