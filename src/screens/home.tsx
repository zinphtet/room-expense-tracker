import {ScrollView, Text, View} from 'react-native';
import Greeting from '../components/greeting';
import {BgWrapper, SectionWrapper} from '../style';
import styled from 'styled-components/native';
import BalanceCard from '../components/card';
import RecentHistory from '../components/recent-history';

const HomeScreen = () => {
  return (
    <ScrollView>
      <BgWrapperWithRadius>
        <SectionWrapperWithPadding>
          <Greeting />
        </SectionWrapperWithPadding>
      </BgWrapperWithRadius>
      <SectionWrapper>
        <BalanceCard />
      </SectionWrapper>
      {/* <SectionWrapper> */}
      <View>
        <RecentHistory />
      </View>
      {/* </SectionWrapper> */}
    </ScrollView>
  );
};

export default HomeScreen;

const SectionWrapperWithPadding = styled(SectionWrapper)`
  padding-bottom: 150px;
`;
const BgWrapperWithRadius = styled(BgWrapper)`
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;
