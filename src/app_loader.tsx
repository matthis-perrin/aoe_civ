import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';

import {App} from './app';
import {fetchData} from './data';
import {LoadingScreen} from './loading_screen';
import {error} from './logger';
import {loadModelFromDisk, setModel} from './store';

const CLEAR_STORAGE_ON_STARTUP = true;

export const AppLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const clearPromise = CLEAR_STORAGE_ON_STARTUP ? AsyncStorageLib.clear() : Promise.resolve();
    clearPromise
      .then(loadModelFromDisk)
      .then(loaded => {
        if (loaded) {
          setLoading(true);
        } else {
          fetchData()
            .then(data => {
              setModel(data);
              setLoading(false);
            })
            .catch(error);
        }
      })
      .catch(error);
  }, []);

  return loading ? <LoadingScreen /> : <App />;
};
AppLoader.displayName = 'AppLoader';
