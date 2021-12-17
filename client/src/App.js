import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CompanyDetail } from "./CompanyDetail";
import { LoginForm } from "./LoginForm";
import { JobBoard } from "./JobBoard";
import { JobDetail } from "./JobDetail";
import { JobForm } from "./JobForm";
import { NavBar } from "./NavBar";

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogout = () => setLoggedIn(false);
  const onLogin = () => setLoggedIn(true);
  return (
    <Router>
      <div>
        <NavBar loggedIn={loggedIn} onLogout={onLogout} />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/" component={JobBoard} />
              <Route path="/companies/:companyId" component={CompanyDetail} />
              <Route exact path="/jobs/new" component={JobForm} />
              <Route path="/jobs/:jobId" component={JobDetail} />
              <Route
                exact
                path="/login"
                render={() => <LoginForm onLogin={onLogin} />}
              />
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
}
