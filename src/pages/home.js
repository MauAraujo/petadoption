import React, { useEffect, useState } from "react";
//components
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Available from "../components/Available";
import Steps from "../components/Steps";
import DiscoverCard from "../components/DiscoverCard";
import Widget from "rasa-webchat";
import "../services/publications.service";
import { getPublications } from "../services/publications.service";
import { useHistory, Link } from "react-router-dom";

export default function Homepage() {
  const [publications, setpublications] = useState([]);
  const rasaURL = process.env.REACT_APP_RASA_URL;

  useEffect(() => {
    async function fetchPublications() {
      let publications = await getPublications();
      publications = publications?.slice(
        publications.length - 6,
        publications.length
      );
      setpublications(publications);
    }
    fetchPublications();
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
        initPayload={"/get_started"}
        socketUrl={rasaURL}
        socketPath={"/socket.io/"}
        customData={{ language: "es" }}
        title={"Información sobre mascotas"}
        customMessageDelay={(message) => {
          let delay = message.length * 30;
          if (delay > 2 * 1000) delay = 3 * 1000;
          if (delay < 400) delay = 1000;
          return delay;
        }}
        hideWhenNotConnected={true}
        showMessageDate={true}
        params={{
          storage: "session",
        }}
        inputTextFieldHint={"Escribe un mensaje"}
        showFullScreenButton={true}
        displayUnreadCount={true}
      />
    </div>
  );
}
