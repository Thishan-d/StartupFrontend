import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

function Addstartup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BusinessDomain: "",
    Description: "",
    GrossSales: "",
    NetSales: "",
    BusinessStartDate: "",
    Website: "",
    BusinessLocation: "",
    EmployeeCount: "",
    FounderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const [errors, setErrors] = useState({});

  async function handlePostRequest(postData) {
    try {
      const response = await fetch("http://localhost:49407/api/CreateStartup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        window.alert("Response is not ok:");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      window.alert("POST request successful:", responseData);
      navigate("/");
    } catch (error) {
      window.alert("Error making POST request:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    console.log("Submit clicked");
    console.log(formData.BusinessDomain);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form data submitted:", formData);
      handlePostRequest(formData);
    }
  }

  const validateForm = (data) => {
    let errors = {};
    if (!data.FounderName) {
      errors.FounderName = "Founder Name is required";
    }
    if (!data.BusinessDomain) {
      errors.BusinessDomain = "Business Domain is required";
    }
    if (!data.Description) {
      errors.Description = "Description is required";
    }

    if (!data.GrossSales || isNaN(data.GrossSales)) {
      errors.GrossSales = "Gross Sales must be a valid number";
    } else if (Number(data.GrossSales) < 0) {
      errors.GrossSales = "Gross Sales cannot be negative";
    }

    if (Number(data.GrossSales) < Number(data.NetSales)) {
      console.log("GrossSales :", data.GrossSales);
      console.log("NetSales :", data.NetSales);
      errors.GrossSales = "Gross Sales value have to be larger";
    }

    if (!data.NetSales || isNaN(data.NetSales)) {
      errors.NetSales = "Net Sales must be a valid number";
    } else if (Number(data.NetSales) < 0) {
      errors.NetSales = "Net Sales cannot be negative";
    }

    if (!data.BusinessStartDate) {
      errors.BusinessStartDate = "Business Start Date is required";
    } else {
      const today = new Date();
      const selected = new Date(data.BusinessStartDate);
      if (today < selected) {
        errors.BusinessStartDate =
          "Business Start Date cannot be a future date";
      }
    }

    if (!data.Website) {
      errors.Website = "Website is required";
    }

    if (!data.BusinessStartDate) {
      errors.BusinessLocation = "Business Location is required";
    }

    if (!data.EmployeeCount) {
      errors.EmployeeCount = "Employee Count is required";
    } else if (Number(data.EmployeeCount) <= 0) {
      errors.EmployeeCount = "Enter valid employee count";
    }

    return errors;
  };

  return (
    <div className="center-container border ">
      <form className="w-75 " onSubmit={handleSubmit}>
        <div className="w-75">
          <h3 className="text-info">Register Startup</h3>
        </div>

        <div className="form-group">
          <label className="mt-2 h5">Founder Name:</label>
          <div className="col-md-9">
            <input
              type="text"
              name="FounderName"
              className="form-control"
              value={formData.FounderName}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.FounderName}</span>
        </div>

        <div className="form-group">
          <label className="mt-2 h5">Business Domain:</label>
          <div className="col-md-9">
            <input
              type="text"
              name="BusinessDomain"
              className="form-control"
              value={formData.BusinessDomain}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.BusinessDomain}</span>
        </div>

        <div className="form-group">
          <label className="mt-2 h5">Description:</label>
          <div className="col-md-9">
            <input
              type="text"
              name="Description"
              className="form-control"
              value={formData.Description}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.Description}</span>
        </div>

        <div className="form-group row">
          <div className="col-md-3">
            <div>
              <label className="mt-2 h5">Gross Sales:</label>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                name="GrossSales"
                className="form-control"
                value={formData.GrossSales}
                onChange={handleChange}
              />
            </div>
            <span className="text-danger">{errors.GrossSales}</span>
          </div>

          <div className="col-md-3">
            <div>
              <label className="mt-2 h5">Net Sales:</label>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                name="NetSales"
                className="form-control"
                value={formData.NetSales}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.NetSales}</span>
            </div>
          </div>

          <div className="col-md-3">
            <div>
              <label className="mt-2 h5">Business Start Date:</label>
            </div>
            <div className="col-md-12">
              <input
                type="date"
                name="BusinessStartDate"
                className="form-control"
                value={formData.BusinessStartDate}
                onChange={handleChange}
              />
              <span className="text-danger">{errors.BusinessStartDate}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="mt-2 h5">Website:</label>
          <div className="col-md-9">
            <input
              type="text"
              name="Website"
              className="form-control"
              value={formData.Website}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.Website}</span>
        </div>

        <div className="form-group">
          <label className="mt-2 h5">Business Location:</label>
          <div className="col-md-9">
            <input
              type="text"
              name="BusinessLocation"
              className="form-control"
              value={formData.BusinessLocation}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.BusinessLocation}</span>
        </div>

        <div className="form-group row">
          <div>
            <label className="mt-2 h5">Employee Count:</label>
            <div className="col-md-3">
              <input
                type="number"
                name="EmployeeCount"
                className="form-control"
                value={formData.EmployeeCount}
                onChange={handleChange}
              />
            </div>
            <span className="text-danger">{errors.EmployeeCount}</span>
          </div>
        </div>

        <div className="text-center col-md-9">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addstartup;
