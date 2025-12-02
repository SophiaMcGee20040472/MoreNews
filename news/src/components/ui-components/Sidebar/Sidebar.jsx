import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
} from "@chakra-ui/react";
import logo from "../../../assets/logo.png"; 
import { HamburgerIcon } from "@chakra-ui/icons";
import { navItems, iconMap } from "../../../NavData/NavData"; 
import { styles } from "../../../styles/styles"; 

const Sidebar = () => {
  return (
    <Box>
      {/* Sidebar container */}
      <Flex {...styles.sidebarContainer} mt={{ base: 0, md: "-50px" }}>
        
        {/* Logo section */}
        <Box {...styles.titleSection}>
          {/* Desktop logo hidden on small screens */}
          <Box
            as="img"
            src={logo}
            alt="Logo"
            display={{ base: "none", md: "block" }}
          />
          {/* Mobile logo - visible only on small screens */}
          <Box
            as="img"
            src={logo}
            alt="Mobile Logo"
            display={{ base: "block", md: "none" }}
            boxSize="140px"
            marginTop="-5px"
            objectFit="contain"
          />
        </Box>

        {/* Desktop navigation links */}
        <Box {...styles.desktopNavBox}>
          {navItems.map((item) => (
            <Flex
              key={item.name}
              as={Link}
              href={item.path} // Navigation link
              {...styles.desktopNavLink}
            >
              {iconMap[item.icon]} {/* Display associated icon */}
              <Text>{item.name}</Text> {/* Display link name */}
            </Flex>
          ))}
        </Box>

        {/* Mobile hamburger menu */}
        <Box {...styles.mobileMenuBox}>
          <Menu>
            {/* Hamburger button to open mobile menu */}
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="white"
              aria-label="Navigation Menu"
            />
            {/* Dropdown menu for mobile */}
            <MenuList {...styles.menuList}>
              {navItems.map((item) => (
                <MenuItem
                  key={item.name}
                  as={Link}
                  href={item.path} // Mobile navigation link
                  {...styles.menuItem}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      {/* Spacer for mobile to prevent content overlap */}
      <Box h={{ base: "60px", md: "0" }} w={{ base: "100%", md: "0" }} />
    </Box>
  );
};

export default Sidebar;
