import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { timeConverter } from '../../utils/helpers';
import './index.css';
// import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { blue } from '@mui/material/colors';
const darkBlue = blue[600];

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(255, 255, 255, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default function CustomizedAccordions({ order }) {
  console.log(order);
  const date = timeConverter(order.purchaseDate);
  const orderAmount = order.items.length;

  const [expanded, setExpanded] = React.useState('');

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    height: orderAmount * 200,
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(255, 255, 255, .125)',
  }));

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        sx={{ color: 'White', border: 'None' }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary sx={{ backgroundColor: darkBlue }} aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="subtitle1" gutterBottom component="div">
            Your order on {date}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table styles={{ width: '50%', minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discounted Price</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => {
                  return (
                    <>
                      <TableRow key={item._id}>
                        <TableCell scope="row">
                          <Box display={'flex'} aligncheckoutItems={'center'}>
                            <Box width={100} height={100}>
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                }}
                                alt={item.title}
                                src={item.image[0]}
                              />
                            </Box>
                            <Box width={100} height={100} ml={1}>
                              <p
                                className={{
                                  fontFamily:
                                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  margin: '0 0 8px 0',
                                }}>
                                {item.brand}
                              </p>
                              <p>{item.title}</p>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>£ {item.price}</TableCell>
                        <TableCell>£ {item.discountedPrice}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
