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
  const {name, imgUrl, specialty, uniqUnits, uniqTechs, bonuses, teamBonus} = civ;

  const handleBackPress = onDismiss;

  return (
    <Wrapper>
      <TouchableOpacity onPress={handleBackPress}>
        <Header>
          <Icon source={{uri: imgUrl}} />
          <Name>{name}</Name>
        </Header>
      </TouchableOpacity>
      <Specialty>
        <Label>Specialty</Label>
        <Value>{specialty}</Value>
      </Specialty>
      <UniqueUnits>
        <Label>Unique Unit</Label>
        {uniqUnits.map(unit => (
          <Value key={unit}>{unit}</Value>
        ))}
      </UniqueUnits>
      <UniqueTechs>
        <Label>Unique Techs</Label>
        {uniqTechs.map(tech => (
          <Value key={tech}>{tech}</Value>
        ))}
      </UniqueTechs>
      <Bonuses>
        <Label>Bonuses</Label>
        {bonuses.map(bonus => (
          <Value key={bonus}>{bonus}</Value>
        ))}
      </Bonuses>
      <TeamBonus>
        <Label>Team Bonus</Label>
        <Value>{teamBonus}</Value>
      </TeamBonus>
    </Wrapper>
  );
};
CivViewer.displayName = 'CivViewer';

const Wrapper = styled(View)`
  width: 100%;
  display: flex;
`;
const Header = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 64px;
`;

const Icon = styled(Image)`
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;
const Name = styled(LightText)`
  font-size: 24px;
`;

const Label = styled(LightText)`
  font-weight: 500;
  background-color: #ffffff33;
`;
const Value = styled(LightText)`
  background-color: #ffffff11;
  margin-top: 2px;
`;

const Specialty = styled(View)`
  height: 48px;
`;

const UniqueUnits = styled(View)`
  height: 64px;
`;

const UniqueTechs = styled(View)`
  height: 220px;
`;

const Bonuses = styled(View)`
  height: 256px;
`;

const TeamBonus = styled(View)`
  height: 48px;
`;
