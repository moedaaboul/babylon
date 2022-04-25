import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Slider from '@mui/material/Slider';

const drawerWidth = 240;

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
            valueLabelDisplay={'£' + 'auto'}
            marks={priceSliderMarks}
            getAriaValueText={valuetext}
          />
        </ListItem>
        <ListItem button key="Size">
          <ListItemText primary="Size" />
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
