import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {NavLink} from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import  {DLT } from '../redux/actions/actoin'
import {useState,useEffect} from "react"
const Header = () => {
 const getdata=useSelector((state)=>state.cartreducer.carts);
const [price, setprice]=useState(0)
const dispatch=useDispatch ();

const dlt=(id)=>{
  dispatch(DLT(id))
}

const total=()=>{
  let price =0;
  getdata.map((element,k)=>{
    price=element.price*element.qnty+price

  });
  setprice( price)
}
useEffect(() => {
 total();

  
}, [total])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink className={'text-decoration-none text-light me-5 p-3' } to="/">Navbar</NavLink>
          <Nav className="me-auto">
            <NavLink className={'text-decoration-none text-light me-3'} to="/">Home</NavLink>
            <NavLink className={'text-decoration-none text-light me-3'} to="/cards">Cards</NavLink>
          
          </Nav>
          <Badge badgeContent={getdata.length} color="primary"  id="basic-button" 
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
             <ShoppingCartIcon className='text-light ' />
         </Badge>
         <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          getdata.length?
          <div className='card_details ms-5' style={{width:"24rem",padding:"10"}}>
             <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Resaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {
                 getdata.map((e)=>{
                  return(
                    <>
                    <tr>
                      <td>
                     <NavLink to={`/cart/${e.id}`} onClick={handleClose}> 
                      <img src={e.imgdata} style={{width:"5rem",height:"5rem"}}></img></NavLink>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : ₹ {e.price}</p>
                        <p>Quantity: ₹ {e.qnty}</p>
                         <p><DeleteIcon onClick={()=>dlt(e.id)} style={{color:"red"}}/></p>
                        
                      </td>
                    </tr>
                    </>
                  )
                 })
                }
                <p className='text-center'>Total : {price}</p>
              </tbody>
             </Table>
          </div>: <div className='cart-details d-flex justify-content-center align-items-center' style={{width:"24rem"}}>
          <CloseIcon onClick={ handleClose} style={{position:'absolute',top:'10',right:'15',fontSize:'23px',cursor:"pointer"}}/>
        <p  style={{fontSize:22,}}>  Your Cart is Empty</p>
        <img className='mx-3' style={{width:"5rem",padding:"10"}} src='./images/cart.gif'></img>

    </div>
        }
   
     
      </Menu>
        </Container>
      </Navbar>
    </>
  )
}

export default Header