import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AtividadeFormulario from './atividadeFormulario';
import Card from '../../components/card';

export default class AtividadeCadastro extends Component {
  state = {
    processando: false
  }

  handleSubmit = async (atividade, { resetForm }) => {
    try {
      this.setState({ processando: true });
      const response = await axios.post('http://localhost:5000/api/atividades', atividade);
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
        title="Atividades"
      >
        <AtividadeFormulario
          onSubmit={this.handleSubmit}
          processando={processando}
        />
      </Card>
    );
  }
}
