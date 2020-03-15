import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FuncionarioFormulario from './funcionarioFormulario';
import Card from '../../components/card';

export default class FuncionarioCadastro extends Component {
  state = {
    processando: false
  }

  handleSubmit = async (funcionario, { resetForm }) => {
    try {
      this.setState({ processando: true });
      const response = await axios.post('http://localhost:5000/api/funcionarios', funcionario);
      resetForm();
      this.setState({ processando: false });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      this.setState({ processando: false });
      toast.error(error.response.data.message);
    }
  }

  render() {
    const { processando } = this.state;

    return (
      <Card
        title="Novo Funcionário"
      >
        <FuncionarioFormulario
          onSubmit={this.handleSubmit}
          processando={processando}
        />
      </Card>
    );
  }
}
