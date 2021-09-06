import React, { Fragment, Suspense, lazy } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
//Layout
import Layout from "../components/layout";
// Pages
const Homepage = lazy(() => import("./homepage"));
const Detail = lazy(() => import("./detail"));
const Catalogo = lazy(() => import("./catalogo"));
const Dashboard = lazy(() => import("./dashboard"));
const Login = lazy(() => import("./login"));
const Articles = lazy(() => import("./articles"));
const ArticleDetail = lazy(() => import("./article-detail"));

export default function AppNavigation() {
  return (
    <Fragment>
      {/* <Legal/> */}
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
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route component={Homepage} />
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
}
