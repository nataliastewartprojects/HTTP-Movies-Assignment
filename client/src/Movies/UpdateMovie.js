import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateMovie(props) {
  const [item, setItem] = useState(initialState);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log("UpdateMovie-get-Res:", res);
        setItem(res.data);
      })
      .catch((err) => console.log("UpdateMovie-get-error:", err));
  }, [id]);

  return (
    <div>
      <form>
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input type="text" name="title" />
        <label htmlFor="Director" className="label">
          Director:
        </label>
        <input type="text" name="Director" />
        <label htmlFor="Metascore" className="label">
          Metascore:
        </label>
        <input type="text" name="Metascore" />
        <label htmlFor="Starts" className="label">
          Starts:
        </label>
        <input type="text" name="Starts" />
      </form>
    </div>
  );
}
