import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HotKeysWrapper from '../components/HotKeysWrapper';
import { moveCard } from '../actions/entry';
import { currentBoardSelector } from '../selectors';

const mapStateToProps = (state) => {
  const currentBoard = currentBoardSelector(state);

  return {
    board: currentBoard,
    selectedCardId: currentBoard.selectedCardId
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

export default connect(mapStateToProps, mapDispatchToProps)(HotKeysWrapper);
