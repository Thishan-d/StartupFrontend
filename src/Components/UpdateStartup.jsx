import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function UpdateStartup() {
  console.log("Update component reran");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startupCompanyId: 0,
    founderName: "",
    businessDomain: "",
    description: "",
    grossSales: 0,
    netSales: 0,
    businessStartDate: "",
    website: "",
    employeeCount: 0,
    businessLocation: "",
  });

  function formatDateForInput(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    let day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const params = useParams();
  const startupId = params.startupId;
  const [errors, setErrors] = useState({});
  const [changedData, setChangedData] = useState([]);

  async function fetchStartupData() {
    try {
      const response = await fetch(
        `http://localhost:49407/api/GetStartupById/${startupId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const startupData = await response.json();
      const modifiedDate = formatDateForInput(startupData.businessStartDate);
      startupData.businessStartDate = modifiedDate;
      setFormData(startupData);
      console.log("form Data :", formData);
      console.log("startup Data :", startupData);
    } catch (error) {
      console.error("Error fetching startup data:", error);
      window.alert("Error fetching startup data:", error);
    }
  }

  useEffect(() => {
    console.log("Use effect ran");
    fetchStartupData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Track changes in the changedData array
    const changedItem = {
      operationType: 2, // Operation type 2 is for replace
      path: name,
      op: "replace",
      value: value,
    };

    setChangedData((prevChangedData) => [
      ...prevChangedData.filter((item) => item.path !== name), // Remove previous changes for the same field
      changedItem,
    ]);
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.founderName) {
      errors.FounderName = "Founder Name is required";
    }
    if (!data.businessDomain) {
      errors.BusinessDomain = "Business Domain is required";
    }
    if (!data.description) {
      errors.Description = "Description is required";
    }

    if (!data.grossSales || isNaN(data.grossSales)) {
      errors.GrossSales = "Gross Sales must be a valid number";
    } else if (Number(data.grossSales) < 0) {
      errors.GrossSales = "Gross Sales cannot be negative";
    }

    if (Number(data.grossSales) < Number(data.netSales)) {
      console.log("GrossSales :", data.grossSales);
      console.log("NetSales :", data.netSales);
      errors.GrossSales = "Gross Sales value have to be larger";
    }

    if (!data.netSales || isNaN(data.netSales)) {
      errors.NetSales = "Net Sales must be a valid number";
    } else if (Number(data.netSales) < 0) {
      errors.NetSales = "Net Sales cannot be negative";
    }

    if (!data.businessStartDate) {
      errors.BusinessStartDate = "Business Start Date is required";
    } else {
      const today = new Date();
      const selected = new Date(data.businessStartDate);
      if (today < selected) {
        errors.BusinessStartDate =
          "Business Start Date cannot be a future date";
      }
    }

    if (!data.website) {
      errors.Website = "Website is required";
    }

    if (!data.businessStartDate) {
      errors.BusinessLocation = "Business start date is required";
    }

    if (!data.businessLocation) {
      errors.BusinessLocation = "Business Location is required";
    }

    if (!data.employeeCount) {
      errors.EmployeeCount = "Employee Count is required";
    } else if (Number(data.employeeCount) <= 0) {
      errors.EmployeeCount = "Enter valid employee count";
    }

    return errors;
  };

  async function handlePatchRequest(formData) {
    try {
      const response = await fetch(
        `http://localhost:49407/api/PatchStartup/${startupId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("PATCH request successful");
      window.alert("Company updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error making PATCH request:", error);
      window.alert("Error making PATCH request:", error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    console.log("changedData :", changedData);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form data submitted:", formData);
      handlePatchRequest(changedData);
    }
  }

  return (
    <div>
      {formData ? (
        <div className="center-container border ">
          <form className="w-75 " onSubmit={handleUpdate}>
            <div className="w-75">
              <h3 className="text-info">View Startup</h3>
            </div>

            <div className="form-group">
              <label className="mt-2 h5">Founder Name:</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="founderName"
                  className="form-control"
                  value={formData.founderName}
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
                  name="businessDomain"
                  className="form-control"
                  value={formData.businessDomain}
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
                  name="description"
                  className="form-control"
                  value={formData.description}
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
                    name="grossSales"
                    className="form-control"
                    value={formData.grossSales}
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
                    name="netSales"
                    className="form-control"
                    value={formData.netSales}
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
                    name="businessStartDate"
                    className="form-control"
                    value={formData.businessStartDate}
                    onChange={handleChange}
                  />
                  <span className="text-danger">
                    {errors.BusinessStartDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="mt-2 h5">Website:</label>
              <div className="col-md-9">
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  value={formData.website}
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
                  name="businessLocation"
                  className="form-control"
                  value={formData.businessLocation}
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
                    name="employeeCount"
                    className="form-control"
                    value={formData.employeeCount}
                    onChange={handleChange}
                  />
                </div>
                <span className="text-danger">{errors.EmployeeCount}</span>
              </div>
            </div>

            <div className="text-center col-md-9 mt-3">
              <button className="btn btn-warning mx-2" type="submit">
                Update
              </button>
              <Link className="btn btn-secondary" to="/">
                Back to home
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>Loading ...</h2>
        </div>
      )}
    </div>
  );
}

export default UpdateStartup;
