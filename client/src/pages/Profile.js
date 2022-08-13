import { Button, Container,Row, Col, Form, Card, Table} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { idbPromise } from '../utils/helpers';
import { useStoreContext } from "../utils/GlobalState";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { UPDATE_PASSWORD } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';




export default function Profile(props) {
  const { loading, data } = useQuery(QUERY_USER);
  const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD); 
  const [editPersonal, setEditPersonal] = useState(false)
  const [editDogs, setEditDogs] = useState(false);
  const [updatePasswordState, setUpdatePassword] = useState({
    currentPassword:'',
    newPassword:''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatePassword({
      ...updatePasswordState,
      [name]: value
    });
    console.log(updatePasswordState)
  }

  const handleUpdate = async () => {
    setEditPersonal(!editPersonal)
    console.log(updatePasswordState);
    const variables = {...updatePasswordState};
    console.log(variables);
    const response = await updatePassword({
      variables: {
        ...variables
      }
    });
    console.log(response);
  }
  if(loading){
    return (<h1>Loading...</h1>)
  } else {
    let { user } = data;
    let  {dogs}  = user;
    const keys = Object.keys(dogs[0]);
  return (

    <Container>
    <Card className='my-5' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Personal Information</Card.Title>
      

      <Form className='w-100'>
        <Row className='flex-row justify-content-center'>
          <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label className='me-5'>First Name: </Form.Label>
                <Form.Control
                  name='firstName'
                  type="text"
                  placeholder="John"
                  className='d-inline-block w-50'
                  value={user.firstName}
                  disabled/>
              </Form.Group>
          </Col>
          <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label className='me-5'>Last Name: </Form.Label>
                <Form.Control
                  name='lastName'
                  type="text"
                  placeholder="John"
                  className='d-inline-block w-50'
                  value={user.lastName}
                  disabled/>
              </Form.Group>
          </Col>
        </Row>
        <Row className='flex-row justify-content-center'>
          <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className='me-5'>e-mail: </Form.Label>
                <Form.Control
                  name='firstName'
                  type="text"
                  placeholder="John"
                  className='d-inline-block w-50'
                  value={user.email}
                  disabled/>
              </Form.Group>
          </Col>
          <Col xs={12} md={6}>
              {!editPersonal?
               <Form.Group className="mb-3" controlId="lastName">
                <Form.Label className='me-5'>Password: </Form.Label>
                <Form.Control
                  name='Password'
                  type="password"
                  placeholder="*********"
                  className='d-inline-block w-50'
                  value='*********'
                  disabled/>
              </Form.Group>
              :
              <>
              <Row>
                <Form.Group className="mb-3" controlId="lastName">
               <Form.Label className='me-5'>Enter Current Password: </Form.Label>
                <Form.Control
                  name='currentPassword'
                  onChange={handleInputChange}
                  type="password"
                  placeholder="*********"
                  className='d-inline-block w-50'
                  disabled={!editPersonal}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
               <Form.Label className='me-5'>Enter New Password: </Form.Label>
                <Form.Control
                  name='newPassword'
                  onChange={handleInputChange}
                  type="password"
                  placeholder="*********"
                  className='d-inline-block w-50'
                  disabled={!editPersonal}/>
              </Form.Group>
               </Row>
               
              </>}
          </Col>
        </Row>

      </Form>

      {!editPersonal ?
      <Button
      variant="primary"
      onClick={() => setEditPersonal(!editPersonal)}>
        Edit Password
      </Button> :
      <Button
      variant="primary"
      onClick={handleUpdate}>
        Save Password
      </Button>
    }
    </Card.Body>
  </Card>
{ user.userType === 'owner' ?
<>
  <Card className='my-5' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Dogs Information</Card.Title>
      


    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Hourly Rate</th>
          <th>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>

        <tr>
        <td>1</td>
        {Array.from({ length: 3 }).map((_, index) => (
            <td key={index}> {dogs[0][keys[index+1]]}</td>
          ))}
          <td><Button
          variant="danger"
          id={dogs[0]._id}>
        Delete
      </Button></td>
      </tr>


      </tbody>
    </Table>
    
    </Card.Body>
  </Card>
  <h2>Earnings:  {!user.earnings ? 0 : user.earnings} </h2>
  </>  

  :
  <Card className='my-5' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Previous Orders</Card.Title>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>

      </tbody>
    </Table>
    <Button variant="primary" type="submit">
        Submit
      </Button>
    </Card.Body>
  </Card>

}
    </Container>

  )
  }
}