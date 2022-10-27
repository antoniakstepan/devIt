import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { Table } from './Table'
export const Home = () => {
  const [data, setData] = useState(null);
  
  const serchItems = useCallback(async() => {
    const responce = await fetch(`/api/items`)
    const data = await responce.json()
    console.log(data, 'data')
    setData(data)
  }, []);

  useEffect(() => {
    serchItems()
  }, []);

  if (!data) return null;
  return (
    <div id="container" className="App">
      <div className="header">
        <Link to={'/admin'} className="header-btn">Admin</Link>
      </div>
      <Table data={data} itemsPerPage={5}/>
    </div>
  );
}