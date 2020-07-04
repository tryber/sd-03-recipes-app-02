import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const ShareBtn = () => {
  const { pathname } = useLocation();
  const [shareState, setShareState] = useState('');
  return (
  <button
    data-testid="share-btn"
    className="invisible-btn"
    onClick={() => {
      navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
      setShareState('Link copiado!');
    }}
  >
    <img src={shareIcon} alt="share" />
    {shareState}
  </button>
)};

export default ShareBtn;
