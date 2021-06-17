
import Consulta from 'views/Consulta_Placas/Consulta_Placas.js';
import Reportes from 'views/Reportes/Reportes'

const routes = [
  {
    path: '/Placas',
    name: 'Consultar Placas',
    icon: 'fa fa-search',
    component: Consulta,
    layout: '/Clasificacion-Chatarra',
  },
  // {
  //   path: '/Reportes',
  //   name: 'Reportes',
  //   icon:'fa fa-clipboard-list',
  //   component: Reportes,
  //   layout: '/Clasificacion-Chatarra',
  // },
];

export default routes;
