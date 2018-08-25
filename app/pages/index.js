import React, {Component} from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from 'semantic-ui-react'
import DesktopContainer from "../components/DesktopContainer"
import Link from "next/link"


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Segment
    inverted
    textAlign='center'
    style={{ minHeight: 600, padding: '1em 0em' }}
    vertical
  >
    <Container text>
      <Header
        as='h1'
        content='Seguro Automotivo'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '2.0em',
        }}
      />
      <Header
        as='h2'
        content='Um seguro automotivo contra furto e roubo baseado em um contrato inteligente na rede Ethereum'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Link href="/contratos/existentes">
        <Button primary size='huge'>
          Participar de um contrato existente
          <Icon name='right arrow' />
        </Button>
      </Link>
    </Container>
  </Segment>
)

class Index extends Component {
  static async getInitialProps({pathname}) {
    return {pathname}
  }

  render () {
    return (
      <DesktopContainer pathname={this.props.pathname}>
        <HomepageHeading />
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={10}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Um seguro automotivo baseado em um contrato inteligente
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  O seguro automotivo é baseado em um contrato inteligente hospedado na rede Ethereum. 
                  Mensalmente, os segurados devem depositar a taxa mensal estabelecida no contrato para poderem pedir reembolso em caso de roubo ou furto.
                  Com um contrato inteligente você tem a garantia de que receberá o reembolso em caso de um sinistro.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={4}>
                <Image rounded size='small' src='/img/contract.png' />
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column floated='right' width={4}>
                <Image rounded size='small' src='/img/gps.png' />
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Um seguro automotivo conectado ao GPS do seu carro e que respeita sua privacidade
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Todos os carros segurados devem possuir um dispositivo GPS que envia a cada 10 minutos a localização do carro do segurado.
                  Não se preocupe com sua privacidade, o dispositivo envia os dados de forma criptografada. Não conseguiremos ter acesso a sua localização.
                  Para cada dia, o dispositivo gerará uma chave pública e privada única baseada no dia em questão e na sua chave privada master. 
                </p>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column width={10}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Pedido de reembolso simples e rápido
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Em caso de roubo ou furto, o segurado deve registrar um boletim de ocorrência informando o local e a hora do sinistro. O segurado também deve
                  fornecer ao seguro as chaves privadas para descriptografarmos os dados do GPS do carro. Apenas as chaves privadas do dia em que o sinistro ocorreu
                  e do dia anterior ao sinistro devem ser enviadas. Além disso, o segurado deve abrir um processo de reembolso em nosso site. 
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={4}>
                <Image rounded size='small' src='/img/money.png' />
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column floated='right' width={4}>
                <Image rounded size='small' src='/img/metamask.png' />
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Sua conta Ethereum segura
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  As chaves privadas de sua conta Ethereum estão localmente armazenadas no MetaMask. Além disso, nenhuma transação será executada
                  sem seu concentimento. Para instalar ou saber mais sobre o MetaMask acesse <a href="https://metamask.io/">https://metamask.io/</a>.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Link href="/contratos/novo">
                  <Button size='huge'>Criar um novo contrato</Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  "Finalmente eu posso dormir sem medo de ser furtado ou roubado"
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    <Image avatar size="tiny" src='/img/marco_aurelio.jpg' />
                    Marco Aurélio Prado
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  "Encontrei um seguro automotivo transparente e com um preço justo"
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar size="tiny" src='/img/ludmila.jpg' />
                  Ludmila Vidoca
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Criação do contrato
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Qualquer pessoa pode criar um contrato de seguro automotivo e convidar outras pessoas a se juntarem ao seguro.
              Basta clicar no link abaixo e preencher as informações do contrato.
            </p>
            <Link href="/contratos/novo">
              <Button as='a' size='large'>
                Criar um novo contrato
              </Button>
            </Link>
            <Divider/>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Adesão a um contrato existente
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Qualquer pessoa pode se juntar a um contrato existente, basta ela requisitar uma aprovação. A partir do momento em que a pessoa é
              aprovada para participar daquele contrato, ela deve estar em dia com as obrigações do contrato para pedir reembolso com sucesso.
              As obrigações se referem ao pagamento da taxa mensal e ao envio da localização do carro pelo dispositivo GPS instalado no carro.
            </p>
            <Link href="/contratos/existentes">
              <Button as='a' size='large'>
                Participar de um contrato existente
              </Button>
            </Link>
            <Divider/>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Administração dos seus contratos
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Ao criar ou aderir a um contrato você pode efetuar algumas ações: como aprovar a entrada de novo segurado no contrato ou 
              criar uma requisição de pedido de reembolso.
            </p>
            <Link href="/contratos/meus">
              <Button as='a' size='large'>
                Administrar meus contratos
              </Button>
            </Link>
          </Container>
        </Segment>
      </DesktopContainer>
    );
  }
}

export default Index;
