import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from './Toolbar.jsx';

const styles = theme => ({
  page: {
    display: 'flex',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
  },
});

class Page extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.page}>
        <Toolbar
          title={this.props.title}
          buttons={this.props.toolbarButtons}
        />

        <div className={classes.content}>
          <div className={classes.toolbar}></div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  title: PropTypes.string,
  toolbarButtons: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles)(Page);
