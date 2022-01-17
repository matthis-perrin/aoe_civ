import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';

import {LightText} from './fragments';
import {Civ} from './model';

interface CivViewerProps {
  civ: Civ;
  onDismiss: () => void;
}

export const CivViewer: React.FC<CivViewerProps> = props => {
  const {civ, onDismiss} = props;
  const {name, imgUrl} = civ;

  const handleBackPress = onDismiss;

  return (
    <Wrapper>
      <TouchableOpacity onPress={handleBackPress}>
        <BackButton>Back</BackButton>
      </TouchableOpacity>
      <Icon source={{uri: imgUrl}} />
      <Name>{name}</Name>
    </Wrapper>
  );
};
CivViewer.displayName = 'CivViewer';

const Wrapper = styled(View)`
  width: 100%;
  height: 48px;
  display: flex;
`;

const Icon = styled(Image)`
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;
const Name = styled(LightText)`
  font-size: 24px;
`;

const BackButton = styled(LightText)`
  font-size: 24px;
`;
