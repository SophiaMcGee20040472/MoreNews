import { Flex, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/pageComponents/SidebarComponent/Sidebar";
import NewPostsPage from "./pages/NewestPostPage";
import Breadcrumbs from "./components/ui-components/Breadcrumb";
import SubmitPage from "./pages/SubmitPage";
import HomePage from "./pages/Homepage";
import PastPage from "./pages/PastPage";
import AskUsPage from "./pages/AskUsPage";
import ShowUsPage from "./pages/ShowUsPage";
import LoginPage from "./pages/LoginPage";
import CommentPage from "./pages/CommentPage";

// asked ai for an image URL with abstract random tech that would change so got this url back
const BG_IMAGE_URL = "https://picsum.photos/1920/1080?random=tech-abstract";

function App() {
  const pastEvents = [
    {
      by: "dhouston",
      descendants: 71,
      id: 8863,
      kids: [
        8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067,
        8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
        8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876,
      ],
      score: 111,
      time: 1175714200,
      title: "My YC app: Dropbox - Throw away your USB drive",
      type: "story",
      url: "http://www.getdropbox.com/u/2/screencast.html",
    },
  ];
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
          ml={{ base: 0, md: "30%", lg:'28%' }}
          minH="100vh"
          position="relative"
          zIndex="2"
        >
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/new" element={<NewPostsPage />} />
            <Route path="/past" element={<PastPage events={pastEvents} />} />
            <Route path="/ask" element={<AskUsPage />} />
            <Route path="/show" element={<ShowUsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route
              path="/comments"
              element={<CommentPage commentId={2921983} />}
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
