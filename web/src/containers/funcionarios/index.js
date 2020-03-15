import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Card from '../../components/card';

export default class Funcionarios extends Component {
  state = {
    carregando: true,
    funcionarios: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/funcionarios');
      this.setState({ funcionarios: response.data, carregando: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { carregando, funcionarios } = this.state;

    if (!carregando) {
      return (
        <Card
          actionComponent={
            <Button
              color="secondary"
              variant="contained"
              onClick={() => this.props.history.push('/funcionarios/cadastro')}
            >
              Novo Funcionário
            </Button>
          }
          title="Funcionários"
        >
          <DataTable
            columns={[
              {
                name: 'Nome Completo',
                selector: 'nomeCompleto'
              },
              {
                name: 'CPF',
                selector: 'cpf'
              }
            ]}
            data={funcionarios}
            noHeader
          />
        </Card>
      );
    } else return (<div>Carregando...</div>);
  }
}
