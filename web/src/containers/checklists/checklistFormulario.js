import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import {
  AddCircle,
  BrightnessMedium,
  Build,
  Check,
  RemoveCircle
} from '@material-ui/icons';
import { Formik } from 'formik';
import axios from 'axios';

const Checklist = (props) => {
  return (
    <Grid
      alignItems="flex-end"
      className="mt-2"
      container
      spacing={1}
    >
      <Grid item>
        <Check fontSize="large" />
      </Grid>
      <Grid item xs>
        <TextField
          disabled={props.disabled}
          fullWidth
          label="Checklist"
          onChange={props.onChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              props.onAddChecklist();
            }
          }}
          required
          value={props.value}
        />
      </Grid>
      <Grid item>
        {
          props.onAddChecklist && (
            <IconButton onClick={props.onAddChecklist}>
              <AddCircle color="primary" />
            </IconButton>
          )
        }
        {
          !props.hideRemove && props.onRemoveChecklist && (
            <IconButton onClick={() => props.onRemoveChecklist(props.value)}>
              <RemoveCircle color="error" />
            </IconButton>
          )
        }
      </Grid>
    </Grid>
  );
}

export default class ChecklistFormulario extends Component {
  state = {
    carregando: true,
    atividades: [],
    checklist: ''
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/api/atividades');
      this.setState({ atividades: response.data, carregando: false });
    } catch (error) {
      console.log(error);
    }
  }

  handleAddChecklist = (formikProps) => {
    const { checklist } = this.state;
    const { checklists } = formikProps.values;
    if (!checklists.includes(checklist) && checklist.length > 0) {
      checklists.push(checklist);
      formikProps.setFieldValue('checklists', checklists)
      this.setState({ checklist: '' });
      console.log(formikProps.values.checklists)
    }
    return;
  }

  handleRemoveChecklist = (formikProps, checklist) => {
    let { checklists } = formikProps.values;
    checklists = checklists.filter((c) => c !== checklist);
    formikProps.setFieldValue('checklists', checklists)
  }

  render() {
    const { onSubmit, processando } = this.props;
    const { atividades, carregando, checklist } = this.state;

    if (!carregando) {
      return (
        <Formik
          initialValues={{
            atividadeId: this.props.atividadeId || '',
            checklists: this.props.checklists || [],
            observacao: this.props.observacao || '',
            posAtividade: this.props.posAtividade || false
          }}
          onSubmit={onSubmit}
        >
          {
            (props) => (
              <form onSubmit={props.handleSubmit}>
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
                        onChange={(e) => {
                          props.setFieldTouched('atividadeId', true, false);
                          props.setFieldValue('atividadeId', e.target.value);
                        }}
                        required
                        value={props.values.atividadeId}
                      >
                        {
                          atividades.map((atividade) => (
                            <MenuItem value={atividade.id}>
                              {atividade.descricao}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    alignItems="flex-end"
                    className="mt-2"
                    container
                    spacing={1}
                  >
                    <Grid item>
                      <BrightnessMedium fontSize="large" />
                    </Grid>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <InputLabel id="atividade-2">Período</InputLabel>
                        <Select
                          labelId="atividade-2"
                          onChange={(e) => {
                            props.setFieldTouched('posAtividade', true, false);
                            props.setFieldValue('posAtividade', e.target.value);
                          }}
                          required
                          value={props.values.posAtividade}
                        >
                          <MenuItem value={false}>
                            Antes de iniciar o trabalho
                          </MenuItem>
                          <MenuItem value={true}>
                            Ao terminar o trabalho
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {
                    props.values.checklists.map((checklist, index) => (
                      <Checklist
                        key={index}
                        disabled={true}
                        onRemoveChecklist={(value) => this.handleRemoveChecklist(props, value)}
                        value={checklist}
                      />
                    ))
                  }
                  <Checklist
                    onChange={(e) => this.setState({ checklist: e.target.value })}
                    onAddChecklist={() => this.handleAddChecklist(props)}
                    value={checklist}
                  />
                </Grid>
                <div className="mt-3 text-center">
                  <Button
                    color="primary"
                    disabled={!props.isValid || processando}
                    onClick={() => {
                      this.setState({ checklist: '' });
                      props.handleSubmit()
                    }}
                    variant="contained"
                  >
                    Cadastrar
                  </Button>
                </div>
              </form>
            )
          }
        </Formik>
      );
    } else return (<div>Carregando...</div>);
  }
}
