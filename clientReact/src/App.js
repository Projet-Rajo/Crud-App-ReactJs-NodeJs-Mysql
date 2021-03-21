import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      firstName: "",
      allData: [],
      message: "",
      showAlert: false,
      alertType: "success",
      id: "",
      update: false,
      search: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitClickButton = () => {
    Axios.post("http://localhost:3001/api/insert", {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    });
    this.getDataFromServer();
    this.setState({
      lastName: "",
      firstName: "",
      message: "Data insert",
      showAlert: true,
      alertType: "success",
    });
  };

  getDataFromServer = () => {
    Axios.get("http://localhost:3001/api/get").then((res) =>
      this.setState({
        allData: res.data,
      })
    );
  };

  clickEdit = (id) => {
    Axios.get(`http://localhost:3001/api/get/${id}`).then((res) =>
      this.setState({
        lastName: res.data[0].lastName,
        firstName: res.data[0].firstName,
        id: id,
        update: true,
      })
    );
  };

  UpdateClickButton = () => {
    Axios.put("http://localhost:3001/api/update", {
      id: this.state.id,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    });
    this.getDataFromServer();
    this.setState({
      lastName: "",
      firstName: "",
      message: "Data updated",
      showAlert: true,
      alertType: "success",
    });
  };

  clickDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((res) =>
      console.log("")
    );
    this.getDataFromServer();
    this.setState({
      message: "Data deleted",
      showAlert: true,
      alertType: "danger",
    });
  };

  handleSearch = (e) => {
    this.setState({
      search : e.target.value
    })
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  render() {
    return (
      <div>
        <Container>
          <h1>SIMPLE CRUD APPLICATION</h1>
          {this.state.showAlert && (
            <Alert
              variant={this.state.alertType}
              onClose={() => this.setState({ showAlert: false })}
              dismissible
            >
              <Alert.Heading>{this.state.message}</Alert.Heading>
            </Alert>
          )}

          <Row>
            <Form>
              <FormGroup>
                <FormLabel>Search your text</FormLabel>
                <FormControl
                  type="text"
                  name="search"
                  placeholder="Words"
                  value={this.state.search}
                  onChange={this.handleSearch}
                ></FormControl>
              </FormGroup>
            </Form>
          </Row>

          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allData.map((data, key) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.lastName}</td>
                      <td>{data.firstName}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => this.clickEdit(data.id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => this.clickDelete(data.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>

          <Row>
            <Form>
              <FormGroup>
                <FormLabel>Enter the lastName</FormLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  placeholder="Enter the lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Enter the fistName</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="Enter the fistName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                ></FormControl>
              </FormGroup>
              {!this.state.update ? (
                <Button onClick={this.submitClickButton}>Save</Button>
              ) : (
                <Button onClick={this.UpdateClickButton}>Update</Button> 
              )}
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
