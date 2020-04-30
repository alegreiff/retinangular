export interface  IFilme{
    id: number,
    titulo: string,
    year: number,
    genero: string,
    formato: string,
    pais: string,
    temporadas: Array<ITemporada>,
    visitas: Array<IVisita>,
    sumvisitas?: number,
    visitas16?: number,
    visitas17?: number,
    visitas18?: number,
    visitas19?: number,
    visitas20?: number,
    activa?: string,
    sumdias?: number,
    promedio?: number
 
 }
 
 interface ITemporada {
     entrada: string,
     salida: string,
     id: number,
     diasalaire: number
 }
 
 interface IVisita {
     year: number,
     month: number,
     visitas: number
 }
 
 
 
 
 export interface IPais {
    nombre: string,
    url: string,
    tipo?: number
    
  }