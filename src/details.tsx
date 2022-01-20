import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import styled from 'styled-components';

import {LightText} from './fragments';
import {isImage, setDetailsLink, useDetailsLinkInfo} from './store_link';

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
        <Button
          title="Close"
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => setDetailsLink()}
        ></Button>
        {info === undefined ? (
          <LightText>Loading...</LightText>
        ) : (
          <View>
            <Title>{info.title}</Title>
            {info.sections.map(section => (
              <View key={section.title}>
                <Section>{section.title}</Section>
                {[...section.lines.entries()].map(([key, items]) => (
                  <View key={key}>
                    <ContentLine>
                      <ContentLabel>{key}</ContentLabel>
                      <ContentValue>
                        {items.map((i, index) => {
                          if (isImage(i)) {
                            return (
                              <BeautifulImage
                                key={key + i.src + String(index)}
                                source={{uri: i.src, width: i.width, height: i.height}}
                              />
                            );
                          }
                          return <Text key={key + i + String(index)}>{i}</Text>;
                        })}
                      </ContentValue>
                    </ContentLine>
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
  padding: 0 8px;
`;

const Section = styled(LightText)`
  text-align: center;
  font-weight: 500;
  background-color: #ffffff33;
  padding: 4px 0;
  margin: 16px 0 4px 0;
`;

const Title = styled(LightText)`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  padding: 8px 0 0 0;
`;

const ContentLine = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentLabel = styled(LightText)`
  background-color: #ffffff11;
  margin-right: 4px;
  margin-bottom: 2px;
  font-weight: 500;
  padding: 2px 0;
`;

const ContentValue = styled(LightText)`
  color: #ffffffcc;
`;

const BeautifulImage = styled(Image)`
  margin-top: -4px;
`;
