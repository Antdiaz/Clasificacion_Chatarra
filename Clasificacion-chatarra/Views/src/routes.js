
import Consulta from 'views/Consulta_Placas/Consulta_Placas.js';

const routes = [
  {
    path: '/Placas',
    name: 'Consultar Placas',
    icon: 'fa fa-search',
    component: Consulta,
    layout: '/Clasificacion-Chatarra',
  },
];

export default routes;