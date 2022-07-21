import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

function HotKeysWrapper(props) {
  const { children, onMove, board, selectedCardId } = props;
  const keyMap = {
    moveToListLeftTop: 'shift+,',
    moveToListRightTop: 'shift+.',
  };
  const logger = (...args) => console.log(...['shortcut', ...args]);

  useEffect(() => {
    console.log('SELECTED', selectedCardId)
  }, [selectedCardId]);

  const handlers = {}

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
    >
      {children}
    </HotKeys>
  );
}

HotKeysWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  onMove: PropTypes.func.isRequired,
  board: PropTypes.any.isRequired,
  selectedCardId: PropTypes.any.isRequired,
};

export default React.memo(HotKeysWrapper);
