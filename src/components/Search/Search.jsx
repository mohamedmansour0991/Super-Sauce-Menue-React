import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

function Search({ setSearch }) {
  return (
    <Form className="d-flex gap-3 col-12 col-lg-6 text-center m-auto my-1">
      <FormControl
        type="text"
        placeholder="ابحث"
        className="mr-sm-2"
        // onChange={handleSearch}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="outline-success">ابحث</Button>
    </Form>
  );
}

export default Search;
