import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { GroupingState, IntegratedGrouping } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableGroupRow,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';
import Card from '../../components/card';

export default class Checklists extends Component {
  state = {
    carregando: true,
    checklists: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/checklists');
      this.setState({ carregando: false, checklists: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { checklists, carregando } = this.state;

    if (!carregando) {
      return (
        <Card
          actionComponent={
            <Button
              color="secondary"
              variant="contained"
              onClick={() => this.props.history.push('/checklists/cadastro')}
            >
              Novo Checklist
            </Button>
          }
          title="Checklists"
        >
          <Grid
            rows={checklists}
            columns={[
              {
                name: 'atividade.descricao',
                title: 'Atividade'
              },
              {
                name: 'checklists.checklist',
                title: 'Checklist'
              }
            ]}
          >
            <GroupingState
              grouping={[{ columnName: 'atividade.descricao' }]}
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
