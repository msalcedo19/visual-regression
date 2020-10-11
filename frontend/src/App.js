import React from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col, Image} from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';

class Report extends React.Component{

    constructor(props) {
        super();
        this.state = {
            test: props.test
        }
    }

  render() {
    return <Row>
        <Col className="box">
            <Col className="title"><strong>Fecha del Reporte</strong></Col>
            <Col>{`${Date(Date.now().toString())}`}</Col>
        </Col>
        <Col className="col-image">
          <Col className="title"><strong>Imagen Base</strong></Col>
            <Image className="image" src={this.state.test.imagen_base ? URL.createObjectURL(this.state.test.imagen_base): ""} rounded/>
        </Col>
        <Col className="col-image">
            <Col className="title"><strong>Imagen Modificada</strong></Col>
          <Image className="image" src={this.state.test.imagen_mod ? URL.createObjectURL(this.state.test.imagen_mod): ""} rounded />
        </Col>
        <Col className="col-image">
          <Col className="title"><strong>Diferencias</strong></Col>
            <Image className="image" src={this.state.test.imagen_diff ? URL.createObjectURL(this.state.test.imagen_diff): ""} rounded />
        </Col>
        <Col className="col-data">
            <Col className="title"><strong>Información Importante</strong></Col>
            <Col><i>isSameDimensions:</i> {`${this.state.test['data'].isSameDimensions}`}</Col>
            <Col><i>dimensionDifference:</i>
                <ul>
                    <li>width: {this.state.test['data'].dimensionDifference.width}</li>
                    <li>height: {this.state.test['data'].dimensionDifference.height}</li>
                </ul>
            </Col>
            <Col><i>rawMisMatchPercentage:</i> {this.state.test['data'].rawMisMatchPercentage}</Col>
            <Col><i>misMatchPercentage:</i> {this.state.test['data'].misMatchPercentage}</Col>
            <Col><i>diffBounds:</i>
                <ul>
                <li>Top: {this.state.test['data'].diffBounds.top}</li>
                <li>Left: {this.state.test['data'].diffBounds.left} </li>
                <li>Bottom: {this.state.test['data'].diffBounds.bottom} </li>
                <li>Right: {this.state.test['data'].diffBounds.right}</li>
                </ul>
            </Col>
        </Col>
      </Row>
  }
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        tests: [],
        loading: false
    }

    this.generate_report = this.generate_report.bind(this);
  }

  generate_report(){
      let data_tests = {}
      this.setState({
          loading: true
      });

      fetch('http://localhost:3001/');
      setTimeout(()=> fetch('http://localhost:3001/images/img1.png',
          {
              method: 'GET'
          }).then(data => data.blob())
          .then(img1 => {
              data_tests['imagen_base'] = img1

              fetch('http://localhost:3001/images/img2.png',
                  {
                      method: 'GET'
                  }).then(data => data.blob())
                  .then(img2 => {
                      data_tests['imagen_mod'] = img2

                      fetch('http://localhost:3001/diff',
                          {
                              method: 'GET'
                          }).then(data => data.json())
                          .then(json => {
                              data_tests['data'] = json
                              console.log(json.isSameDimensions)

                              fetch('http://localhost:3001/images/img3.png',
                                  {
                                      method: 'GET'
                                  }).then(data => data.blob())
                                  .then(img3 => {
                                      data_tests['imagen_diff'] = img3

                                      this.setState({
                                          tests: [...this.state.tests, data_tests],
                                          loading: false
                                      });
                                  });
                          });
                  });

          }), 20000)


  }

  render() {
    return <Container fluid>
        <Row className="report-btn justify-content-center alig-items-center">
            <Button onClick={this.generate_report} variant="primary">Generar Reporte</Button>
        </Row>

        {this.state.tests.map((test, index) => <Report key={index} test={test}/>)}

        <Row className="report-btn justify-content-center alig-items-center">
            {this.state.loading ? <CircularProgress /> :<></>}
        </Row>
    </Container>
  }
}

export default App;
