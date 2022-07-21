import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  currentModalSelector,
  currentProjectSelector,
  listIdsForCurrentBoardSelector,
  makeCardByIdSelector,
  makeCardIdsByListIdSelector,
  pathSelector,
} from '../selectors';
import HotKeysWrapper from '../components/HotKeysWrapper';
import { moveCard } from '../actions/entry';

const makeMapStateToProps = () => {
  const cardIdsByListIdSelector = makeCardIdsByListIdSelector();
  const cardByIdSelector = makeCardByIdSelector();

  return (state) => {
    const { cardId: currentCardId, boardId: currentBoardId } = pathSelector(state);
    const currentModal = currentModalSelector(state);
    const currentProject = currentProjectSelector(state);
    const listIds = listIdsForCurrentBoardSelector(state);
    let cardIds = [];

    if (listIds) {
      cardIds = listIds
        .map((listId, listIndex) => {
          const cards = cardIdsByListIdSelector(state, listId);

          return cards.map((cardId, cardIndex) => ({
            listId,
            listIndex,
            cardId,
            card: cardByIdSelector(state, cardId),
            cardIndex,
          }));
        })
        .reduce((a, b) => [...a, ...b], []);
    }

    return {
      listIds,
      cardIds,
      currentCardId,
      currentBoardId,
      currentModal,
      currentProject,
    };
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onMove: (id, listId, index) => {
        return moveCard(id, listId, index);
      }
    },
    dispatch,
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(HotKeysWrapper);
