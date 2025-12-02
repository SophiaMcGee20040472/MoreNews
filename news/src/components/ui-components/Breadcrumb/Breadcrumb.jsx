import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";

// Mapping route paths to friendly display names
const breadcrumbNameMap = {
  home: "Home",
  new: "New",
  past: "Past",
  ask: "Ask us",
  show: "Show us",
  submit: "Submit News",
  comments: "Comments",
};

function Breadcrumbs() {
  const location = useLocation(); // Get current URL path
  const navigate = useNavigate(); // Allows programmatic navigation
  const pathnames = location.pathname.split("/").filter((x) => x); // Split path into segments

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      mt="60px"
      ml={{ base: "25px", lg: "25px", xl: "35px" }}
      mb={{ base: "-30px", md: "-5px" }}
    >
      {/* Breadcrumb navigation */}
      <Breadcrumb
        spacing="12px"
        separator="›" // Separator symbol
        fontWeight="medium"
        color="#ff7600"
        fontSize={{ base: "sm", md: "md" }}
      >
        {/* Home icon link */}
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/home">
            <Icon as={FaHome} boxSize={4} ml="auto" data-testid="fa-icon"/>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Map through URL segments to create breadcrumbs */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`; // make path for this breadcrumb
          const isLast = index === pathnames.length - 1; // Work out if its the last segment

          return (
            <BreadcrumbItem key={to} isCurrentPage={isLast}>
              {isLast ? (
                // Last segment show as plain text not active link
                <Box as="span" color="#ff7600" fontWeight="semibold">
                  {breadcrumbNameMap[value] || value}
                </Box>
              ) : (
                // Other segments are clickable links
                <BreadcrumbLink as={RouterLink} to={to}>
                  {breadcrumbNameMap[value] || value}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {/* Back button: only show if not on the home page */}
      {location.pathname !== "/home" && (
        <Button
          size="sm"
          color="#ff7600"
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          _hover={{ bg: "transparent", color: "orange.300" }}
          onClick={() => navigate(-1)} // Navigate back one 
          mr={{ base: "0", lg: "25px", xl: "30px" }}
        >
          Back
        </Button>
      )}
    </Flex>
  );
}

export default Breadcrumbs;
