import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const ShareBtn = () => {
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const [shareState, setShareState] = useState('');
  return (
    <Fragment>
      <button
        data-testid="share-btn"
        className="invisible-btn"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/${path[1]}/${path[2]}`);
          setShareState('Link copiado!');
        }}
      >
        <img src={shareIcon} alt="share" />
      </button>
      {shareState}
    </Fragment>
  );
};

export default ShareBtn;
