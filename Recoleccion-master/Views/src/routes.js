import FormularioCaptura from './views/FormularioCaptura/FormularioCaptura.js';
import GridFiltros from './views/TablaFiltros/TablaFiltros.js';
import Usuarios from './views/Usuarios/Usuarios.js';
// import Tickets from "./views/Tickets/Tickets.js";
import Placas from './views/TicketsSimple/TicketsSimple.js';
import Personajes from './views/Personajes/Personajes';
import Favoritos from './views/Personajes/Favoritos';
import Consulta from 'views/Consulta/Consulta.js';


const routes = [
  // {
  //   path: '/Pedidos',
  //   name: 'Pedidos',
  //   icon: 'ni ni-shop text-primary',
  //   component:FormularioCaptura,
  //   layout: '/layout',
  // },
  // {
  //   path: '/Filtros',
  //   name: 'Filtros',
  //   icon: 'ni ni-shop text-primary',
  //   component: GridFiltros,
  //   layout: '/layout',
  // },
  // {
  //   path: '/Usuarios',
  //   name: 'Usuarios',
  //   icon: 'ni ni-shop text-primary',
  //   component: Usuarios,
  //   layout: '/layout',
  // },
  {
    path: '/Placas',
    name: 'Consultar Placas',
    icon: 'fa fa-search',
    component: Consulta,
    layout: '/layout',
  },
  // {
  //   path: '/Personajes',
  //   name: 'Personajes',
  //   icon: 'ni ni-shop text-primary',
  //   component: Personajes,
  //   layout: '/layout',
  // },
  // {
  //   path: '/Favoritos',
  //   name: 'Personajes favoritos',
  //   icon: 'ni ni-shop text-primary',
  //   component: Favoritos,
  //   layout: '/layout',
  // },
];

export default routes;
