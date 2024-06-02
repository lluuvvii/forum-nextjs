import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { IconUser } from "@tabler/icons-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [token, setToken] = useState<any>(null)
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    setToken(localStorage?.getItem('token'))
  }, [])


  return (
    <>
      {token ?
        <Box>
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl2 === "object" && {
                color: "primary.main",
              }),
            }}
            onClick={handleClick2}
          >
            {/* <Avatar src="/images/profile/user-1.jpg" alt="image" sx={{ width: 35, height: 35, }} /> */}
            <Avatar sx={{ width: 35, height: 35, bgcolor: '#ff9d00' }}>L</Avatar>
          </IconButton>
          {/* ------------------------------------------- */}
          {/* Message Dropdown */}
          {/* ------------------------------------------- */}
          <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "200px",
              },
            }}
          >
            <ListItemButton href="/profile" LinkComponent={Link}>
              <ListItemIcon>
                <IconUser width={20} />
              </ListItemIcon>
              <ListItemText>
                My Profile
              </ListItemText>
            </ListItemButton>
            <Box mt={1} py={1} px={2}>
              <LogoutButton />
            </Box>
          </Menu>
        </Box>
        :
        <Box mt={1} py={1} px={2}>
          <LoginButton />
        </Box>
      }
    </>
  );
};

export default Profile;
