import React from 'react';
import { ListItem, ListItemText, Icon, useTheme, styled } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { hexToRgbA } from '../utils/helpers';

type CustomDrawerItemProps = {
  name: string;
  icon: string;
};

const EnhancedListItem = styled(ListItem)`
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;
`;
const EnhancedIcon = styled(Icon)`
  margin-right: 10px;
  font-size: 24px;
`;

/**
 * CustomDrawerItem component.
 * @description This component is used in the CustomDrawer component for displaying the drawer items.
 */
export const CustomDrawerItem = ({ name, icon }: CustomDrawerItemProps) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const theme = useTheme();

  /** Determines whether the item is active by checking if the router path is equal. */
  const active = pathname === `/${name.toLowerCase()}`;

  /** The name and icon color depending on the active variable. */
  const color = active
    ? theme.palette.secondary.main
    : theme.palette.primary.contrastText;
  /** The background color depending on the active variable. */
  const backgroundColor = active
    ? hexToRgbA(theme.palette.secondary.main, 0.2)
    : `inherit`;
  /** The background opacity depending on the active variable. */
  const opacity = active ? 1 : 0.8;

  return (
    <EnhancedListItem
      key={name}
      style={{
        backgroundColor,
        opacity,
      }}
      onClick={() => history.push(`/${name.toLowerCase()}`)}
    >
      <EnhancedIcon style={{ color }}>{icon}</EnhancedIcon>
      <ListItemText primary={name} style={{ color }} />
    </EnhancedListItem>
  );
};
