import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import env from '@beam-australia/react-env';
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
import AdminLayout from '../../layouts/Admin';

import {
  setSessionData,
  sessionAlive,
  logOut,
  showSweetAlert,
  callApi,
  getSessionItem,
} from '../../utils/utils';

class Patio extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      NumbUsuario: getSessionItem('NumUsuario'),
      Usuario: null,
      Patio: null,
      Lugarsesion:0,
      Lugaradd:null
      
    };
  }

  setUsuario = (Val) => this.setState(() => ({ Usuario: Val }));

  setLugarsesion = (Val) => this.setState(() => ({ Lugarsesion: Val }));

  setPatio = (Val) => this.setState(() => ({ Patio: Val }));

  setLugaradd = (Val) => this.setState(() => ({ Lugaradd: Val }));

  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setLugaradd(true)
    setSessionData({
      PatioEscogido: this.state.Lugarsesion
    });
  }

  onValueChanged = (e) => {
    this.setLugarsesion(e.target.value)

  }

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
      this.setUsuario(res.Result0[0].IdUsuario);
    });

    /* eslint-disable */
    const data2 = {
      parameters: '{"idClaUsuarioMod":' + this.state.Usuario + '}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    await callApi(urlKrakenPlanta, 'POST', data2, (res) => {
      this.setPatio(res.Result0);
    });

    if(this.state.Patio.length===1){
      this.setLugaradd(true)
      this.setLugarsesion(this.state.Patio[0].ClaUbicacion)
    }

  }

  componentWillUnmount() {
    document.body.classList.remove('bg-default');
  }


  render() {
    if (this.state.Lugarsesion >0 && this.state.Lugaradd ? this.state.Lugaradd === true :  getSessionItem('PatioEscogido')) {
      const url = getSessionItem('url', '/layout/Placas');
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
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText className="kar-input-login"></InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={this.onValueChanged} className="kar-input-login" multiple>
                          {this.state.Patio &&
                            this.state.Patio.map((pat,index) => (
                              <option
                                className="options"
                                value={pat.ClaUbicacion}
                                key={index}
                              >
                                {pat.NombreCorto.split("-").pop()}
                              </option>
                            ))}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        onClick={this.handleSubmit}
                        color="warning"
                        type="button"
                        style={{ width: '30%' }}
                      >
                        Ingresar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Patio;
