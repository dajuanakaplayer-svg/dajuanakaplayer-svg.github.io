import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import AdminApplications from "./pages/AdminApplications";
import WorldMap from "./pages/WorldMap";
import Timeline from "./pages/Timeline";
import PlayerStories from "./pages/PlayerStories";
import Leaderboards from "./pages/Leaderboards";
import Events from "./pages/Events";
import Rules from "./pages/Rules";
import FAQ from "./pages/FAQ";
import Coordinates from "./pages/Coordinates";
import { BackgroundAudio } from "./components/BackgroundAudio";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/payment" component={Payment} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/payment/cancel" component={PaymentCancel} />
      <Route path="/admin" component={Admin} />
      <Route path="/apply" component={Apply} />
      <Route path="/admin/applications" component={AdminApplications} />
      <Route path="/map" component={WorldMap} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/stories" component={PlayerStories} />
      <Route path="/leaderboards" component={Leaderboards} />
      <Route path="/events" component={Events} />
      <Route path="/rules" component={Rules} />
      <Route path="/faq" component={FAQ} />
      <Route path="/coordinates" component={Coordinates} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <BackgroundAudio />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
