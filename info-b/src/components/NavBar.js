import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../resources/images/main/logo_t.png";
import "../styles/components/_navbar.scss";

function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [menuAnchors, setMenuAnchors] = useState({});

  const menuItems = [
    {
      title: "회사소개",
      path: "/company",
      submenu: [
        { title: "CEO 인사말", path: "/company/ceo" },
        { title: "연혁 및 조직도", path: "/company/history" },
        { title: "인증 및 특허", path: "/company/certification" },
      ],
    },
    {
      title: "사업소개",
      path: "/business",
      submenu: [
        { title: "사업정보", path: "/business/info" },
        { title: "R&D 연구사업", path: "/business/research" },
      ],
    },
    {
      title: "수행실적",
      path: "/performance",
      submenu: [{ title: "구축사례", path: "/performance/cases" }],
    },
    {
      title: "채용",
      path: "/recruitment",
      submenu: [
        { title: "인재상", path: "/recruitment/talent" },
        { title: "복리후생", path: "/recruitment/benefits" },
      ],
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuOpen = (event, index) => {
    setMenuAnchors({ ...menuAnchors, [index]: event.currentTarget });
  };

  const handleMenuClose = (index) => {
    setMenuAnchors({ ...menuAnchors, [index]: null });
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
    setMenuAnchors({});
  };

  return (
    <AppBar position="fixed" className="navbar" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 4,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            <img src={logo} alt="INFOB" className="navbar__logo" />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={item.title}
                  onClick={() => handleNavigate(item.path)}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            <img src={logo} alt="INFOB" className="navbar__logo" />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuItems.map((item, index) => (
              <div key={item.title}>
                <Button
                  onClick={(e) => handleMenuOpen(e, index)}
                  sx={{
                    my: 2,
                    mx: 1,
                    color: "inherit",
                    display: "block",
                    fontSize: "1rem",
                    fontFamily: "paybooc Medium",
                  }}
                >
                  {item.title}
                </Button>
                <Menu
                  anchorEl={menuAnchors[index]}
                  open={Boolean(menuAnchors[index])}
                  onClose={() => handleMenuClose(index)}
                  TransitionComponent={Fade}
                  MenuListProps={{
                    onMouseLeave: () => handleMenuClose(index),
                  }}
                >
                  {item.submenu.map((subItem) => (
                    <MenuItem
                      key={subItem.title}
                      onClick={() => handleNavigate(subItem.path)}
                      sx={{
                        fontFamily: "paybooc Medium",
                        minWidth: "150px",
                      }}
                    >
                      {subItem.title}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
