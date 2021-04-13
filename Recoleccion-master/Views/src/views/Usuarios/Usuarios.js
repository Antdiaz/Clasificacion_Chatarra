import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, CardTitle } from 'reactstrap';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { config } from '../../utils/config';
import { callApi, callKrakenApi } from '../../utils/utils';

export default class Responsables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responseKraken: [],
    };
  }

  componentDidMount() {
    const urlWebService = `${config.UrlApiProject}usuario/getUsuariosRol`;
    const urlKrakenService = `${config.KrakenService}/${8}/${7}`;

    const paramsService = {
      columnas: 'ClaUsuario, NomUsuario, Email',
      condicion: "NomUsuario LIKE '%dario %' ORDER BY NomUsuario ASC",
      tipoEstructura: 5,
    };

    callApi(urlKrakenService, 'POST', paramsService, (res) => {
      this.setState({
        responseKraken: res,
      });
    });

    callApi(urlWebService, 'POST', null, (res) => {
      this.setState({
        response: res.data,
      });
    });
  }

  render() {
    const GridKrakenContent = (
      <DataGrid
        id="gridUsuarios"
        dataSource={this.state.responseKraken}
        keyExpr="ClaUsuario"
        height={600}
        showBorders={false}
        columnHidingEnabled
        columnAutoWidth={false}
        showColumnHeaders
        showColumnLines={false}
        showRowLines
        noDataText="Sin Registros"
        wordWrapEnabled
        rowAlternationEnabled={false}
      >
        <Column dataField="ClaUsuario" caption="Clave del Usuario" width={100} alignment="center" />
        <Column dataField="NomUsuario" caption="Nombre" width={200} />
        <Column dataField="Email" caption="Email" />
      </DataGrid>
    );

    const GridServicioContent = (
      <DataGrid
        id="gridServicio"
        dataSource={this.state.response}
        keyExpr="claUsuario"
        height={600}
        showBorders={false}
        columnHidingEnabled
        columnAutoWidth={false}
        showColumnHeaders
        showColumnLines={false}
        showRowLines
        noDataText="Sin Registros"
        wordWrapEnabled
        rowAlternationEnabled={false}
      >
        <Column dataField="claUsuario" caption="Clave del Usuario" width={100} alignment="center" />
        <Column dataField="nomUsuario" caption="Nombre" width={200} />
        <Column dataField="rol" caption="Rol" />
      </DataGrid>
    );

    const GridKrakenDisplay = () => <div>{GridKrakenContent}</div>;

    const GridServicioDisplay = () => <div>{GridServicioContent}</div>;

    return (
      <>
        <div className="content">
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <CardTitle>Peticiones a Servicio en Kraken</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <GridKrakenDisplay />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <CardTitle>Peticiones a Servicio en Net Core</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <GridServicioDisplay />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
