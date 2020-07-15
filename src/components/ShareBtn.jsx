import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const ShareBtn = ({ dataTestId, type, id }) => {
  const [shareState, setShareState] = useState('');
  return (
    <Fragment>
      <button
        className="invisible-btn"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
          setShareState('Link copiado!');
        }}
      >
        <img data-testid={dataTestId} src={shareIcon} alt="share" className="blue-filter" />
      </button>
      {shareState}
    </Fragment>
  );
};

ShareBtn.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareBtn;
