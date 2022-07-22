import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

function HotKeysWrapper(props) {
  const { children, onMove, board, selectedCardId } = props;

  const keyMap = {
    openTitleEdit: 'e'
  };

  const handlers = {
    openTitleEdit: () => {}
  }

  return (
    <HotKeys
      handlers={handlers}
      keyMap={keyMap}
      className="hotkeys-wrapper"
      style={{
        outline: 'none',
        width: 'max-content',
        height: 0,
      }}
    />
  );
}

HotKeysWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  onMove: PropTypes.func.isRequired,
  board: PropTypes.any.isRequired,
  selectedCardId: PropTypes.any.isRequired,
};

export default React.memo(HotKeysWrapper);
