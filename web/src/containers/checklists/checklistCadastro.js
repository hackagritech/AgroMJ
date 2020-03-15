import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from '../../components/card';
import ChecklistFormulario from './checklistFormulario';

export default class ChecklistCadastro extends Component {
  state = {
    processando: false
  }

  handleSubmit = async (checklist, { resetForm }) => {
    try {
      this.setState({ processando: true });
      const response = await axios.post('http://localhost:5000/api/checklists', checklist);
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
        title="Novo Checklist"
      >
        <ChecklistFormulario
          onSubmit={this.handleSubmit}
          processando={processando}
        />
      </Card>
    );
  }
}
