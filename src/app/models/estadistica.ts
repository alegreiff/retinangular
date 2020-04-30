export interface IEstadistica {
    id: number,
    mes: number,
    year: number,
    sesiones: number,
    kaltura: number,
    analytics: number,
    duracion_media: number,
    rebote: number,
    nuevas_sesiones: number,
    usuarios_wp: number,
    visitas_paginas: number,
    edad: Array<IEdad>,
    adquisicion: Array<IAdquisicion>,
    genero: Array<IGenero>,
    tecnologia: Array<ITecnologia>
}

interface IEdad {
    g1: number,
    g2: number,
    g3: number,
    g4: number,
    g5: number,
    g6: number
}
interface IAdquisicion {
    directa: number,
    social: number,
    organica: number,
    referida: number
}
interface IGenero {
    hombres: number,
    mujeres: number
}
interface ITecnologia {
    escritorio: number,
    movil: number,
    tablet: number
}
