import "./App.css";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostList, Login, Signup } from "../pages";
import Header from "../components/Header";
import { Grid } from "../elements";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
