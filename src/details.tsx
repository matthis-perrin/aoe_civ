import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import styled from 'styled-components';

import {setDetailsLink, useDetailsLinkInfo} from './store_link';

export const Details: React.FC<{detailsLink: string | undefined}> = ({detailsLink}) => {
  const info = useDetailsLinkInfo();

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: '#272d2f',
        display: detailsLink !== undefined ? 'flex' : 'none',
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Wrapper>
        <Button title="Close" onPress={() => setDetailsLink()}></Button>
        {info === undefined ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <Center>{info.title}</Center>
            {info.sections.map(section => (
              <View key={section.title}>
                <Center>{section.title}</Center>
                {[...section.lines.entries()].map(([key, value]) => (
                  <View key={key}>
                    <Text>
                      {key} | {value}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </Wrapper>
    </ScrollView>
  );
};
Details.displayName = 'Details';

const Wrapper = styled(View)`
  width: 100%;
  display: flex;
`;

const Center = styled(Text)`
  text-align: center;
`;
