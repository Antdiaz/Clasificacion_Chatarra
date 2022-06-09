export const months = [
  { monthID: -1, name: 'Todos' },
  { monthID: 1, name: 'Enero' },
  { monthID: 2, name: 'Febrero' },
  { monthID: 3, name: 'Marzo' },
  { monthID: 4, name: 'Abril' },
  { monthID: 5, name: 'Mayo' },
  { monthID: 6, name: 'Junio' },
  { monthID: 7, name: 'Julio' },
  { monthID: 8, name: 'Agosto' },
  { monthID: 9, name: 'Septiembre' },
  { monthID: 10, name: 'Octubre' },
  { monthID: 11, name: 'Noviembre' },
  { monthID: 12, name: 'Diciembre' },
]

export const years = [
  {
    yearID: new Date().getFullYear(),
    name: `${new Date().getFullYear()}`
  },
  {
    yearID: new Date().getFullYear() - 1,
    name: `${new Date().getFullYear()-1}`
  },
  {
    yearID: new Date().getFullYear() - 2,
    name: `${new Date().getFullYear()-2}`
  },
  {
    yearID: new Date().getFullYear() - 3,
    name: `${new Date().getFullYear()-3}`
  }
]

export const turnos = [
  { turnoID: 0, name: 'Todos' },
  { turnoID: 1, name: 'Matutino' },
  { turnoID: 2, name: 'Vespertino' },
  
]



