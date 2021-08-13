import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import UserService from "../services/user.service";
import Plant from "./Plant";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Plants</h3>
      </header>
      <>
        {content && content.length ? (
          <div className="row d-flex">
            {" "}
            {content.map((plant) => (
              <Plant key={`plant-${uuid()}`} plant={plant} />
            ))}
          </div>
        ) : (
          <>
            <p className="no-plants">No plants were found</p>
          </>
        )}
      </>
    </div>
  );
};

export default Home;
