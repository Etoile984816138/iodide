import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'

import * as actions from '../../actions/actions'
import { getCellById } from '../../tools/notebook-utils'


export class CellMenuContainerUnconnected extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="cell-menu-container">
        <Tooltip
          classes={{ tooltip: 'iodide-tooltip' }}
          placement="bottom"
          title="Cell Settings"
          enterDelay={600}
        >
          <div className="cell-type-label">{this.props.label}</div>
        </Tooltip>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  const { cellId } = ownProps
  const cell = getCellById(state.cells, cellId)
  let label
  if (cell.cellType === 'code') {
    label = cell.language
  } else if (cell.cellType === 'markdown') {
    label = 'md'
  } else if (cell.cellType === 'css') {
    label = 'css'
  } else if (cell.cellType === 'plugin') {
    label = 'plugin'
  } else if (cell.cellType === 'external dependencies') {
    label = 'resource'
  } else if (cell.cellType === 'raw') {
    label = 'raw'
  }
  return {
    label,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CellMenuContainerUnconnected)
