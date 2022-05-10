import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiTypography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ColumnToRow, Item } from '@mui-treasury/components/flex';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { CategoryProvider, CategoryTitle, CategoryItem } from '@mui-treasury/components/menu/category';
import { SocialProvider, SocialLink } from '@mui-treasury/components/socialLink';

import { useMagCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/mag';
import { usePoofSocialLinkStyles } from '@mui-treasury/styles/socialLink/poof';
import { usePlainNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/plain';
import { styled } from '@mui/material/styles';
import FaceGroup from '@mui-treasury/components/group/face';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export const Typography = styled(MuiTypography)(({ theme }) => ({
  // a must if you want to set arrows, indicator as absolute
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    color: '#fff',
  },
}));

export const WhiteTypography = styled(MuiTypography)(({ theme }) => ({
  // a must if you want to set arrows, indicator as absolute
  color: 'white',
}));

const Footer = () => {
  return (
    <Box width={'100%'}>
      <Box
        px={2}
        py={6}
        style={{
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
        position={'relative'}></Box>
      <Box
        px={2}
        py={10}
        style={{
          backgroundColor: '#192D36',
        }}>
        <Container disableGutters>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={3}>
              <FaceGroup
                faces={[
                  'https://media-exp1.licdn.com/dms/image/C4D03AQGCFrl4JbFWSg/profile-displayphoto-shrink_800_800/0/1650452068288?e=1657756800&v=beta&t=uR1H73GxSfKrUb6ysyap1tGf-y_j5ZjwCdkTRBIrUcw',
                  'https://media-exp1.licdn.com/dms/image/C4E03AQG-rzC7yrr-BQ/profile-displayphoto-shrink_800_800/0/1567101642396?e=1657756800&v=beta&t=0dUpXhgGhUav3Etsm-i4Hy6OHHVfUlH9-F8fFAqWnK0',
                  'https://media-exp1.licdn.com/dms/image/C4D03AQHLDTwIKJzaPg/profile-displayphoto-shrink_800_800/0/1640685160939?e=1657756800&v=beta&t=1duKCpbLjpqCg4qIoME3wn5UNzunhSanR3ioIXz9Mgg',
                  'https://media-exp1.licdn.com/dms/image/C4D03AQHKjYUL4DVCYQ/profile-displayphoto-shrink_800_800/0/1518110993440?e=1657756800&v=beta&t=fH60EMZbIcgaQbdek0m42UdHedvGewbpduJJLKEsoIk',
                ]}
                size={48}
                offset={-8}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <WhiteTypography>Pages</WhiteTypography>
                    </CategoryTitle>
                    <CategoryItem>
                      <Typography component={RouterLink} to="/dashboard" style={{ textDecoration: 'none' }} index={1}>
                        Dashboard
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography component={RouterLink} to="/items" style={{ textDecoration: 'none' }} index={1}>
                        Products
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography
                        component={RouterLink}
                        to="/wardrobe/lists/liked"
                        style={{ textDecoration: 'none' }}
                        index={1}>
                        Your Wish List
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography
                        component={RouterLink}
                        to="/wardrobe/lists/owned"
                        style={{ textDecoration: 'none' }}
                        index={1}>
                        Your Orders
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography component={RouterLink} to="/lookfeed" style={{ textDecoration: 'none' }} index={1}>
                        Influencers
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography component={RouterLink} to="/login" style={{ textDecoration: 'none' }} index={1}>
                        Login
                      </Typography>
                    </CategoryItem>
                    <CategoryItem>
                      <Typography component={RouterLink} to="/register" style={{ textDecoration: 'none' }} index={1}>
                        Register
                      </Typography>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <WhiteTypography>WHO WE ARE</WhiteTypography>
                    </CategoryTitle>

                    <CategoryItem>
                      <Link href="https://github.com/moedaaboul/" underline="none">
                        <Typography index={1}>Muhammad Daaboul</Typography>
                      </Link>
                    </CategoryItem>
                    <CategoryItem>
                      <Link href="https://github.com/heranYang93" underline="none">
                        <Typography index={1}>Heran Yang</Typography>
                      </Link>
                    </CategoryItem>
                    <CategoryItem>
                      <Link href="https://github.com/ViennaBorowska" underline="none">
                        <Typography index={1}>Vienna Borowska</Typography>
                      </Link>
                    </CategoryItem>
                    <CategoryItem>
                      <Link href="https://github.com/Iler22" underline="none">
                        <Typography index={1}>Iler Watson</Typography>
                      </Link>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <WhiteTypography>Documents</WhiteTypography>
                    </CategoryTitle>
                    <CategoryItem>
                      <Link href="https://github.com/moedaaboul/babylon" underline="none">
                        <Typography index={1}>Github</Typography>
                      </Link>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} lg={3} style={{ marginLeft: 'auto' }}>
              <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                <CategoryTitle>
                  <WhiteTypography>Contact Us</WhiteTypography>
                </CategoryTitle>
              </CategoryProvider>
              <SocialProvider useStyles={usePoofSocialLinkStyles}>
                <SocialLink brand={'Envelope'} />
                <SocialLink brand={'Instagram'} />
                <SocialLink brand={'LinkedIn'} />
                <SocialLink brand={'Twitter'} />
              </SocialProvider>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container disableGutters>
        <Divider
          className={{
            height: 2,
            margin: '-1px 0',
          }}
        />
      </Container>
      <Box px={2} py={3} className={{ backgroundColor: '#0F2128' }}>
        <Container disableGutters>
          <ColumnToRow at={'md'} columnStyle={{ alignItems: 'center' }} rowStyle={{ alignItems: 'unset' }}>
            <Item grow ml={-2} shrink={0}>
              <NavMenu useStyles={usePlainNavigationMenuStyles}>
                <ColumnToRow at={'sm'}>
                  <NavItem
                    className={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      justifyContent: 'center',
                      letterSpacing: '0.5px',
                    }}>
                    <Typography>Terms & Conditions</Typography>
                  </NavItem>
                  <NavItem
                    className={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      justifyContent: 'center',
                      letterSpacing: '0.5px',
                    }}>
                    <Typography>Privacy Policy</Typography>
                  </NavItem>
                  <NavItem
                    className={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      justifyContent: 'center',
                      letterSpacing: '0.5px',
                    }}>
                    <Typography>Sitemap</Typography>
                  </NavItem>
                </ColumnToRow>
              </NavMenu>
            </Item>
          </ColumnToRow>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
