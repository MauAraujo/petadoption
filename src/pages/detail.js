import React, { Fragment, useEffect, useState } from "react";
//components
import ActionCard from "../components/ActionCard";
import DetailCard from "../components/DetailCard";
import DetailHero from "../components/DetailHero";

import { getPublication } from "../services/publications.service";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const [publication, setpublication] = useState(null);
  const path = useLocation().pathname.split("/");
  const publicationID = path[path.length - 1];

  useEffect(() => {
    async function fetchPublication() {
      const item = await getPublication(publicationID);
      console.log(item);
      setpublication(item);
    }
    fetchPublication();
  }, []);

  return (
    <Fragment>
      <div className="container my-4">
        <DetailHero pet={publication || {}} />
      </div>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <DetailCard className="col" />
          </div>
          <div id="action-card-container" className="col">
            <ActionCard pet={publication || {}} className="col" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
