import React from 'react';

import {ListRenderItem, ViewProps} from 'react-native';
import {Button, Card, Container, List} from 'lib_components';
import {Precepts, Verse} from 'lib_cloud/parse';
import actions from './actions';

interface PreceptPageProps extends ViewProps {
  precept: Precepts;
  handleDismissPreceptPage: () => void;
}

const renderItem: ListRenderItem<Verse> = ({item}) => {
  return <Card title={item.getTitle()} subTitle={item.text} />;
};
export const PreceptPage: React.FC<PreceptPageProps> = () => {
  const {precept, verses, handleDismissPreceptPage} = actions();

  return (
    <Container fullFlex>
      <Card title={precept?.text} titleStyle={{textAlign: 'center'}} />
      <Container fullFlex>
        <List paddingBottom={40} data={verses} renderItem={renderItem} />
      </Container>
      <Container margin={10} isPositionAbsolute style={{bottom: 0}}>
        <Button
          isFullWidth
          text="Back to Precepts"
          onPress={handleDismissPreceptPage}
        />
      </Container>
    </Container>
  );
};
export default PreceptPage;
