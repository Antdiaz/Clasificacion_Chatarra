/*eslint-disable*/
import React from 'react';

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

class Calendar extends React.Component {
  render() {
    return (
      <>
        <Container fluid>
          <footer className="footer pt-0" style={{marginTop:"20px"}}>
            <Row className="align-items-center justify-content-lg-between">
              <Col lg="6">
                <div className="copyright text-center text-lg-left text-muted">
                  © {new Date().getFullYear()}{' '}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.deacero.com/?ads_adid=101194145277&ads_cmpid=10071721411&ads_creative=435567040006&ads_matchtype=e&ads_network=g&ads_targetid=aud-932638569771:kwd-311533555585&ttv=2&utm_campaign=Institucional%20-%20Deacero&utm_medium=ppc&utm_source=adwords&utm_term=deacero"
                    target="_blank"
                  >
                    DeAcero
                  </a>
                </div>
              </Col>
              <Col lg="6">
                <Nav className="nav-footer justify-content-center justify-content-lg-end">
                </Nav>
              </Col>
            </Row>
          </footer>
        </Container>
      </>
    );
  }
}

export default Calendar;
