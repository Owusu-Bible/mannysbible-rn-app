import React from "react";

import {
  Container,
  Divider,
  Icon,
  ListRowItem,
  Section,
  Spacer,
  Text,
} from "lib_components";
import { actions } from "./actions";
import { RefreshControl, ScrollView, View } from "react-native";

export const Home: React.FC = ({}) => {
  const {
    precepts,
    upcomingHolyDays,
    navigateToPreceptPage,
    refreshing,
    onRefresh,
  } = actions();
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Section title="Precept" actionButtonText="View All">
          {precepts.map((precept, index) => (
            <Container key={index}>
              <Divider />
              <ListRowItem
                title={precept.text}
                onPress={navigateToPreceptPage(precept)}
              />
            </Container>
          ))}
        </Section>
        <Divider />
        <Spacer />
        <Section title="Upcoming Holy Days" actionButtonText="View All">
          {upcomingHolyDays?.slice(0, 4).map((holyDay, index) => (
            <Container key={index}>
              <Divider />
              <ListRowItem
                title={holyDay.name}
                subTitle={holyDay?.dateRangeText}
              />
            </Container>
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
};
export default Home;
