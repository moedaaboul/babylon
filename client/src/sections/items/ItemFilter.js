import * as React from 'react';
import { useState, handleChange } from 'react';
import { useFilterContext } from '../../providers/FiltersStateProvider';
import { styled } from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Slider from '@mui/material/Slider';

import Typography from '@mui/material/Typography';

function valuetext(value) {
  return `£${value}`;
}

const priceSliderMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '£25',
  },
  {
    value: 50,
    label: '£50',
  },
  {
    value: 75,
    label: '£75',
  },
  {
    value: 100,
    label: '£100',
  },
];

export const FILTER_CATEGORY_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_BRAND_OPTIONS = ['Nike', 'Adidas', 'Levis', 'Under Armour', 'Reebok', 'Dolce & Gabana'];
export const FILTER_COLOUR_OPTIONS = [
  'Red',
  'Yellow',
  'Orange',
  'Green',
  'Blue',
  'Purple',
  'Pink',
  'Black',
  'White',
  'Grey',
];

export default function RefineSidebar() {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useFilterContext();
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const [expandedPanel, setExpandedPanel] = useState(true);

  const handleAccordionChange = () => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded === true ? false : true);
    const handleChangeValue = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeCommitted = (event, newValue) => {
      setMinPrice(newValue[0]);
      setMaxPrice(newValue[1]);
    };

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

    return (
      <Grid item xs={12}>
        <Accordion expanded={expandedPanel} onChange={handleAccordionChange()} sx={{ border: 0, borderRadius: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography sx={{ fontSize: 12 }}>CATEGORIES</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {FILTER_CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel
                  control={<Checkbox icon={<CircleOutlinedIcon />} checkedIcon={<CircleSharpIcon />} />}
                  label={item}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion expanded={expandedPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography sx={{ fontSize: 12 }}>PRICE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <Slider
                getAriaLabel={() => 'Price Range'}
                value={value}
                onChange={handleChangeValue}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="auto"
                marks={priceSliderMarks}
                getAriaValueText={valuetext}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion expanded={expandedPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography sx={{ fontSize: 12 }}>BRANDS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {FILTER_BRAND_OPTIONS.map((item) => (
                <FormControlLabel
                  control={<Checkbox icon={<CircleOutlinedIcon />} checkedIcon={<CircleSharpIcon />} />}
                  label={item}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion expanded="true">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography sx={{ fontSize: 12 }}>COLOURS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {FILTER_COLOUR_OPTIONS.map((item) => (
                <FormControlLabel
                  control={<Checkbox icon={<CircleOutlinedIcon />} checkedIcon={<CircleSharpIcon />} />}
                  label={item}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Grid>
      /* <Toolbar />
     <Divider />
     <List>
       <ListItem button key="Brand">
         <ListItemText primary="Brand" />
       </ListItem>
       <ListItem button key="Price">
         <ListItemText primary="Price" />
       </ListItem>
       <ListItem>
        <Slider */
      //       getAriaLabel={() => 'Price Range'}
      //       value={value}
      //       onChange={handleChange}
      //       valueLabelDisplay="auto"
      //       marks={priceSliderMarks}
      //       getAriaValueText={valuetext}
      //     />
      //   </ListItem>
      //   <ListItem button key="Size">
      //     <ListItemText primary="Size" />
      //     <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
      //       <ExpandMoreIcon />
      //     </ExpandMore>
      //     <Collapse in={expanded} timeout="auto" unmountOnExit>
      //       <FormGroup>
      //         <FormControlLabel control={<Checkbox />} label="XS" />
      //         <FormControlLabel control={<Checkbox />} label="S" />
      //         <FormControlLabel control={<Checkbox />} label="M" />
      //         <FormControlLabel control={<Checkbox />} label="L" />
      //         <FormControlLabel control={<Checkbox />} label="XL" />
      //         <FormControlLabel control={<Checkbox />} label="6" />
      //         <FormControlLabel control={<Checkbox />} label="8" />
      //         <FormControlLabel control={<Checkbox />} label="10" />
      //         <FormControlLabel control={<Checkbox />} label="12" />
      //         <FormControlLabel control={<Checkbox />} label="14" />
      //         <FormControlLabel control={<Checkbox />} label="16" />
      //         <FormControlLabel control={<Checkbox />} label="18" />
      //         <FormControlLabel control={<Checkbox />} label="20" />
      //         <FormControlLabel control={<Checkbox />} label="22" />
      //       </FormGroup>
      //     </Collapse>
      //   </ListItem>

      //   <ListItem button key="Colour">
      //     <ListItemText primary="Colour" />
      //   </ListItem>
      // </List>
      // <Divider />
      // <List>
      //   {['All mail', 'Trash', 'Spam'].map((text, index) => (
      //     <ListItem button key={text}>
      //       <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
      //       <ListItemText primary={text} />
      //     </ListItem>
      //   ))}
      // </List> */
    );
  };
}
