import React, { Fragment, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
//Layout
import Layout from "../components/Layout";
// Pages
const Homepage = lazy(() => import("./home"));
const Detail = lazy(() => import("./detail"));
const Catalogo = lazy(() => import("./catalogo"));
const Dashboard = lazy(() => import("./dashboard"));
const Login = lazy(() => import("./login"));
const Articles = lazy(() => import("./articles"));
const ArticleDetail = lazy(() => import("./articleDetail"));
const Diet = lazy(() => import("./diet"));
const DietDetail = lazy(() => import("./dietDetail"));

export default function AppNavigation() {
  return (
    <Fragment>
      <Layout>
        <Suspense fallback={<div>Cargando...</div>}>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/about" exact component={Homepage} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/catalogo" exact component={Catalogo} />
            <Route path="/articulos" component={Articles} />
            <Route path="/articulo/:id" component={ArticleDetail} />
            <Route path="/dieta" exact component={Diet} />
            <Route path="/dieta/:animal/:age/:breed/" component={DietDetail} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route component={Homepage} />
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
}
