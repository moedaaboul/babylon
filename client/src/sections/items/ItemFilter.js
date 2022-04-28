import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Slider from '@mui/material/Slider';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

export default function RefineSidebar() {
  const [value, setValue] = React.useState([0, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left">
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key="Brand">
          <ListItemText primary="Brand" />
        </ListItem>
        <ListItem button key="Price">
          <ListItemText primary="Price" />
        </ListItem>
        <ListItem>
          <Slider
            getAriaLabel={() => 'Price Range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            marks={priceSliderMarks}
            getAriaValueText={valuetext}
          />
        </ListItem>
        <ListItem button key="Size">
          <ListItemText primary="Size" />
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="XS" />
              <FormControlLabel control={<Checkbox />} label="S" />
              <FormControlLabel control={<Checkbox />} label="M" />
              <FormControlLabel control={<Checkbox />} label="L" />
              <FormControlLabel control={<Checkbox />} label="XL" />
              <FormControlLabel control={<Checkbox />} label="6" />
              <FormControlLabel control={<Checkbox />} label="8" />
              <FormControlLabel control={<Checkbox />} label="10" />
              <FormControlLabel control={<Checkbox />} label="12" />
              <FormControlLabel control={<Checkbox />} label="14" />
              <FormControlLabel control={<Checkbox />} label="16" />
              <FormControlLabel control={<Checkbox />} label="18" />
              <FormControlLabel control={<Checkbox />} label="20" />
              <FormControlLabel control={<Checkbox />} label="22" />
            </FormGroup>
          </Collapse>
        </ListItem>

        <ListItem button key="Colour">
          <ListItemText primary="Colour" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
