import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { post } from "../utils/config";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    isLoginChk();
  });

  const isLoginChk = () => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const loginHandler = async () => {
    try {
      const fetchData = await post(`/api/admin/signin`, data);
      console.log("data", fetchData);
      const { token } = fetchData.data;
      if (token) {
        localStorage.setItem("token", token);
        toastr.success("Login Successful");
        history.push("/");
      } else {
        toastr.error("Please check you email or password!", "Error");
        return;
      }
    } catch (err) {
      toastr.error("Login Error", "Error");
      console.log(err);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <Card>
            <CardBody>
              <h1 className="h3 mb-3 fw-normal text-center">Sign In</h1>
              <Form>
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
                  onClick={loginHandler}
                >
                  Sign In
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
