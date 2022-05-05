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

export const FILTER_BRAND_OPTIONS = ['Nike', 'Adidas', 'Levis', 'Under Armour', 'Reebok', 'Dolce & Gabana'];

export default function RefineSidebar() {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, setCategories, setColours } = useFilterContext();
  const [value, setValue] = React.useState([minPrice, maxPrice]);
  const [state, setState] = React.useState({
    Men: false,
    Women: false,
    Kids: false,
  });
  const [colourState, setColourState] = React.useState({
    red: false,
    yellow: false,
    orange: false,
    green: false,
    blue: false,
    purple: false,
    pink: false,
    black: false,
    white: false,
    grey: false,
  });

  const handleChange = (event) => {
    console.log(state, 'line76');
    const newState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(newState);
    console.log(newState, 'line 84');
    console.log(state, 'line81');
    const categoryKeys = Object.keys(newState);
    var filtered = categoryKeys.filter((key) => newState[key]);
    console.log(filtered, 'line 82');
    if (filtered.length === 0) {
      setCategories(null);
      return;
    }
    setCategories(filtered);
  };

  const { men, women, kids } = state;

  const handleColourChange = (event) => {
    const newState = {
      ...colourState,
      [event.target.name]: event.target.checked,
    };
    setColourState(newState);
    const categoryKeys = Object.keys(newState);
    var filtered = categoryKeys.filter((key) => newState[key]);
    if (filtered.length === 0) {
      setColours(null);
      return;
    }
    setColours(filtered);
  };

  const { red, yellow, orange, green, blue, purple, pink, black, white, grey } = colourState;

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <Grid item xs={12}>
      <Accordion sx={{ border: 0, borderRadius: 0 }} elevation={0} defaultExpanded="true">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography sx={{ fontSize: 12 }}>CATEGORIES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleChange}
                  checkedIcon={<CircleSharpIcon />}
                  checked={men}
                  name="Men"
                />
              }
              label="Men"
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CircleSharpIcon />}
                  onChange={handleChange}
                  name="Women"
                  checked={women}
                />
              }
              label="Women"
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleChange}
                  checkedIcon={<CircleSharpIcon />}
                  name="Kids"
                  checked={kids}
                />
              }
              label="Kids"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion defaultExpanded="true" elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography sx={{ fontSize: 12 }}>PRICE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <Slider
              getAriaLabel={() => 'Price Range'}
              value={value}
              color={'secondary'}
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
      <Accordion defaultExpanded="true" elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography sx={{ fontSize: 12 }}>BRANDS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {FILTER_BRAND_OPTIONS.map((brand) => (
              <FormControlLabel
                componentsProps={{ typography: { sx: { fontSize: 12 } } }}
                control={<Checkbox icon={<CircleOutlinedIcon />} checkedIcon={<CircleSharpIcon />} size="small" />}
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion defaultExpanded="true" elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography sx={{ fontSize: 12 }}>COLOURS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="red"
                  checked={red}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Red'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="yellow"
                  checked={yellow}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Yellow'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="orange"
                  checked={orange}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Orange'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="green"
                  checked={green}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Green'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="blue"
                  checked={blue}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Blue'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="purple"
                  checked={purple}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Purple'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="pink"
                  checked={pink}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Pink'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="black"
                  checked={black}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Black'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="white"
                  checked={white}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'White'}
            />
            <FormControlLabel
              componentsProps={{ typography: { sx: { fontSize: 12 } } }}
              control={
                <Checkbox
                  color={'secondary'}
                  size="small"
                  icon={<CircleOutlinedIcon />}
                  onChange={handleColourChange}
                  name="grey"
                  checked={grey}
                  checkedIcon={<CircleSharpIcon />}
                />
              }
              label={'Grey'}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
