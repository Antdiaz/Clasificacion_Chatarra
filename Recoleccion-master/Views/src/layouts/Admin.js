import React from 'react';
// react library for routing
import { Route, Switch, Redirect } from 'react-router-dom';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes.js';
import { config } from '../utils/config';
import { callApi,getSessionItem } from '../utils/utils';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidenavOpen: false,
      Valores: null,
      Datos: null,
      Usuario: null,
      NumbUsuario: getSessionItem('NumUsuario'),
      Patio: null,
      editBoxValue: 26,
    };
  }


    setValores = (Val) => this.setState(() => ({Valores: Val}))

     setPatio = (Val) => this.setState(() => ({Patio: Val}))

     seteditBoxValue = (Val) => this.setState(() => ({editBoxValue: Val}))

     setDatos = (Val) => this.setState(() => ({Datos: Val}))

     setUsuario = (Val) => this.setState(() => ({Usuario: Val}))

   async componentDidMount() {

    const urlKrakenService = `${config.KrakenService}/${24}/${2}`;
    const urlKrakenPlanta = `${config.KrakenService}/${24}/${4}`;
    const urlKrakenUsuario=`${config.KrakenService}/${24}/${3}`;
    
/* eslint-disable */
    const data = {
      parameters: "{\"ClaUbicacion\":"+ this.state.editBoxValue +",\"Valor\":\"%%%\"}",
      tipoEstructura: 1
    };

    const data3 = {
      parameters: "{\"Usuario\":" + this.state.NumbUsuario +"}",
      tipoEstructura: 1
    };
/* eslint-enable */

    await callApi(urlKrakenUsuario, 'POST',data3,  (res) => {
      this.setUsuario(res.Result0[0].IdUsuario)
    });
    /* eslint-disable */
    const data2 = {
      parameters: "{\"ClaUsuarioMod\":"+this.state.Usuario+"}",
      tipoEstructura: 1
    };
    /* eslint-enable */
    await callApi(urlKrakenPlanta, 'POST',data2,  (res) => {
      this.setPatio(res.Result0)
    });

   await  callApi(urlKrakenService, 'POST',data,  (res) => {
        this.setValores(res.Result0)
    });
  };


  componentDidUpdate(e,prevState) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
    
    if (prevState.editBoxValue !== this.state.editBoxValue) {
      const urlKrakenService = `${config.KrakenService}/${24}/${2}`;
      /* eslint-disable */
      const data = {
        parameters: "{\"ClaUbicacion\":"+ this.state.editBoxValue +",\"Valor\":\"%%%\"}",
        tipoEstructura: 1
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST',data,  (res) => {
        this.setValores(res.Result0)
    });
    }
  }
  
  getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === '/layout') {
        if(prop.path === '/Placas'){
        return <Route path={prop.layout + prop.path} component={() => <prop.component Valores={this.state.Valores} Datos={this.state.Datos} setDatos={this.setDatos} Usuario={this.state.Usuario} editBoxValue={this.state.editBoxValue} />} key={key} />

        }
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;

      }

      return null;
    });

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  // toggles collapse between mini sidenav and normal
  toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen,
    });
  };

  getNavbarTheme = () =>
    this.props.location.pathname.indexOf('admin/alternative-dashboard') === -1 ? 'dark' : 'light';

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
        />
        <div className="main-content" ref="mainContent" onClick={this.closeSidenav}>
          <AdminNavbar {...this.props} Patio={this.state.Patio} editBoxValue={this.state.editBoxValue} seteditBoxValue={this.seteditBoxValue} />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/layout/Pedidos" />
          </Switch>
          <AdminFooter />
        </div>
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null}
      </>
    );
  }
}

export default Admin;
