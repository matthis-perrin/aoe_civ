import React, {useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

import {CivTile} from './civ_tile';
import {CivViewer} from './civ_viewer';
import {Civ} from './model';
import {useModel} from './store';

interface AppHalfProps {}

export const AppHalf: React.FC<AppHalfProps> = () => {
  const {civs} = useModel();
  const [currentCiv, setCurrentCiv] = useState<Civ | undefined>();

  const handleDismiss = useCallback(() => setCurrentCiv(undefined), []);

  return (
    <Wrapper>
      {currentCiv === undefined ? (
        civs.map(civ => (
          <TouchableOpacity
            key={civ.name}
            // eslint-disable-next-line react/jsx-no-bind
            onPress={() => setCurrentCiv(civ)}
          >
            <CivTile label={civ.name} imgUrl={civ.imgUrl} />
          </TouchableOpacity>
        ))
      ) : (
        <CivViewer civ={currentCiv} onDismiss={handleDismiss} />
      )}
    </Wrapper>
  );
};
AppHalf.displayName = 'AppHalf';

const Wrapper = styled(View)`
  display: flex;
`;
