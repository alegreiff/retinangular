export interface IPelicula {
    duracion: number;
    //formato: Formato;
    formato: string,
    genero: string;
    iid: number;
    pais: string;
    titulo: string;
    videoid?: string;
    wordpressId?: number;
    year: number;
    id?: string;
}
export enum Formato {
    Ficción, Documental
}

