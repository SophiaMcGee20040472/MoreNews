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
      <Flex {...styles.sidebarContainer} mt={{ base: 0, md: "-50px" }}>
        <Box {...styles.titleSection}>
          <Box
            as="img"
            src={logo}
            alt="Logo"
            display={{ base: "none", md: "block" }}
          />
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
        <Box {...styles.desktopNavBox}>
          {navItems.map((item) => (
            <Flex
              key={item.name}
              as={Link}
              href={item.path}
              {...styles.desktopNavLink}
            >
              {iconMap[item.icon]}
              <Text>{item.name}</Text>
            </Flex>
          ))}
        </Box>
        <Box {...styles.mobileMenuBox}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="white"
              aria-label="Navigation Menu"
            />
            <MenuList {...styles.menuList}>
              {navItems.map((item) => (
                <MenuItem
                  key={item.name}
                  as={Link}
                  href={item.path}
                  {...styles.menuItem}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Box h={{ base: "60px", md: "0" }} w={{ base: "100%", md: "0" }} />
    </Box>
  );
};

export default Sidebar;
