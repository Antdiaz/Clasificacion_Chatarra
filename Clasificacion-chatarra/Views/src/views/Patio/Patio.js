import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import AuthHeader from 'components/Headers/AuthHeader';
import { config } from '../../utils/config';
import AdminLayout from '../../layouts/Controller';

import {
  setSessionData,
  callApi,
  getSessionItem,
  logOut,
} from '../../utils/utils';

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class Patio extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      NumbUsuario: getSessionItem('Usuario'),
      Usuario: null,
      Patio: null,
      Lugarsesion:0,
      Lugaradd:null,
      TipoUbicacion:null
      
    };
  }

  setUsuario = (Val) => this.setState(() => ({ Usuario: Val }));

  setLugarsesion = (Val) => this.setState(() => ({ Lugarsesion: Val }));

  setTipoUbicacion = (Val) => this.setState(() => ({ TipoUbicacion: Val }));

  setPatio = (Val) => this.setState(() => ({ Patio: Val }));

  setLugaradd = (Val) => this.setState(() => ({ Lugaradd: Val }));

  // Función para Selección de patio al enter
  handleSubmit = (e) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = /* eslint-disable */ yyyy + '-' + mm + '-' + dd /* eslint-enable */;
    e.preventDefault();
    if(this.state.Lugarsesion>0){
    this.setLugaradd(true)
    setSessionData({
      TipoPatio: this.state.TipoUbicacion,
      PatioEscogido: this.state.Lugarsesion,
      Año: yyyy,
      Hoy: today,
      Dia: today
    }
    );}
  }


  // Función para leer patio seleccionado
  onValueChanged = (e) => {
    this.setLugarsesion(e.target.value.replace(/^\D+|\D.*$/g, ""))
    this.setTipoUbicacion(e.target.value.replace(/.*\D(?=\d)|\D+$/g, ""))
  }

  // Función para correr los servicios antes del render
  // Servicios utilizados 35 -> Datos Usuario  36 -> Patios por Usuario
  async componentDidMount() {
    document.body.classList.add('bg-default');
    const urlKrakenPlanta = `${config.KrakenService}/${24}/${36}`;
    const urlKrakenUsuario = `${config.KrakenService}/${24}/${35}`;

    /* eslint-disable */

    const data3 = {
      parameters: '{"Usuario":' + this.state.NumbUsuario + '}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    await callApi(urlKrakenUsuario, 'POST', data3, (res) => {
      console.log('adios');
      cookies.set('NumUsuario',res.Result0[0].IdUsuario, { path: '/' })
      this.setUsuario(res.Result0[0].IdUsuario);
    });

    /* eslint-disable */
    const data2 = {
      parameters: '{"idClaUsuarioMod":' + this.state.Usuario + '}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if(this.state.Patio===null && this.state.Usuario!==null)
    await callApi(urlKrakenPlanta, 'POST', data2, (res) => {
      console.log('PatioPatio')
      this.setPatio(res.Result0);
    });

    if(this.state.Patio && this.state.Patio.length===1){
      this.setLugaradd(true)
      this.setLugarsesion(this.state.Patio[0].ClaUbicacion)
      this.setTipoUbicacion(this.state.Patio[0].TipoUbicacion)
    }

  }

  componentWillUnmount() {
    document.body.classList.remove('bg-default');
  }


  render() {
    if (this.state.Lugarsesion >0 && this.state.Lugaradd ? this.state.Lugaradd === true :  getSessionItem('PatioEscogido')) {
      const url = getSessionItem('url', '/Clasificacion-Chatarra/Placas');
      document.body.classList.remove('bg-default');
      // Primer componente al que se va a redirigir después de iniciar sesión
      return (
        <Router history={this.props.history}>
          <Route path="/" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to={url} />
        </Router>
      );
    }

    return (
      <div>
        <AuthHeader />
        <Container className="mt--7 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="7">
              <Card className="card-login bg-secondary border-0 mb-0">
                <CardBody className="card-login px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup
                      className={classnames('mb-3', {
                        focused: this.state.focusedEmail,
                      })}
                    >
                      <div className="mb-2">
                        <span className="kar-label">Seleccionar Ubicación</span>
                      </div>
                      {/* Cuadro de selección de Ubicación */}
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="kar-input-login"></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={this.onValueChanged} className="kar-input-login" multiple>
                          {this.state.Patio &&
                            this.state.Patio.map((pat,index) => (
                              /* eslint-disable */
                              <option
                                className="options"
                                value={'{"ClaUbicacion":'+ pat.ClaUbicacion +',"ClaTipoUbicacion":' +pat.ClaTipoUbicacion +'}'}
                                key={index}
                              >
                                {pat.NombreCorto.split("-").pop()}
                              </option>
                              /* eslint-enable */
                            ))}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        onClick={this.handleSubmit}
                        color="warning"
                        type="button"
                        style={{ width: 'max-content' }}
                      >
                        Ingresar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Col xs="6">
                <a className="text-light" href="/" onClick={logOut}>
                  <small>&#8592; Regresar</small>
                </a>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Patio;
