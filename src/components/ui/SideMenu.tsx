import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AdminPanelSettings,
  Home,
  Category,
  FamilyRestroom,
  ShoppingCart,
  PointOfSale,
  PeopleAlt,
  ExitToApp,
} from "@mui/icons-material";
import { useUi } from "../../hooks/useUi";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export const SideMenu = () => {
  const navigate = useNavigate();
  const { isMenuOpen, toggleSideMenu } = useUi();
  const { auth, logout } = useAuth();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    navigate(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}>
      <Box sx={{ width: 200, paddingTop: 5 }}>
        <List>
          <>
            <ListItem
              onClick={() => navigateTo("/admin")}
              sx={{ cursor: "pointer" }}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem
              onClick={() => navigateTo("/admin/patient-list")}
              sx={{ cursor: "pointer" }}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary={"Patientes"} />
            </ListItem>
          </>

          <ListItem onClick={logout} sx={{ cursor: "pointer" }}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>

          {/* Admin */}
          {auth?.roles!.includes("admin") && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem sx={{ cursor: "pointer" }}
               onClick={() => navigateTo("/admin/user-list")}
              >
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
           )} 
        </List>
      </Box>
    </Drawer>
  );
};
