import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Logo } from '~/components';

import { loadedDelay as LOADED_DELAY } from './splash-screen.scss.json';

import './splash-screen.scss';

const SplashScreen = ({ isLoading, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const className = classNames({
    'splash-screen': true,
    '_exiting': !isLoading,
  });

  useEffect(() => {
    let loadingTimer;

    if(!isLoading) {
      loadingTimer = setTimeout(() => {
        setIsLoaded(true);
      }, LOADED_DELAY);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  });

  return <>
    { !isLoaded && (
      <div className={className}>
        <div className="splash-screen__logo">
          <Logo />
        </div>
      </div>) }
    { !isLoading && children }
  </>;
};

SplashScreen.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

SplashScreen.defaultProps = {
  isLoading: false,
};

export default SplashScreen;
