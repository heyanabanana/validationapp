// CSS FILES
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import theme from "./styles/theme";
import Fonts from "./styles/fonts";

// IMPORTS
import SectionContainer from "./components/SectionContainer";
import { UserContextProvider } from "./config/UserContext";
import { Route } from "wouter";
import { ChakraProvider } from "@chakra-ui/react";

// PAGES
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import UploadImages from "./pages/UploadImages.js";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <UserContextProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <SectionContainer className="App">
          <NavBar />
          <Route path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/dashboard" component={AdminDashboard} />

          <Route path="/onboarding/:hashcode">
            {(params) => <UploadImages id={params.hashcode} />}
          </Route>

        </SectionContainer>
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default App;
