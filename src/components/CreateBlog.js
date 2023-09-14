import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import {
  Container,
  // Row,
  // Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { post } from "../utils/config";

const CreateBlog = () => {
  const history = useHistory();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    author: "",
    link: "",
    category: "",
  });
  // const [picture, setPicture] = useState(null);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  // const handleFileInput = (e) => {
  //   setPicture(e.target.files[0]);
  // };

  const PostData = async () => {
    try {
      const { title, description, link, category } = blog; //author
      if (!title || !description || !link || !category) {
        toastr.warning("All Fields required");
        return;
      }
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      // data.append("author", author);
      data.append("link", link);
      data.append("category", category);
      // data.append("picture", picture);

      const blogData = await post(`/api/admin/createblog`, data);
      history.push("/");
      console.log(blogData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Create Blog</h1>
      <Form>
        {/* <Row> */}
        {/* <Col md={6}> */}
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={blog.title}
            onChange={handleInput}
            required
          />
        </FormGroup>
        {/* </Col> */}
        {/* <Col md={6}>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={blog.author}
                onChange={handleInput}
                required
              />
            </FormGroup>
          </Col> */}
        {/* </Row> */}
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={blog.description}
            onChange={handleInput}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="link">Link</Label>
          <Input
            type="text"
            name="link"
            id="link"
            value={blog.link}
            onChange={handleInput}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={blog.category}
            onChange={handleInput}
            required
          >
            <option>Select Category</option>
            <option value="india">India</option>
            <option value="world">World</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
          </Input>
        </FormGroup>
        {/* <FormGroup>
          <Label for="picture">Picture</Label>
          <Input
            type="file"
            name="picture"
            id="picture"
            accept="image/*"
            onChange={handleFileInput}
          />
        </FormGroup> */}
        <Button color="primary" onClick={PostData}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;
