import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  List,
  ListItem,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Done from '@material-ui/icons/Done';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';

import { socket } from '../../data';

const padding = {
  paddingLeft: '8px',
  paddingRight: '8px',
  color: grey[500],
};

const header = {
  padding: '8px 8px 0 8px',
  color: indigo[500],
  textAlign: 'center',
};

class Inouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listExit: {},
    };
  }

  exitDevice(id) {
    const { dispatch } = this.props;
    const { runMethod } = socket.actions;
    const method = 'inout/exitDevice';

    dispatch(runMethod(
      'apiOnce',
      method,
      () => {
        this.setState({
          listExit: {
            ...this.state.listExit,
            [id]: 'exit',
          },
        });

        console.log('successExitDevice');
      },
    ));

    dispatch(runMethod(
      'apiEmit',
      method,
      id,
    ));
  }

  exitDeviceAll() {
    console.log('exitDeviceAll', this);
  }

  next() {
    console.log('next', this);
  }

  render() {
    const { open, onClose, list } = this.props;
    const { listExit } = this.state;
    const format = 'mmmm dS\' yy HH:MM:ss';

    return (
      <div className="inouts">
        <Dialog open={open} onClose={onClose}>
          <Typography variant="title" gutterBottom style={header}>
            Не выполнен выход на других устроствах
          </Typography>

          <List>
            {
              list && list.map((item, index) => {
                const { _id } = item;

                return (
                  <ListItem
                    key={index}
                    style={{ justifyContent: 'space-between', ...padding }}
                  >
                    <div>
                      {dateformat(new Date(item.dateIn), format)}
                    </div>

                    <div>
                      {item.userAgent}
                    </div>

                    <IconButton
                      color="primary"
                      onClick={this.exitDevice.bind(this, _id)
                    }>
                      {
                        listExit[_id] === 'exit' ? <Done /> : <ExitToApp />
                      }
                    </IconButton>
                  </ListItem>
                );
              })
            }
          </List>

          <DialogActions>
            <Button
              size="small"
              color="secondary"
              onClick={this.exitDeviceAll.bind(this)}
            >
              Выйти везде
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={this.next.bind(this)}
            >
              Далее
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Inouts.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  list: PropTypes.array,
  dispatch: PropTypes.func,
};

export default connect()(Inouts);