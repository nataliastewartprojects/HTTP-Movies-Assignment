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
        setItem(res.data);
      })
      .catch((err) => console.log("UpdateMovie-get-error:", err));
  }, [id]);

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        // console.log("PUT-RES:", res);
        const newMovieList = props.movies.map((item) => {
          if (item.id === res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        props.setMovieList(newMovieList);
        push(`/`);
      })
      .catch((err) => console.log("PUT REQUEST ERROR:", err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="label">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
        />
        <label htmlFor="Director" className="label">
          Director:
        </label>
        <input
          type="text"
          name="director"
          value={item.director}
          onChange={handleChange}
        />
        <label htmlFor="Metascore" className="label">
          Metascore:
        </label>
        <input
          type="text"
          name="metascore"
          value={item.metascore}
          onChange={handleChange}
        />
        <label htmlFor="Starts" className="label">
          Starts:
        </label>
        <input type="text" name="Starts" />
        <button className="add-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
