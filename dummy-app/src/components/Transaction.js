import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import "../styles/Tutorials.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import NavbarTutorials from "./NavbarTutorials";
import axios from "axios";

function Transaction() {
  const customerID = useSelector((state) => state.customer.customerID);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.data.token);


  useEffect(() => {
    // Construct the API URL using the customerID
    const apiUrl = `http://localhost:8083/transactions-api/transactions/${customerID}`;
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};

        axios.get(apiUrl, config).then((response) => {
            // console.log(response)
            const formattedData = response.data.transactions.map((transaction) => ({
                      transactionID: transaction.transactionID,
                      type: transaction.type,
                      method: transaction.method,
                      amount: transaction.amount,
                      roundUp: transaction.roundUp,
                      timestamp: new Date(transaction.timestamp).toLocaleString(),
                      currentBalance: transaction.currentBalance,
                      toOrFrom: transaction.toOrFrom,
                      currentSavings: transaction.currentSavings
            }));
            // console.log(formattedData);
            setData(formattedData);
            setLoading(false);
        });

    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((response) => {
    //     console.log(response.data)
    //     const formattedData = response.data.transactions.map((transaction) => ({
    //       transactionID: transaction.transactionID,
    //       type: transaction.type,
    //       method: transaction.method,
    //       amount: transaction.amount,
    //       roundUp: transaction.roundUp,
    //       timestamp: new Date(transaction.timestamp).toLocaleString(),
    //       currentBalance: transaction.currentBalance,
    //       toOrFrom: transaction.toOrFrom,
    //     }));

    //     setData(formattedData); // Update the state with formatted data
    //     setLoading(false); // Set loading to false when data is loaded
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setLoading(false); // Set loading to false on error
    //   });
  }, [customerID, token]);

  const content = { width: 1200, height: "100%", margin: "auto" };
  const buttonStyles = { color: "brown" };

  const h1signup = {
    fontWeight: "normal",
    fontSize: "2rem",
    lineHeight: "1.5",
    marginTop: "2rem",
    marginBottom: "1.5rem",
    width: "100%",
    borderBottom: "0px solid #B4A99F",
    color: "#42145F",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontFamily: "RNHouseSans-Regular, Verdana, Helvetica, San-serif",
  };

  const h1transaction = {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  };

  const toolbarStyle = {
    backgroundColor: "#f0f0f0", // Change to the desired background color
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "flex-end", /* Horizontally align to the right */
    alignItems: "center", /* Vertically align to the center */
    padding: "8px", /* Add padding as needed */
  };

  if (loading) {
    return "<LinearProgress />";
  }

  return (
    <>
      <NavbarTutorials />
      <div style={content}>
        <div style={h1transaction}>
          <Typography style={h1signup} variant="h1">
            Transactions
          </Typography>
        </div>


<DataGrid
  rows={data}
  getRowId={(row) => row.transactionID}
  columns={[
    {
      field: "transactionID",
      headerName: "Transaction ID",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "timestamp",
      headerName: "Date",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "method",
      headerName: "Method",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "roundUp",
      headerName: "Round Up",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "currentBalance",
      headerName: "Current Balance",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "toOrFrom",
      headerName: "To/From",
      flex: 1,
      headerClassName: "custom-header-class",
    },
    {
      field: "currentSavings",
      headerName: "Current Savings",
      flex: 1,
      headerClassName: "custom-header-class",
    },
  ]}
  components={{
    LoadingOverlay: () => null, // Remove the loading overlay
    Toolbar: () => (
      <GridToolbarContainer style={toolbarStyle}>
        <GridToolbarColumnsButton style={buttonStyles} />
        <GridToolbarFilterButton style={buttonStyles} />
        <GridToolbarDensitySelector style={buttonStyles} />
        <GridToolbarExport style={buttonStyles} />
        {/* You can add more toolbar components here */}
      </GridToolbarContainer>
    ),
  }}
  pageSize={5}
/>

      </div>
    </>
  );
}

export default Transaction;
