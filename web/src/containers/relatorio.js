import React, { Component } from 'react';
import { GroupingState, IntegratedGrouping } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableGroupRow,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';
import moment from 'moment';
import Card from '../components/card';
import { Chip } from '@material-ui/core';

export default class Relatorio extends Component {
  state = {
    carregando: true,
    respostas: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/checklists/respostas');
      this.setState({ carregando: false, respostas: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { carregando, respostas } = this.state;

    if (!carregando) {
      return (
        <Card title="Relatório">
          <Grid
            rows={respostas}
            columns={[
              {
                name: 'descricao',
                title: 'Atividade'
              },
              {
                getCellValue: ({ posAtividade }) => posAtividade ? 'Pós-atividade' : 'Pré-atividade',
                name: 'posAtividade',
                title: 'Período'
              },
              {
                name: 'checklist',
                title: 'Checklist'
              },
              {
                getCellValue: ({ dtCadastro }) => moment(dtCadastro).format('DD/MM/YYYY HH:mm'),
                name: 'dtCadastro',
                title: 'Data'
              },
              {
                name: 'nomeCompleto',
                title: 'Funcionário'
              },
              {
                getCellValue: ({ simNao }) => (<Chip label={simNao ? 'Sim' : 'Não'} style={{ backgroundColor: simNao ? 'green' : 'red', color: '#fff' }} />),
                name: 'simNao',
                title: 'Realizada'
              },
              {
                name: 'observacao',
                title: 'Observação'
              }
            ]}
          >
            <GroupingState
              grouping={[
                { columnName: 'descricao' },
                { columnName: 'posAtividade' },
                { columnName: 'checklist' }
              ]}
            />
            <IntegratedGrouping />
            <Table />
            <TableHeaderRow />
            <TableGroupRow />
          </Grid>
        </Card>
      );
    } else return (<div>Carregando...</div>);
  }
}
