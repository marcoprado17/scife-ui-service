import React, {Component} from 'react'
import {
  Segment,
  Form,
  Button,
  Input,
  Label,
  Card
} from 'semantic-ui-react'
import DesktopContainer from "../../components/DesktopContainer"

class CreateNewComponent extends Component {
  static async getInitialProps({pathname}) {
    return {pathname}
  }
  
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <Segment style={{ padding: '4em 0em', display: 'flex', justifyContent: 'center' }} vertical>
          <Card style={{width: '500px'}}>
            <Card.Content header="Novo Contrato"/>
            <Card.Content>
              <Form>
                <Form.Field>
                  <label>Nome do contrato</label>
                  <input/>
                </Form.Field>
                <Form.Field>
                  <label>Contribuição inicial</label>
                  <Input labelPosition='right' type='text'>
                    <Label basic>$</Label>
                    <input type='number' step='0.000000000000000001' min='0.000000000000000001'/>
                    <Label>eth</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Contribuição mensal</label>
                  <Input labelPosition='right' type='text'>
                    <Label basic>$</Label>
                    <input type='number' step='0.000000000000000001' min='0.000000000000000001'/>
                    <Label>eth</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Reembolso</label>
                  <Input labelPosition='right' type='text'>
                    <Label basic>$</Label>
                    <input type='number' step='0.000000000000000001' min='0.000000000000000001'/>
                    <Label>eth</Label>
                  </Input>
                </Form.Field>
                <Form.Field>
                  <label>Número máximo de participantes</label>
                  <input type='number' step='1' min='1'/>
                </Form.Field>
                <Form.Field>
                  <label>Percentagem mínima de votos para liberar reembolso</label>
                  <Input labelPosition='right' type='text'>
                    <input type='number' step='1' min='1' max='100'/>
                    <Label>%</Label>
                  </Input>
                </Form.Field>
                <div style={{textAlign: 'right'}}>
                  <Button type='submit'>Criar contrato</Button>
                </div>
              </Form>
            </Card.Content>
          </Card>
        </Segment>
      </DesktopContainer>
    )
  }
}

export default CreateNewComponent;
