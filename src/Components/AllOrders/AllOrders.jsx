import { useContext, useEffect } from "react";
import { useState } from "react";
import { cartContext } from "../Context/CartFu";
export default function AllOrders() {
  const { getOrdersUser } = useContext(cartContext);
  useEffect(()=>{HandelGetOrdersUser()},[])
  const [orders, setOrders] = useState([]);
  const [toggil , setToggil] = useState(null)
  async function HandelGetOrdersUser() {
    const AllOrder = await getOrdersUser();
    setOrders(AllOrder.data);
    console.log(AllOrder.data)
  }
  return (
    <>
      <div className="flex flex-col gap-3 container">
        {
          orders.map((bill , i)=>(
          <div key={i} className="border-2 rounded-lg p-5 bg-slate-100">
            <div className="text-center text-2xl py-2">The Bill {i + 1}</div>
            <div onClick={()=>{setToggil(i)}} className="my-2 bg-gray-50 flex justify-between items-center p-5 rounded-md flex-wrap hover:cursor-pointer hover:shadow-lg transition-all duration-500">
              <div className="flex gap-4 flex-col">
                <div>Delivery status : <span className={bill.isDelivered ? 'text-green-400' : 'text-red-400'}>{bill.isDelivered ? 'Delivered' : 'Not delivered'}</span></div>
                <div>Payment status : <span className={bill.isPaid ? 'text-green-400' : 'text-red-400'}>{bill.isPaid ? 'Paid' : 'Not Paid'}</span></div>
                <div>Payment Method : <span className='text-blue-400'>{bill.paymentMethodType}</span></div>
                <div>Total order Amount : <span className='text-blue-400'>{bill.totalOrderPrice} EGP</span></div>
              </div>
            </div>
            <div className={`max-h-[400px] overflow-y-scroll p-2 flex-col gap-2 bg-gray-50 rounded-md ${toggil == i ? 'flex' : 'hidden'}`}>
              {
                bill.cartItems.map((item)=>(
                <div key={item._id} className="flex items-center border-b-2 pb-3">
                  <img className="max-w-[150px]" src={item.product.imageCover} alt="" />
                  <div className="flex flex-col gap-3 ms-2">
                    <div>{item.product.title.split(" ", 2).join(" ")}</div>
                    <p>{item.product.title}</p>
                    <div>{item.price} EGP</div>
                  </div>
                </div>))
              }
            </div>
          </div>
          ))
        }
      </div>
    </>
  );
}
