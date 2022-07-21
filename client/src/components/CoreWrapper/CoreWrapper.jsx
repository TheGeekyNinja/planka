import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { Loader } from 'semantic-ui-react';

import CoreContainer from '../../containers/CoreContainer';

import styles from './CoreWrapper.module.scss';
import HotKeysContainer from '../../containers/HotKeysContainer';

const CoreWrapper = React.memo(({ isInitializing, isSocketDisconnected }) => {
  const [t] = useTranslation();

  return (
    <HotKeysContainer>
      <>
        {isInitializing ? <Loader active size="massive" /> : <CoreContainer />}
        {isSocketDisconnected && (
          <div className={styles.message}>
            <div className={styles.messageHeader}>{t('common.noConnectionToServer')}</div>
            <div className={styles.messageContent}>
              <Trans i18nKey="common.allChangesWillBeAutomaticallySavedAfterConnectionRestored">
                All changes will be automatically saved
                <br />
                after connection restored
              </Trans>
            </div>
          </div>
        )}
      </>
    </HotKeysContainer>
  );
});

CoreWrapper.propTypes = {
  isInitializing: PropTypes.bool.isRequired,
  isSocketDisconnected: PropTypes.bool.isRequired,
};

export default CoreWrapper;
