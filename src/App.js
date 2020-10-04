import React from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Image} from 'react-bootstrap';
import './App.css';
import img from './logo192.png';
const cypress = require('cypress')

class Report extends React.Component{

  render() {
    return <div className="row">
        <Col>Fecha del Reporte</Col>
        <Col>
          <Col>Imagen Base</Col>
          <Image src={img} rounded />
        </Col>
        <Col>
          <Col>Imagen Modificada</Col>
          <Image src={img} rounded />
        </Col>
        <Col>
          <Col>Diferencias</Col>
          <Image src={img} rounded />
        </Col>
        <Col>
          <Col>Información Importante</Col>
          <Col>Informacion..................................</Col>
        </Col>
      </div>
  }
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tests: [1],
    }
  }

  generate_report(){
    cypress
        .run({
          spec: './cypress/integration/simple.spec.js',
        })
        .then((results) => {

        });

  }

  render() {
    return <Container fluid>
      <Button onClick={this.generate_report} variant="primary">Generar Reporte</Button>
      {this.state.tests.map(test => <Report/>)}
    </Container>
  }
}

export default App;
