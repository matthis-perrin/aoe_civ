import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import styled from 'styled-components';

import {AppHalf} from './app_half';
import {LightText} from './fragments';

export const App: React.FC = () => {
  // const model = useModel();

  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={{height: '100%', backgroundColor: '#272d2f'}}
        contentInsetAdjustmentBehavior="automatic"
      >
        <MainView>
          <LeftHalf style={{borderRightWidth: 1}}>
            <AppHalf />
          </LeftHalf>
          <RightHalf>
            <AppHalf />
          </RightHalf>
          {/* <Content>{JSON.stringify(model)}</Content> */}
        </MainView>
      </ScrollView>
    </Fragment>
  );
};
App.displayName = 'App';

const MainView = styled(SafeAreaView)`
  background-color: #272d2f;
  display: flex;
  flex-direction: row;
`;

const LeftHalf = styled(View)`
  width: 50%;
  border: solid 0px #ffffff33;
`;
const RightHalf = styled(View)`
  width: 50%;
`;

const Content = styled(LightText)``;
