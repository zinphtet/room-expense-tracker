import React from 'react';
import styled from 'styled-components/native';
import {Card, Text, Divider} from 'react-native-paper';
import {WhiteText} from '../style';
import theme from '../constants/theme';

const BalanceCard = () => {
  return (
    <StyledCard>
      <Card.Content>
        <TotalBalanceRow>
          <WhiteText variant="titleLarge">Total Expense</WhiteText>
          <WhiteText variant="headlineLarge">2,548.00 MMK</WhiteText>
        </TotalBalanceRow>
        <Divider />
        <IncomeExpenseRow>
          <IncomeColumn>
            <WhiteText variant="labelLarge">Date</WhiteText>
            <WhiteText variant="titleLarge">August 12 </WhiteText>
          </IncomeColumn>
          <ExpenseColumn>
            <WhiteText variant="labelLarge">Limit</WhiteText>
            <WhiteText variant="titleLarge">284.00 MMK</WhiteText>
          </ExpenseColumn>
        </IncomeExpenseRow>
      </Card.Content>
    </StyledCard>
  );
};

export default BalanceCard;

const StyledCard = styled(Card)`
  background-color: ${theme.colors.primaryDark};
  border-radius: 16px;
  padding: 16px;
  margin-top: -150px;
`;

const TotalBalanceRow = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const IncomeExpenseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const IncomeColumn = styled.View`
  /* align-items: center; */
`;

const ExpenseColumn = styled.View`
  /* align-items: center; */
`;
