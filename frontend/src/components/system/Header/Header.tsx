import React, { useEffect, useRef, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './styles.scss';
import AccountMenu from '@components/system/Header/components/AccountMenu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge, IconButton, Menu, MenuItem, Typography
} from '@mui/material';
import Colors from '@colors';

function Header(props: MOBXDefaultProps) {
  const headerRef = useRef(null);

  const currentUsersNotificationsList = props.AppStore.usersNotifications;

  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const handleOpenSettingsMenu = (e) => {
    e.stopPropagation();

    if (e.currentTarget) setAnchorEl(e.currentTarget);
  };

  const handleCloseSettingsMenu = (e: MouseEvent) => {
    e.stopPropagation();

    setAnchorEl(null);
  };

  return (
    <header ref={headerRef} className="d-flex align-items-center px-4 header">
      <div className="header__right d-flex flex-row gap-3">
        <IconButton onClick={handleOpenSettingsMenu}>
          <Badge badgeContent={currentUsersNotificationsList.length} color="secondary">
            <NotificationsIcon style={{ color: Colors.white }} />
          </Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          keepMounted={false}
          open={Boolean(anchorEl)}
          onClose={handleCloseSettingsMenu}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {currentUsersNotificationsList.map(notify => {
            return (
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseSettingsMenu(e);
                  props.history.push('/tickets/me?id=' + notify.claimId);
                }}
              >
                <div className="d-flex flex-row align-items-center gap-2">
                  <Typography variant="h5">{notify.text}</Typography>
                  <Typography variant="h6">{notify.time_ago}</Typography>
                  <Typography variant="h6">минут назад</Typography>
                </div>
              </MenuItem>
            );
          })}

        </Menu>
        <AccountMenu headerRef={headerRef} />
      </div>
    </header>
  );
}

export default MobXRouterDecorator(Header);
