import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Description, Visibility } from '@material-ui/icons';
import { Formik } from 'formik';

export default class AtividadeFormulario extends Component {
  render() {
    const { onSubmit, processando } = this.props;

    return (
      <Formik
        initialValues={{
          descricao: this.props.descricao || '',
          observacao: this.props.observacao || ''
        }}
        isInitialValid={false}
        onSubmit={onSubmit}
      >
        {
          (props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid alignItems="flex-end" container spacing={1}>
                <Grid item>
                  <Description fontSize="large" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    label="Descrição"
                    onChange={(e) => {
                      props.setFieldTouched('descricao', true, false);
                      props.setFieldValue('descricao', e.target.value);
                    }}
                    required
                    value={props.values.descricao}
                  />
                </Grid>
              </Grid>
              <Grid alignItems="flex-end" container spacing={1}>
                <Grid item>
                  <Visibility fontSize="large" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    label="Observação"
                    onChange={(e) => {
                      props.setFieldTouched('observacao', true, false);
                      props.setFieldValue('observacao', e.target.value);
                    }}
                    value={props.values.observacao}
                  />
                </Grid>
              </Grid>
              <div className="mt-3 text-center">
                <Button
                  color="primary"
                  disabled={!props.isValid || processando}
                  onClick={() => props.handleSubmit()}
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
  }
}
