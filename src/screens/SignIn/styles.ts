import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  ${({ theme }) => ({
    color: theme.COLORS.BRAND_LIGHT,
    fontSize: theme.FONT_SIZE.XXXL,
    fontFamily: theme.FONT_FAMILY.BOLD
  })};
  text-align: center;
`;

export const Slogan = styled.Text`
  ${({ theme }) => ({
    color: theme.COLORS.GRAY_100,
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR
  })};
  text-align: center;

  margin-bottom: 32px;
`;
