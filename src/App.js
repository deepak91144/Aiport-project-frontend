import "./App.css";
import Signup from "./components/auth/Signup";
import Base from "./components/Base";
import { Switch, Route } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/Dashboard";
import Airport from "./components/Airport";
import Aircraft from "./components/Aircraft";
import Transaction from "./components/Transaction";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute exact path="/dashboard/airport" component={Airport} />
        <PrivateRoute exact path="/dashboard/aircraft" component={Aircraft} />
        <PrivateRoute
          exact
          path="/dashboard/transaction"
          component={Transaction}
        />
        {/* <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/airport" component={Airport} />
        <Route exact path="/dashboard/aircraft" component={Aircraft} />
        <Route exact path="/dashboard/transaction" component={Transaction} /> */}
        <Route component={Signin} />
      </Switch>
    </>
  );
}

export default App;
