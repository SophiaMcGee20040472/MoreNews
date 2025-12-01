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
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      mt="60px"
      ml={{ base: "auto", lg: "40px", xl: "auto" }}
      mb={{ base: "-30px", md: "-5px" }}
    >
      <Breadcrumb
        spacing="12px"
        separator="›"
        fontWeight="medium"
        color="#ff7600"
        fontSize={{ base: "sm", md: "md" }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/home">
            <Icon as={FaHome} boxSize={4} ml="auto" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <BreadcrumbItem key={to} isCurrentPage={isLast}>
              {isLast ? (
                <Box as="span" color="#ff7600" fontWeight="semibold">
                  {breadcrumbNameMap[value] || value}
                </Box>
              ) : (
                <BreadcrumbLink as={RouterLink} to={to}>
                  {breadcrumbNameMap[value] || value}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {location.pathname !== "/home" && (
        <Button
          size="sm"
          color="#ff7600"
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          _hover={{ bg: "transparent", color: "orange.300" }}
          onClick={() => navigate(-1)}
          ml='auto'
        >
          Back
        </Button>
      )}
    </Flex>
  );
}

export default Breadcrumbs;
