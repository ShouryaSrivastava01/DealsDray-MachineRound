import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//   {
//     id: 1,
//     image: 'https://via.placeholder.com/50',
//     name: 'John Doe',
//     email: 'john@example.com',
//     mobile: '123-456-7890',
//     designation: 'Developer',
//     gender: 'Male',
//     course: 'Computer Science',
//     createDate: '2024-01-01',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/50',
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     mobile: '987-654-3210',
//     designation: 'Designer',
//     gender: 'Female',
//     course: 'Graphic Design',
//     createDate: '2024-02-01',
//   },
//   // Add more data as needed
// ];

const EmployeeList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("http://127.0.0.1:3001/employee")
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:3001/employee/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const filteredData = data;
  const filteredData = data.filter(
    (user) =>
      user.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.f_Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* <h2>User List</h2> */}
      <div className="row mb-3">
  <div className="col-12 col-md-auto mb-2 mb-md-0">
    <Button href="/list/new" variant="success" className="w-100">
      Create Employee
    </Button>
  </div>
  <div className="col-12 col-md">
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
        Clear
      </Button>
    </InputGroup>
  </div>
</div>

      <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.f_Id}</td>
              <td>
                <img
                  src={"http://127.0.0.1:3001/uploads/" + user.f_Image}
                  alt={user.name}
                  style={{ borderRadius: "50%" }}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                />
              </td>
              <td>{user.f_Name}</td>
              <td>{user.f_Email}</td>
              <td>{user.f_Mobile}</td>
              <td>{user.f_Designation}</td>
              <td>{user.f_gender}</td>
              <td>{user.f_Course}</td>
              <td>{<td>{user.f_Createdate.slice(0, 10)}</td>}</td>
              <td>
                <Button variant="primary" size="sm" href={'list/'+user._id}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
