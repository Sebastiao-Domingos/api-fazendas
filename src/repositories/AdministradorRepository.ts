export type AdministradorData = {
    id : string,
    email : string
    nome : string
    senha : string
}

export type AdministradorDataUpdade = {
    email? : string
    nome? : string
    senha? : string
}

export interface AdministradorRepository {
    add :( data : AdministradorData )=> Promise<AdministradorData>,
    get :(admin_id : string) => Promise<AdministradorData>,
    getAll : () => Promise<AdministradorData[]>,
    delete : ( admin_id : string ) => Promise<AdministradorData>,
    update : (admin_id : string, data : AdministradorDataUpdade) => Promise<AdministradorData>
}