import React, { Fragment, useEffect, useState } from "react";
//components
import ActionCard from "../components/actionCard";
import DetailCard from "../components/detailCard";
import DetailHero from "../components/detailHero";

import { getPublication } from "../services/publications.service";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const [publication, setpublication] = useState(null);
  const path = useLocation().pathname.split("/")

  const publicationID = path[path.length- 1]
  // console.log(publicationID)
  useEffect( () => {
    async function fetchPublication() {

      setpublication(await getPublication(publicationID || "1590121969131"))
    }
    fetchPublication()
    console.log(publication)

  },[])

  return (
    <Fragment>
      <div className="container my-4">
        <DetailHero pet={publication?.content || {}}/>
      </div>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <DetailCard className="col" />
          </div>
          <div id="action-card-container" className="col">
            <ActionCard className="col" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
