import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import AddProduct from './AddProduct';

// import Button from '@mui/material/Button';
// import SaveIcon from '@mui/icons-material/Save';
// import './index.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Brand = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        centered
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab label="Dashboard" />
        <Tab label="Add New Product" />
        <Tab label="Your Products" />
        <Tab label="Orders" />
        <Tab label="Account Settings" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddProduct />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </Box>
  );
};

export default Brand;
