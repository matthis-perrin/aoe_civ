import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components';

import {LightText, Screen} from './fragments';
import {useModel} from './store';

export const App: React.FC = () => {
  const model = useModel();
  return (
    <SafeAreaWrapper>
      <StatusBar barStyle={'light-content'} />
      <ScrollView style={{height: '100%'}} contentInsetAdjustmentBehavior="automatic">
        <MainView>
          <Content>{JSON.stringify(model)}</Content>
        </MainView>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
App.displayName = 'App';

const SafeAreaWrapper = styled(SafeAreaView)`
  background-color: black;
`;

const MainView = styled(Screen)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(LightText)`
  /* font-size: 32px; */
`;
