import React, { Fragment, useEffect, useState } from "react";
//components
import Hero from "../components/Hero";
import SearchBar from "../components/search-bar";
import Available from "../components/available";
import Steps from "../components/steps";
import Help from "../components/help";
import DiscoverCard from "../components/discover-card";
import "../services/publications.service";
// import {
//   getPublications,
// } from "../services/publications.service";

export default function Homepage() {
  const [publications, setpublications] = useState([]);

    useEffect(() => {
    //    console.log('Mounted')
    //     async function fetchPublications() {
    //         let publications = await getPublications()
    //         publications = publications.slice(publications.length - 6, publications.length)
    //         setpublications(publications);
    // }
    //fetchPublications();
    //console.log(publications);
  }, []);

  return (
    <Fragment>
      <div className="container my-4">
        <Hero />
        <SearchBar />
        {/* <Available publications={publications} /> */}
      </div>
      <section className="bg-white">
        <div className="container my-3">
          <Steps />
        </div>
      </section>
      <div className="container my-4">
        <DiscoverCard />
      </div>
      <section className="bg-white">
        <div className="container my-3">
          <Help />
        </div>
      </section>
    </Fragment>
  );
}
