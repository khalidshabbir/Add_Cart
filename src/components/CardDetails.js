import React from 'react'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { DLT, REMOVE } from '../redux/actions/actoin'
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
import {ADD} from '../redux/actions/actoin'
import {ADDRMV_ONE} from '../redux/actions/actoin'

const CardDetails = () => {

  const [data, setData] = useState([]);
  // console.log(data);

  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();
  const send = (e) => {
    dispatch(ADD(e));
  }
  const dlt = (id) => {
    dispatch(DLT(id))
    history("/")
  }
  const remove = (item) => {
    dispatch(REMOVE(item))
    
  }
  const history = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);
  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id
    });
    setData(comparedata);
  }

  useEffect(() => {
    compare();
  }, [id])


  return (
    <div className='contianer mt-2'>
      <h2 className='text-center '>Items Details Page</h2>
      <section className='container mt-3'>
        {
          data.map((element) => {
            return (
              <div className='iteamsdetails'>
                <div className='items_img'>
                  <img src={element.imgdata}></img>

                </div>
                <div className='details me-5'>
                  <Table>
                    <tr>
                      <td>
                        <p><strong>Restaurant</strong> : {element.rname}</p>
                        <p><strong>Price</strong> : ₹ {element.price}</p>
                        <p><strong>Dishes</strong> {element.address}</p>
                        <p><strong>Total</strong> : ₹ {element.price *element.qnty}</p>
                        <div className='d-flex mt-5 justify-content-between align-items-center' style={{ width: "100", cursor: "pointer", background: "#ddd", color: "#111" }}>
                          <strong><span style={{ fontSize: "24" }} onClick={element.qnty<=1?()=>dlt(element.id):()=>remove(element)} className="m-2">-</span></strong>
                          <span style={{ fontSize: "24" }} className="m-2">{element.qnty}</span>
                          <strong>  <span style={{ fontSize: "24" }} onClick={()=>send(element)} className="m-2">+</span></strong>
                        </div>
                      </td>
                      <td>

                        <p><strong>Rating :</strong><span style={{ background: 'green', color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{element.rating}★</span></p>
                        <p><strong>Order Review :</strong><span>{element.somedata}</span></p>
                        <p><strong>Remove:</strong><span><DeleteIcon onClick={() => dlt(element.id)} style={{ color: "red" }} /></span></p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </div>

            )
          })
        }


      </section>
    </div>



  )
}

export default CardDetails