import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { post } from "../utils/config";

const SignUp = () => {
  const history = useHistory();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const PostData = async () => {
    try {
      // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)) {
      //  return alert('Enter valid email')
      // }
      const { firstName, lastName, email, password } = data; //author
      if (!firstName || !lastName || !email || !password) {
        toastr.warning("All Fields required");
        return;
      }
      const fetchData = await post(`/api/admin/signup`, data);
      // console.log(fetchData.data);
      if (fetchData.data.success) {
        history.push("/signin");
        toastr.success("Signup Success");
      } else {
        toastr.error(`${fetchData.data.message}`);
      }
    } catch (err) {
      toastr.error("Something went wrong");
      console.log("Error", err);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Card>
            <CardBody>
              <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={data.firstName}
                    onChange={handleInput}
                    placeholder="First Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={handleInput}
                    placeholder="Last Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleInput}
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handleInput}
                    placeholder="Password"
                  />
                </FormGroup>
                <Button
                  className="btn-lg btn-primary btn-block"
                  onClick={PostData}
                >
                  Sign Up
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
