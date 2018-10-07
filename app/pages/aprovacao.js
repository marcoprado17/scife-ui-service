import React, {Component} from 'react'
import {
  Segment,
  Card,
  Button,
  Divider
} from 'semantic-ui-react'
import DesktopContainer from "../components/DesktopContainer"
import LatLong from "../components/LatLong"

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    return {
      pathname
    }
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  async componentDidMount(){
    this.setState({
        requests: [
            {
                createdBy: "0xfg2323123vhgv21",
                creationTime: "08/09/2017",
                aproxTimeOfTheft: "08/08/2018 19:26",
                theftLocation: [-23.192226, -45.876944],
                vehiclePlate: "ABC-1234",
                boConfirmed: false
            },
            {
                createdBy: "0xfg2323123vhgv21",
                creationTime: "08/09/2017",
                aproxTimeOfTheft: "08/08/2018 19:26",
                theftLocation: [-23.192226, -45.876944],
                vehiclePlate: "ABC-1234",
                boConfirmed: false
            }
        ]
    });
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em'}} vertical>
            { this.state.requests &&
              this.state.requests.map(function(request, idx){
              return (
                <Card style={{width: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
                  <Card.Content>
                    <Card.Header style={{marginTop: '8px'}}>Request {idx}</Card.Header>
                    <Divider/>
                    <b>Criador: </b>{request.createdBy}<br/>
                    <b>Data e hora da criação da requisição: </b>{request.createdBy}<br/>
                    <b>Data e hora aproximada do roubo: </b>{request.creationTime}<br/>
                    <b>Localização do roubo: </b><LatLong lat={request.theftLocation[0]} long={request.theftLocation[1]}/><br/>
                    <b>Placa do veículo: </b>{request.vehiclePlate}<br/>
                    <div style={{textAlign: 'right'}}>
                      <Button type='submit' disabled={request.boConfirmed}>Aprovar</Button>
                    </div>
                  </Card.Content>
                </Card>
              )
            })}
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
