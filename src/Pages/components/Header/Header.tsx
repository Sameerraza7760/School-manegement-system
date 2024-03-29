import { MenuOutlined } from "@ant-design/icons";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminCredentials } from "../../../types/types.auth";
import Sidebar from "../Sidebar/Sidebar";

function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const adminDetail: AdminCredentials = useSelector(
    (state: any) => state.admin.admin
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route: string) => {
    setAnchorEl(null);
    navigate(route);
  };

  const showDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#001529" }}>
        <Toolbar>
          <Button
            type="text"
            className="text-white"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />
          <Sidebar visible={drawerVisible} onClosed={closeDrawer} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {adminDetail?.schoolName}
          </Typography>
          (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("/adminProfile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleClose("/adminProfile")}>
                My account
              </MenuItem>
            </Menu>
          </div>
          )
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
