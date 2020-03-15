import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { AccountCircle, Info, Lock } from '@material-ui/icons';
import InputMask from 'react-input-mask';
import { Formik } from 'formik';

export default class FuncionarioFormulario extends Component {
  render() {
    const { onSubmit, processando } = this.props;

    return (
      <Formik
        initialValues={{
          cpf: this.props.cpf || '',
          nomeCompleto: this.props.nomeCompleto || '',
          senha: this.props.senha || ''
        }}
        isInitialValid={false}
        onSubmit={onSubmit}
      >
        {
          (props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid alignItems="flex-end" container spacing={1}>
                <Grid item>
                  <AccountCircle fontSize="large" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    onChange={(e) => {
                      props.setFieldTouched('nomeCompleto', true, false);
                      props.setFieldValue('nomeCompleto', e.target.value);
                    }}
                    required
                    value={props.values.nomeCompleto}
                  />
                </Grid>
                <Grid item>
                  <Info fontSize="large" />
                </Grid>
                <Grid item xs>
                  <InputMask
                    id="cpf"
                    mask="999.999.999-99"
                    onChange={(e) => {
                      props.setFieldTouched('cpf', true, false);
                      props.setFieldValue('cpf', e.target.value);
                    }}
                    required
                    value={props.values.cpf}
                  >
                    {
                      (inputProps) => (
                        <TextField
                          {...inputProps}
                          disableUnderline
                          fullWidth
                          label="CPF"
                          type="tel"
                        />
                      )
                    }
                  </InputMask>
                </Grid>
              </Grid>
              <Grid alignItems="flex-end" container spacing={1}>
                <Grid item>
                  <Lock fontSize="large" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    label="Senha"
                    onChange={(e) => {
                      props.setFieldTouched('senha', true, false);
                      props.setFieldValue('senha', e.target.value);
                    }}
                    type="password"
                    value={props.values.senha}
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
