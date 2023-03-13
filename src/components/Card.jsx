import React, { useState, useEffect } from "react";
import dice from "../images/icon-dice.svg";
import Loading from "./Loading";

const Card = () => {
  const [random, setRandom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState({
    id: "",
    advice: "",
  });

  const handleClick = () => {
    setRandom(!random);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(function () {
      const getData = async () => {
        let res = await fetch("https://api.adviceslip.com/advice");
        let data = await res.json();
        /*   console.log(data) */
        setAdvice({
          id: data.slip.id,
          advice: data.slip.advice,
        });
      };
      getData();
      setLoading(false);
    }, 1000);
  }, [random]);

  console.log(advice);

  return (
    <>
      <div className="container-fluid section-container-main">
        <div className="section-card">
          <h5> ADVICE #{advice.id}</h5>
          {loading ? (
            <Loading />
          ) : (
            <h2>
              {" "}
              <q>{advice.advice}</q>{" "}
            </h2>
          )}

          <div className="pattern" />
          <div onClick={handleClick} className="dice">
            <img src={dice} />
          </div>
        </div>
      </div>
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://github.com/OctopusMichael">Michael Diaz</a>.
        </div>
    </>
  );
};

export default Card;
