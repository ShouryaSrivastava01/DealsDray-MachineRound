import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useParams, useNavigate} from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "new") {
      console.log(id);
      setEdit(true);
      fetch(`http://127.0.0.1:3001/employee/${id}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setFormData(data);
          setSelectImage(`http://127.0.0.1:3001/uploads/${data.f_Image}`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [id]);
  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setSelectImage(imageUrl);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, ...otherData } = formData;
    const dataToSend = new FormData();
    dataToSend.append("file", image);
    Object.keys(otherData).forEach((key) => {
      dataToSend.append(key, otherData[key]);
    });
    if (edit) {
      
      try {
        const response = await fetch(`http://127.0.0.1:3001/employee/${id}`, {
            method: "PUT",
            body: dataToSend,
          })

          if (response.ok) {
            navigate('/list')
          } else {
              const message = await response.json();
              alert(message.message)
            }
        }catch(err){
        alert("error")

    }
    } else {
        try {
            const response = await fetch("http://127.0.0.1:3001/employees/add", {
                method: "POST",
                body: dataToSend,
              });

              if (response.ok) {
                navigate('/list')
              } else {
                  const message = await response.json();
                  alert(message.message)
                }
            }catch(err){
            alert("error")

        }
    }
  };

  return (
    <Container>
      <h1>{edit ? "Edit Employee" : "Create Employee"}</h1>
      <Row className="justify-content-md-center text-start">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Name:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="f_Name"
                  value={formData.f_Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Email:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="email"
                  name="f_Email"
                  value={formData.f_Email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Mobile No:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="f_Mobile"
                  pattern="^\d{10}$"
                  value={formData.f_Mobile}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Designation:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Select
                  name="f_Designation"
                  value={formData.f_Designation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Gender:</Form.Label>
              </Col>
              <Col md={8}>
                <div>
                  <Form.Check
                    type="radio"
                    name="f_gender"
                    value="M"
                    label="Male"
                    checked={formData.f_gender === "M"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    name="f_gender"
                    value="F"
                    label="Female"
                    checked={formData.f_gender === "F"}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Course:</Form.Label>
              </Col>
              <Col md={8}>
                <div>
                  <Form.Check
                    type="checkbox"
                    name="f_Course"
                    label="MCA"
                    value="MCA"
                    checked={formData.f_Course === "MCA"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    name="f_Course"
                    label="BCA"
                    value="BCA"
                    checked={formData.f_Course === "BCA"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    name="f_Course"
                    label="BSC"
                    value="BSC"
                    checked={formData.f_Course === "BSC"}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Img Upload:</Form.Label>
                </Col>
                <Col md={8} className="mx-0 p-0">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept=".jpg,.png,.jpeg"
                  />
                </Col>
              </Row>
              {selectedImage && (
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label>Preview:</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Image
                      src={selectedImage}
                      alt="Uploaded Preview"
                      fluid
                      style={{ maxHeight: "200px", maxWidth: "100%" }}
                    />
                  </Col>
                </Row>
              )}
            </Row>
            <Row className="mb-3">
            <Col></Col>
            <Col md={8}>
            <Button variant="success" type="submit" className="w-100">
              {edit ? "Update" : "Create"}
            </Button>
            </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetails;
