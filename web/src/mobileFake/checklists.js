import React, { Component } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
} from '@material-ui/core';
import { Build } from '@material-ui/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from '../components/card';

export default class Checklists extends Component {
  state = {
    atividadeId: '',
    atividadeObservacao: '',
    atividades: [],
    carregando: true,
    checklistsAntes: [],
    checklistsDepois: [],
    funcionarioId: '',
    processando: false,
    respostas: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/atividades');
      this.setState({
        atividades: response.data,
        carregando: false,
        funcionarioId: this.props.location.state.id
      });
    } catch (error) {
      console.log(error);
    }
  }

  buscaChecklists = async () => {
    try {
      this.setState({ processando: true });
      const { atividadeId } = this.state;
      const response = await axios.get(`http://localhost:5000/api/checklists/${atividadeId}`);
      const { data } = response;
      data.forEach((item) => {
        if (item.posAtividade) {
          this.setState({
            atividadeObservacao: item.atividade.observacao,
            checklistsDepois: item.checklists,
            processando: false
          });
        } else {
          this.setState({
            atividadeObservacao: item.atividade.observacao,
            checklistsAntes: item.checklists,
            processando: false
          });
        }
      })
    } catch (error) {
      throw error;
    }
  }

  handleOnCheck = async (value, checklistId) => {
    const { funcionarioId, respostas } = this.state;
    const simNao = value === 'sim' ? true : false;
    let observacao = null;
    if (!simNao) {
      observacao = window.prompt('Por que você está marcado como checklist não realizado?');
    }
    this.setState({
      respostas: this.removeDuplicates([
        ...respostas,
        {
          id: checklistId,
          funcionarioId,
          observacao,
          simNao
        }
      ], 'id')
    });
  }

  handleOnSelect = async (e) => {
    try {
      this.setState({ atividadeId: e.target.value }, async () => {
        await this.buscaChecklists();
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderChecklists = (checklists, title) => (
    <table cellSpacing="2" className="mt-2">
      <tr>
        <th>{title}</th>
        <th></th>
      </tr>
      {
        checklists.map(({ checklist, id }) => (
          <tr key={id}>
            <td>{checklist}</td>
            <td>
              <FormControl component="fieldset">
                <RadioGroup onChange={(_, value) => this.handleOnCheck(value, id)} row>
                  <FormControlLabel
                    value="sim"
                    control={<Radio color="primary" />}
                    label="Sim"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio color="primary" />}
                    label="Não"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </td>
          </tr>
        ))
      }
    </table>
  )

  responder = async () => {
    try {
      this.setState({ processando: true });
      const { respostas } = this.state;
      const response = await axios.put(`http://localhost:5000/api/checklists/responder`, { respostas });
      this.setState({
        atividadeId: '',
        atividadeObservacao: '',
        checklists: [],
        processando: false
      })
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      this.setState({ processando: false });
      toast.error(error.response.data.message);
      throw error;
    }
  }

  removeDuplicates = (arr, prop) => {
    return arr.filter((obj, pos, ar) => {
      return ar.map(mapObj => mapObj[prop]).lastIndexOf(obj[prop]) === pos;
    });
  }

  render() {
    const {
      atividadeId,
      atividadeObservacao,
      atividades,
      carregando,
      checklistsAntes,
      checklistsDepois,
      processando
    } = this.state;

    if (!carregando) {
      return (
        <div style={{ padding: 20 }}>
          <Card title="Checklists de Atividades">
            <Grid
              alignItems="flex-end"
              className="mt-2"
              container
              spacing={1}
            >
              <Grid item>
                <Build fontSize="large" />
              </Grid>
              <Grid item xs>
                <FormControl fullWidth>
                  <InputLabel id="atividade">Atividade</InputLabel>
                  <Select
                    labelId="atividade"
                    onChange={this.handleOnSelect}
                    required
                    value={atividadeId}
                  >
                    {
                      atividades.map((atividade) => (
                        <MenuItem key={atividade.id} value={atividade.id}>
                          {atividade.descricao}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {
              !processando && atividadeObservacao && (
                <Typography className="mt-1 py-2" variant="h6" style={{ color: 'red' }}>
                  {atividadeObservacao}
                </Typography>
              )
            }
            {
              checklistsAntes.length >= 1 && (
                <>
                  {this.renderChecklists(checklistsAntes, 'Checklist pré-atividade')}
                  {this.renderChecklists(checklistsDepois, 'Checklist pós-atividade')}
                  <div className="mt-3 text-center">
                    <Button
                      color="primary"
                      disabled={processando}
                      onClick={this.responder}
                      variant="contained"
                    >
                      Salvar
                    </Button>
                  </div>
                </>
              )
            }
            {
              processando && (
                <CircularProgress />
              )
            }
          </Card>
        </div>
      );
    } else return (<div>Carregando...</div>);
  }
}
