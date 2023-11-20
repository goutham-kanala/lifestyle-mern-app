import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { userRequest } from "../requestMethods";
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  width: 20%;
  border: none;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

// const Register = () => {
//   return (
//     <Container>
//       <Wrapper>
//         <Title>CREATE AN ACCOUNT</Title>
//         <Form>
//           <Input placeholder="name" />
//           <Input placeholder="last name" />
//           <Input placeholder="username" />
//           <Input placeholder="email" />
//           <Input placeholder="password" />
//           <Input placeholder="confirm password" />
//           <Agreement>
//             By creating an account, I consent to the processing of my personal
//             data in accordance with the <b>PRIVACY POLICY</b>
//           </Agreement>
//           <Button>CREATE</Button>
//         </Form>
//       </Wrapper>
//     </Container>
//   );
// };

// export default Register;





const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRequest.post('/auth/register', {
        username:formData.name,
        email:formData.email,
        password:formData.password
      }).then((response)=>{
        history.push('/login');
      });
      console.log('User registered successfully!');
      // You can redirect the user to another page or show a success message here
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="username" name="name" value={formData.name} onChange={handleChange} />
            <Input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} />
            <Input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} />
          <Button type="submit">Register</Button>
          <Agreement>
               By creating an account, I consent to the processing of my personal
               data in accordance with the <b>PRIVACY POLICY</b>
           </Agreement>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
