import React from 'react';
import {ListRenderItem, RefreshControl} from 'react-native';
import {Card, Container, List} from 'lib_components';
import {Precepts as PreceptsSubclass} from 'lib_cloud/parse';
import actions from './actions';
export const Precepts: React.FC = ({}) => {
  const {precepts, navigateToPreceptPage, refreshing, onRefresh} = actions();

  const renderItem: ListRenderItem<PreceptsSubclass> = ({item}) => {
    return <Card title={item.text} onPress={navigateToPreceptPage(item)} />;
  };
  return (
    <Container>
      <List
        data={precepts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};
export default Precepts;
