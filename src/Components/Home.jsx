import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState(null);
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:49407/api/GetAllStartups");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      console.log("responseData :", responseData);
    } catch (error) {
      window.alert("Error occured!", error);
      console.error("Error making GET request:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `http://localhost:49407/api/DeleteStartup/${itemId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If the deletion is successful, fetch updated data
        window.alert("Company deleted successfully!");
        fetchData();
      } catch (error) {
        window.alert("Error making DELETE request:", error);
        console.error("Error making DELETE request:", error);
      }
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {data ? (
          <>
            {data.map((item) => (
              <div key={item.startupCompanyId} className="col-md-3">
                <div className="card m-3">
                  <div className="card-body">
                    <h5 className="card-title">Founder :{item.founderName}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link
                      className="btn btn-primary"
                      to={`/updateStartup/${item.startupCompanyId}`}
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={(e) => handleDelete(item.startupCompanyId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
