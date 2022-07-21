import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

function HotKeysWrapper(props) {
  const { children, onMove, cardIds, listIds } = props;
  const keyMap = {
    moveToListLeftTop: 'shift+,',
    moveToListRightTop: 'shift+.',
  };
  const logger = (...args) => console.log(...['shortcut', ...args]);

  const handleMoveToListLeftTop = useCallback(() => {
    // get current card id
    const cardId = '760005809198335001';
    // get current card id's list id
    const { card } = cardIds.find((i) => i.cardId === cardId);

    const nextListId = listIds[listIds.indexOf(card.listId) - 1];
    logger(card.listId, listIds.indexOf(card.listId), nextListId);
    if (nextListId !== undefined) {
      onMove(cardId, nextListId, 0);
    }
  }, [cardIds, listIds, onMove]);

  const handleMoveToListRightTop = useCallback(() => {
    // get current card id
    const cardId = '760005809198335001';
    // get current card id's list id
    const { listId } = cardIds.find((i) => i.cardId === cardId);
    // get list id listindex-1
    const listIndex = listIds.indexOf(listId);
    const listIdOnRight = listIds[listIndex + 1];

    logger('MOVE_RIGHT', {
      listIdOnRight,
      listIds,
      currentIndex: listIndex,
      nextIndex: listIndex + 1,
    });

    if (listIdOnRight !== undefined) {
      onMove(cardId, listIdOnRight, 0);
    }
  }, [cardIds, listIds, onMove]);

  const handlers = useMemo(
    () => ({
      moveToListLeftTop: handleMoveToListLeftTop,
      moveToListRightTop: handleMoveToListRightTop,
    }),
    [handleMoveToListLeftTop, handleMoveToListRightTop],
  );

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
  cardIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  listIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(HotKeysWrapper);
