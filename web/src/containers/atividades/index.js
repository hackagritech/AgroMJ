import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Card from '../../components/card';

export default class Atividades extends Component {
  state = {
    atividades: [],
    carregando: true
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/atividades');
      this.setState({ atividades: response.data, carregando: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { atividades, carregando } = this.state;

    if (!carregando) {
      return (
        <Card
          actionComponent={
            <Button
              color="secondary"
              variant="contained"
              onClick={() => this.props.history.push('/atividades/cadastro')}
            >
              Nova atividade
            </Button>
          }
          title="Atividades"
        >
          <DataTable
            columns={[
              {
                name: 'Descrição',
                selector: 'descricao'
              },
              {
                name: 'Observação',
                selector: 'observacao'
              }
            ]}
            data={atividades}
            noHeader
          />
        </Card>
      );
    } else return (<div>Carregando...</div>);
  }
}
