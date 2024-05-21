import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import BasicMenu from '../BasicMenu/BasicMenu';

const NotificationBell = ({ iconColor, badgeContents, badgeColor }) => {
  const newNotifications = `You have ${badgeContents} new notifications!`;
  const noNotifications = `You have no new notifications!`;

  // Make open states false by default
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const notifications = [
    {
      id: 0,
      label: "test",
    },
    {
      id: 1,
      label: "test2",
    },
  ]

  return (
    <>
    <Tooltip title={notifications.length ? newNotifications : noNotifications}>
      <IconButton
        color={iconColor}
        onClick={notifications.length ? handleOpen : null}
        anchorEl={anchorEl}
      >
        <Badge
          badgeContent={badgeContents}
          color={badgeColor}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
    <BasicMenu
      open={open}
      anchorEl={anchorEl}
      handleClose={handleClose}
      menuItems={notifications}
    >

    </BasicMenu>
  </>
  )
}

export default NotificationBell