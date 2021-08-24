import React, { useEffect, useState } from "react";
//components
import Hero from "../components/Hero";
import SearchBar from "../components/search-bar";
import Available from "../components/available";
import Steps from "../components/steps";
import DiscoverCard from "../components/discover-card";
import Widget from 'rasa-webchat';
import "../services/publications.service";
import { getPublications } from "../services/publications.service";
import { useHistory } from "react-router-dom";

export default function Homepage() {
  const [publications, setpublications] = useState([]);

  useEffect(() => {
    async function fetchPublications() {
      let publications = await getPublications();
      publications = publications?.slice(publications.length - 6, publications.length);
      setpublications(publications);
    }
    fetchPublications();
    console.log(publications);
  }, []);

  return (
    <div className="grid-container">
      <Hero />
      <SearchBar history={useHistory()} _ />
      <Available publications={publications} />

      <section className="steps">
        <Steps />
      </section>
      <div className="discovery-container discovery">
        <DiscoverCard />
      </div>
      <Widget
        initPayload={"/utter_greet"}
        socketUrl={"http://localhost:5005"}
        socketPath={"/socket.io/"}
        customData={{ "language": "es" }} // arbitrary custom data. Stay minimal as this will be added to the socket
        title={"Ayuda"}
        inputTextFieldHint={'Escribe un mensaje'}
        showFullScreenButton={true}
        displayUnreadCount={true}
      />
    </div>
  );
}
