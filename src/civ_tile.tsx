import React from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components';

import {LightText} from './fragments';

interface CivTileProps {
  label: string;
  imgUrl: string;
}

export const CivTile: React.FC<CivTileProps> = props => {
  const {label, imgUrl} = props;
  return (
    <Wrapper>
      <Icon source={{uri: imgUrl}} />
      <Name>{label}</Name>
    </Wrapper>
  );
};
CivTile.displayName = 'CivTile';

const Wrapper = styled(View)`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(Image)`
  width: 48px;
  height: 48px;
  margin: 0 8px;
`;
const Name = styled(LightText)`
  font-size: 24px;
`;
