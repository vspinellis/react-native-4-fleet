import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`;

export const Title = styled.Text`
  ${({ theme }) => ({
    color: theme.COLORS.WHITE,
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.BOLD
  })};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE
}))``;
