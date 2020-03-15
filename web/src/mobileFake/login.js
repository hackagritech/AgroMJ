import React, { Component } from 'react';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class Login extends Component {
  state = {
    cpf: '',
    processando: false,
    senha: ''
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      this.setState({ processando: true });
      const { cpf, senha } = this.state;
      const response = await axios.post('http://localhost:5000/api/funcionarios/login', {
        cpf,
        senha
      });
      this.setState({ processando: false });
      toast.success(response.data.message);
      this.props.history.push('/mobile/checklists', {
        id: response.data.id
      });
    } catch (error) {
      console.log(error);
      this.setState({ processando: false });
      toast.error(error.response.data.message);
    }
  }

  render() {
    const { cpf, processando, senha } = this.state;

    return (
      <Grid
        alignContent="center"
        container
        justify="center"
        style={{ minHeight: '100vh', padding: 10 }}
      >
        <Grid item xs="auto">
          <Card style={{ padding: 30 }}>
            <h5 style={{ padding: '10px 0' }}>Login</h5>
            <form onSubmit={this.handleSubmit}>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Grid alignItems="flex-end" container spacing={1}>
                    <Grid item>
                      <AccountCircle fontSize="large" />
                    </Grid>
                    <Grid item xs>
                      <InputMask
                        id="cpf"
                        mask="999.999.999-99"
                        onChange={(e) => this.setState({ cpf: e.target.value })}
                        required
                        value={cpf}
                      >
                        {
                          (inputProps) => (
                            <TextField
                              {...inputProps}
                              fullWidth
                              label="CPF"
                              type="tel"
                            />
                          )
                        }
                      </InputMask>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid alignItems="flex-end" container spacing={1}>
                    <Grid item>
                      <Lock fontSize="large" />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        label="Senha"
                        onChange={(e) => this.setState({ senha: e.target.value })}
                        type="password"
                        value={senha}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {
                  processando && (
                    <div style={{ alignSelf: 'center', paddingTop: 20, textAlign: 'center' }}>
                      <CircularProgress variant="indeterminate" />
                      <p>Aguarde...</p>
                    </div>
                  )
                }
                <div className="mt-3 text-center">
                  <Button
                    color="primary"
                    disabled={processando}
                    type="submit"
                    variant="contained"
                  >
                    Acessar
                  </Button>
                </div>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
