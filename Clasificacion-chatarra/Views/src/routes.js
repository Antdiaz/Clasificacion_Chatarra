
import Consulta from 'views/Consulta_Placas/Consulta_Placas.js';
import Reportes from 'views/Reportes/Reportes'
import PantallaGeneral from 'views/Reportes_Uso/PantallaGeneral';


const routes = [
  {
    path: '/Placas',
    name: 'Consultar Placas',
    icon: 'fa fa-search',
    component: Consulta,
    layout: '/Clasificacion-Chatarra',
  },
  {
    path: '/Reportes',
    name: 'Reportes',
    icon:'fa fa-clipboard-list',
    component: Reportes,
    layout: '/Clasificacion-Chatarra',
  },
  {
    path: '/Reportes_Uso',
    name: '',
    icon: 'fas fa-chart-bar',
    component: PantallaGeneral,
    layout: '/Clasificacion-Chatarra',
  }
];

export default routes;
