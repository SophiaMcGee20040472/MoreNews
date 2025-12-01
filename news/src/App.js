import { Flex, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/pageComponents/SidebarComponent/Sidebar";
import NewPostsPage from "./pages/NewestPostPage";
import Breadcrumbs from "./components/ui-components/Breadcrumb/Breadcrumb";
import SubmitPage from "./pages/SubmitPage";
import HomePage from "./pages/Homepage";
import PastPage from "./pages/PastPage";
import AskUsPage from "./pages/AskUsPage";
import ShowUsPage from "./pages/ShowUsPage";
import LoginPage from "./pages/LoginPage";
import CommentPage from "./pages/CommentPage";
import JobPage from "./pages/JobPage";

// asked ai for an image URL with abstract random tech that would change so got this url back
const BG_IMAGE_URL = "https://picsum.photos/1920/1080?random=tech-abstract";

function App() {

  return (
    <Router>
      <Flex position="relative" minH="100vh" zIndex="1">
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0"
          opacity="0.08"
          bgImage={`url(${BG_IMAGE_URL})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        />
        <Sidebar />
        <Box
          flex="1"
          p={4}
          ml={{ base: 0, md: "3%", lg:'28%' }}
          minH="100vh"
          position="relative"
          zIndex="2"
        >
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new" element={<NewPostsPage />} />
            <Route path="/past" element={<PastPage pastId={8863} />} />
            <Route path="/ask" element={<AskUsPage />} />
            <Route path="/show" element={<ShowUsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
             <Route path="/jobs" element={<JobPage />} />
            <Route
              path="/comments"
              element={<CommentPage/>}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
