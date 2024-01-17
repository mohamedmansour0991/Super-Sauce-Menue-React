import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Download({ e }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const [loading, setLoading] = useState(false);
  const exportAllToExcel = () => {
    console.log(`${URL}/api/Order-invoice/${e.id}`);
    setLoading(true);
    fetch(`${URL}/api/Order-invoice/${e.id}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((data) => {
        if (data) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Groups.pdf";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Button
        disabled={loading}
        variant="outline-success"
        onClick={() => exportAllToExcel()}
      >
        تحميل التفاصيل
      </Button>{" "}
    </div>
  );
}

export default Download;
