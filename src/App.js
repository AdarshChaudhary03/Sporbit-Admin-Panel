import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/home";
import PayandPlay from "./pages/payandplay/PayandPlay";
import { AuthProvider } from "./auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Academies from "./pages/academies/Academies";
import Coaches from "./pages/coaches/Coaches";
import Sports from "./pages/sports/sports";
import Batches from "./pages/batches/batches";
import Members from "./pages/members/members";
import PrivateRoute from "../src/auth/PrivateRoute";
import Trials from "./pages/trialScreen/trialScreen";
import AcademyPrices from "./pages/pricing/AcademyPrices";
import Discounts from "./pages/pricing/Discounts";
import Coupons from "./pages/coupons/coupons";
import Socities from "./pages/socities/Socities";
import SportAcademyLinkage from "./pages/academy&sportLinking/sportAcademyLinkage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/pay&play" component={PayandPlay} />
          <PrivateRoute path="/academies" component={Academies} />
          <PrivateRoute path="/users" component={Members} />
          <PrivateRoute path="/batches" component={Batches} />
          <PrivateRoute path="/coupons" component={Coupons} />
          <PrivateRoute path="/coaches" component={Coaches} />
          <PrivateRoute path="/sports" component={Sports} />
          <PrivateRoute path="/trials" component={Trials} />
          <PrivateRoute path="/sportsLink" component={SportAcademyLinkage} />
          <PrivateRoute path="/academy/prices" component={AcademyPrices} />
          <PrivateRoute path="/discounts" component={Discounts} />
          <PrivateRoute path="/socities" component={Socities} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
