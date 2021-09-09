import React from 'react';
import { Drawer, Divider, List, Link, Box } from '@mui/material';
import { CustomDrawerItem } from './CustomDrawerItem';
import Logo from '../assets/Mercell-logo.png';

const frz = Object.freeze;

/**
 * @description A list of links to personal data.
 */
const PERSONAL_LINKS = frz([
  { value: `tel:+4746597743`, name: `Phone` },
  { value: `mailto:rcichockijobs@gmail.com`, name: `E-Mail` },
  { value: `https://github.com/norwegianbegginer`, name: `GitHub` },
  {
    value: `https://www.linkedin.com/in/rafa%C5%82-cichocki-436b881b6/`,
    name: `LinkedIn`,
  },
]);

/**
 * @description A list of column properties that are used to display in the head cells.
 */
const COLUMN_PROPS_LIST = frz([
  { name: `Countries`, icon: `public` },
  { name: `Languages`, icon: `translate` },
]);

/**
 * CustomDrawer component.
 * @description This component is used in the App component for displaying the drawer.
 */
const CustomDrawer = () => (
  <Drawer
    variant="permanent"
    anchor="left"
    PaperProps={{
      style: {
        border: 0,
        backgroundColor: `#fafafa`,
        width: 250,
      },
    }}
  >
    <img src={Logo} alt="Logo" style={{ width: `80%`, marginLeft: `10%` }} />
    <List style={{ paddingTop: 80 }}>
      {COLUMN_PROPS_LIST.map((item) => (
        <CustomDrawerItem key={item.name} {...item} />
      ))}
    </List>
    <Divider />
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="center"
      marginTop="16px"
      marginLeft="16px"
      marginRight="16px"
    >
      {PERSONAL_LINKS.map((l) => (
        <Link
          key={l.value}
          href={l.value}
          style={{
            color: `#000`,
            opacity: 0.7,
            marginRight: `10px`,
            marginBottom: `10px`,
          }}
        >
          {l.name}
        </Link>
      ))}
    </Box>
  </Drawer>
);

export default CustomDrawer;
