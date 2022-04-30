import * as React from 'react';
import { useState, handleChange } from 'react';
import { useFilterContext } from '../../providers/FiltersStateProvider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
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
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useFilterContext();
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const [expandedPanel, setExpandedPanel] = useState(true);

  const handleAccordionChange = () => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded === true ? false : true);
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <Grid item xs={12}>
      <Accordion sx={{ border: 0, borderRadius: 0 }}>
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
      <Accordion>
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
      <Accordion>
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
      <Accordion>
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
  );
}
