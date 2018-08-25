import React, { Component } from 'react'
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Grid,
  List,
  Header,
  Divider
} from 'semantic-ui-react';
import Head from 'next/head';
import Link from "next/link";

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
      const { children } = this.props
      const { fixed } = this.state

      return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 80, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Link href="/">
                    <Menu.Item as='a' active={this.props.pathname === "/" ? true : false}>
                        Home
                    </Menu.Item>
                  </Link>
                  <Link href="/contratos/novo">
                    <Menu.Item as='a' active={this.props.pathname === "/contratos/novo" ? true : false}>
                        Criar um novo contrato
                    </Menu.Item>
                  </Link>
                  <Link href="/contratos/existentes">
                    <Menu.Item as='a' active={this.props.pathname === "/contratos/existentes" ? true : false}>
                        Participar de um contrato existente
                    </Menu.Item>
                  </Link>
                  <Link href="/contratos/meus">
                    <Menu.Item as='a' active={this.props.pathname === "/contratos/meus" ? true : false}>
                        Administrar meus contratos
                    </Menu.Item>
                  </Link>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
  
          {children}

            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                        <List link inverted>
                            <List.Item as='a'>Home</List.Item>
                            <List.Item as='a'>Criar um novo contrato</List.Item>
                            <List.Item as='a'>Participar de um contrato existente</List.Item>
                            <List.Item as='a'>Administrar meus contratos</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={10}>
                        <Header as='h4' inverted>
                            Disclaimer
                        </Header>
                        <p>
                            Esta aplicação não deve ser utilizada para fins comerciais. Ela foi feita como parte de trabalho de conclusão de curso de Engenharia de Computação.
                        </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider/>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Container>
                            <p style={{textAlign: "center"}}>
                                Feito por Marco Aurélio Prado dos Santos Vidoca (marco.pdsv@gmail.com)
                            </p>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </Responsive>
      )
    }
  }

  export default DesktopContainer;
