import React, { Fragment } from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
//Layout
import Layout from "../components/layout";
// Pages
import Homepage from "./homepage";
import Detail from "./detail";
import Catalogo from "./catalogo";
import Dashboard from "./dashboard";
import Login from "./login";
import Articles from "./articles";
import ArticleDetail from './article-detail';

export default function AppNavigation(){
    return (
      <Fragment>
        {/* <Legal/> */}
        <Layout>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/about" exact component={Homepage} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/catalogo" exact component={Catalogo} />
            <Route path="/articulos" exact component={Articles}/>
            <Route path="/articulos/:id" exact component={ArticleDetail}/>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route component={Homepage} />
          </Switch>
        </Layout>
      </Fragment>
    );
}
