import styled from 'styled-components/native';
import {Button, Text} from 'react-native-paper';
export const StyledButton = styled(Button)`
  margin-top: 8px;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
`;

export const SectionWrapper = styled.View`
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const BgWrapper = styled.View`
  background-color: ${props => props.theme.colors.primary};
`;
export const WhiteText = styled(Text)`
  color: #fff;
`;

export const FlexCenter = styled.View<{gap?: number}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.gap || 0}px;
`;

export const SubTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const DateTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

type CenterProps = {
  top?: number;
  bottom?: number;
};
export const CenterContainer = styled.View<CenterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${props => props?.top}px;
  padding-bottom: ${props => props?.bottom}px;
`;

type ContainerProps = {
  horizontal?: number;
  vertical?: number;
  gap?: number;
};
export const Container = styled.View<ContainerProps>`
  padding-left: ${props => props.horizontal}px;
  padding-right: ${props => props.horizontal}px;
  padding-top: ${props => props.vertical}px;
  padding-bottom: ${props => props.vertical}px;
  gap: ${props => props.gap || 0}px;
`;

export const FormContainer = styled.View`
  gap: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const ErrorText = styled.Text`
  color: red;
`;

type ItemSeparatorProps = {
  width?: number;
  height?: number;
};
export const ItemSeparator = styled.View<ItemSeparatorProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

export const ButtonContainer = styled.View`
  display: flex;
  align-items: flex-end;
`;

type TextBoldProps = {
  size?: number;
};
export const TextBold = styled.Text<TextBoldProps>`
  font-weight: bold;
  font-size: ${props => props.size || 20}px;
`;

export const FlexRight = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
