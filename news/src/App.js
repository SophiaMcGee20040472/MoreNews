import { Flex, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing app components and pages
import Sidebar from "./components/ui-components/Sidebar/Sidebar";
import Breadcrumbs from "./components/ui-components/Breadcrumb/Breadcrumb";
import HomePage from "./pages/Homepage";
import NewPostsPage from "./pages/NewestPostPage";
import PastPage from "./pages/PastPage";
import AskUsPage from "./pages/AskUsPage";
import ShowUsPage from "./pages/ShowUsPage";
import SubmitPage from "./pages/SubmitPage";
import LoginPage from "./pages/LoginPage";
import CommentPage from "./pages/CommentPage";
import JobPage from "./pages/JobPage";

// I asked I ai for an image that changed that I could use in the Background it gave me image URL (abstract tech image from Picsum)
const BG_IMAGE_URL = "https://picsum.photos/1920/1080?random=tech-abstract";

function App() {
  return (
    // Router wraps the entire app to enable client-side routing
    <Router>
      {/* Main container using Flex for sidebar + main content layout */}
      <Flex position="relative" minH="100vh" zIndex="1">

        {/* Background image */}
        <Box
          position="fixed" 
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0" // Behind everything
          opacity="0.08" 
          bgImage={`url(${BG_IMAGE_URL})`} 
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        />

        {/* Sidebar navigation */}
        <Sidebar />

        {/* Main content area */}
        <Box
          flex="1" // Take remaining space next to sidebar
          p={4}
          ml={{ base: 0, md: "3%", lg: "28%" }} 
          minH="100vh"
          position="relative" // Stack above background
          zIndex="2"
        >
          {/* Breadcrumb navigation at top */}
          <Breadcrumbs />
          <Routes>
            {/* Redirect root "/" to "/home" */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Main pages */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/new" element={<NewPostsPage />} />
            <Route path="/past" element={<PastPage pastId={8863} />} />
            <Route path="/ask" element={<AskUsPage />} />
            <Route path="/show" element={<ShowUsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/comments" element={<CommentPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* redirects to home if any route goes wrong */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
