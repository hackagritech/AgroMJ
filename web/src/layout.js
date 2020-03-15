import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Assignment,
  DoneAll,
  Settings,
  SupervisedUserCircle
} from '@material-ui/icons';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, teal } from '@material-ui/core/colors';

import Relatorio from './containers/relatorio';
import Funcionarios from './containers/funcionarios';
import FuncionarioCadastro from './containers/funcionarios/funcionarioCadastro';
import Atividades from './containers/atividades';
import AtividadeCadastro from './containers/atividades/atividadeCadastro';
import Checklists from './containers/checklists';
import ChecklistCadastro from './containers/checklists/checklistCadastro';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepPurple
  }
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar
}));

export default withRouter((props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              AgroGerencia - MVP
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.drawer}
          variant="permanent"
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={() => props.history.push('/')}>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary="Relatório" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/funcionarios')}>
              <ListItemIcon>
                <SupervisedUserCircle />
              </ListItemIcon>
              <ListItemText primary="Funcionários" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/atividades')}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Atividades" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/checklists')}>
              <ListItemIcon>
                <DoneAll />
              </ListItemIcon>
              <ListItemText primary="Checklists" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route component={Relatorio} exact path="/" />
          <Route component={Funcionarios} exact path="/funcionarios" />
          <Route component={FuncionarioCadastro} exact path="/funcionarios/cadastro" />
          <Route component={Atividades} exact path="/atividades" />
          <Route component={AtividadeCadastro} exact path="/atividades/cadastro" />
          <Route component={Checklists} exact path="/checklists" />
          <Route component={ChecklistCadastro} exact path="/checklists/cadastro" />
        </main>
      </div>
    </ThemeProvider>
  );
});
