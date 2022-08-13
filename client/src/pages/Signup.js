import Pagination from 'react-bootstrap/Pagination';
import { Button, Form, Container,Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { validateEmail } from '../utils/helpers';
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries'
import { UPDATE_CATEGORIES } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

function Signup(props) {
  const [formState,setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'patient',
    name:'',
    description: '',
    image: '',
    rate: '',
    zipCode: '',
    category: 'Guide Dogs'
});
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispatch] = useStoreContext();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { categories } = state;

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handlePage = (e) => {
    if (e.currentTarget.name === 'next' && currentPage === 1) {
      setCurrentPage(2);
    } else if (e.currentTarget.name === 'previous' && currentPage === 2) {
      setCurrentPage(1);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.firstName) {
      setErrorMessage('Name is required')
      return;
    } else if (!formState.lastName) {
      setErrorMessage('Last Name is required');
      return;
    }else if (!validateEmail(formState.email)) {
      setErrorMessage('Email is invalid');
      return;
    }else if (!formState.password) {
      setErrorMessage('Password is required');
      return;
    }else if (formState.userType === 'owner') {
      if (!formState.dogName) {
        setErrorMessage('Dog name is required');
        return;
      }else if (!formState.description) {
        setErrorMessage('Dog description is required');
        return;
      }else if (!formState.rate) {
        setErrorMessage('Hourly rate is required');
        return;
      }else if (!formState.zipCode) {
        setErrorMessage('Zip Code is required');
        return;
      }
    }

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        userType: formState.userType,
        name: formState.name,
        description: formState.description,
        image: formState.image,
        rate: formState.rate,
        zipCode: formState.zipCode,
        category: formState.category
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);

    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: 'patient',
      dogName:'',
      description: '',
      image: '',
      rate: '',
      zipCode: '',
      category: 'Guide Dogs'
    });
    setErrorMessage('');
  };

  return (
    <Container>
      
      <Form onSubmit={handleFormSubmit}>
        {(currentPage === 1) ? 
        (<>
        <h1 className='mb-3'>Personal Information</h1>
        <Row className='mb-4'>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="name">
            <Form.Label className='me-5'>First Name:</Form.Label>
            <Form.Control
              name='firstName'
              onChange={handleInputChange}
              type="text"
              placeholder="John"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="lastName">
            <Form.Label className='me-5'>Last Name:</Form.Label>
            <Form.Control
              name='lastName'
              onChange={handleInputChange}
              type="text"
              placeholder="Doe"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="email">
            <Form.Label className='me-5'>e-mail:</Form.Label>
            <Form.Control 
              name='email'
              onChange={handleInputChange}
              type="email"
              placeholder="john.doe@mail.com"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label className='me-5'>Password:</Form.Label>
            <Form.Control 
              name='password'
              onChange={handleInputChange}
              type="password"
              placeholder="******"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label className='me-5'>I am:</Form.Label>
          <Form.Check
          name='userType'
          type="radio"
          value={"patient"}
          checked={formState.userType === "patient"}
          onChange={handleInputChange}
          label="looking for a therapy dog" />
          <Form.Check
          name='userType'
          type="radio"
          value={"owner"}
          checked={formState.userType === "owner"}
          onChange={handleInputChange}
          label="the owner of a therapy dog" />
        </Form.Group>
        </>) : (<>
        <h1 className='mb-3'>Dog Information</h1>
        <Row className='mb-4'>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="name">
            <Form.Label className='me-5'>Dog Name:</Form.Label>
            <Form.Control
              name='name'
              onChange={handleInputChange}
              type="text"
              placeholder="Fuzzy"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="description">
            <Form.Label className='me-5'>Description:</Form.Label>
            <Form.Control
              name='description'
              onChange={handleInputChange}
              type="text"
              placeholder="Good with kids, certificate in impared vision aid"
              className='d-inline-block w-75'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
            <Form.Label className='me-5'>Image:</Form.Label>
            <Form.Control
              name='image'
              onChange={handleInputChange}
              type="file"
              placeholder="Upload your image"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="rate">
            <Form.Label className='me-5'>Hourly Rate $ </Form.Label>
            <Form.Control 
              name='rate'
              onChange={handleInputChange}
              type="number"
              min='0.50'
              step='0.50'
              max='20.00'
              placeholder="1.00"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="zipCode">
            <Form.Label className='me-5'>Zip Code:</Form.Label>
            <Form.Control 
              name='zipCode'
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your zip code"
              className='d-inline-block w-75'/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label className='me-5'>I can help with:</Form.Label>
        {categories.map((item) => (
          <Form.Check
            key={item._id}
            name='category'
            type='radio'
            value={item.name}
            checked={formState.category === item.name}
            onChange={handleInputChange}
            label={item.name}
          />
        ))}
        </Form.Group>
        </>)}
        {((currentPage === 1 && formState.userType ==='patient') || (currentPage === 2)) ?
        (<Button variant="primary" type="submit">
        Submit
      </Button>) :
        ("")}
      </Form>
      {errorMessage && (
          <div>
            <p className='error-text'>{errorMessage}</p>
          </div>
        )}
      {formState.userType === "owner" && (
      <Pagination>
        <Pagination.Prev
        name='previous'
        onClick={handlePage}/>

        <Pagination.Next
        name='next'
        onClick={handlePage}/>
      </Pagination>
      )}
    </Container>
  );
}
export default Signup;