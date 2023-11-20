import { Badge, Button } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Component } from 'react';
import { withCookies } from 'react-cookie';


import { useState } from "react";

import { login } from "../redux/apiCalls";





const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;




const handleClearSession = () => {
  localStorage.clear();
  window.location.href="/login"
};

const handleOrdersSession = () => {
  localStorage.clear();
  window.location.href="/orders"
};

const handleRegister = () => {
  window.location.href="/register"
};

const handleLogin = () => {
  window.location.href="/login"
};





const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Lifestyle.</Logo>
        </Center>
        <Right>
          <MenuItem>
          {user ? "": (<a onClick={handleRegister} target="_self">REGISTER</a>)}
          </MenuItem>
          {/* <MenuItem>SIGN IN</MenuItem> */}
          {/* <MenuItem>{user? user.username: 
          "SING IN"
          }
          </MenuItem> */}
          <MenuItem>
            {user ? (user.username) : (<a onClick={handleLogin}target="_self">SIGN IN</a>)}
          </MenuItem>
          <MenuItem>
            {user ? (<a onClick={handleClearSession} target="_self">LOGOUT</a>) : ""}
          </MenuItem>
          <MenuItem>
            {user ? (<a onClick={handleOrdersSession} target="_self">ORDERS</a>) : ""}
          </MenuItem>
          
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
