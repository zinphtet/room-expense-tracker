import React from 'react';
import styled from 'styled-components/native';
import {Card, Text, Divider} from 'react-native-paper';
import {WhiteText} from '../style';
import theme from '../constants/theme';
import {formatDateOne} from '../lib/helper';

const BalanceCard = () => {
  const date = new Date();
  return (
    <StyledCard>
      <Card.Content>
        <TotalBalanceRow>
          <WhiteText variant="titleLarge">Total Expense</WhiteText>
          <WhiteText variant="headlineLarge">X X X X MMK</WhiteText>
        </TotalBalanceRow>
        <Divider />
        <IncomeExpenseRow>
          <IncomeColumn>
            <WhiteText variant="labelLarge">Date</WhiteText>
            <WhiteText variant="titleLarge">
              {formatDateOne(date.toISOString())}
            </WhiteText>
          </IncomeColumn>
          <ExpenseColumn>
            <WhiteText variant="labelLarge">X X X</WhiteText>
            <WhiteText variant="titleLarge">X X X</WhiteText>
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
