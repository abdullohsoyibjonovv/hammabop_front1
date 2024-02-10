import { useRouter } from 'next/router';
import React from 'react'
import { useCart } from 'react-use-cart';

export const getServerSideProps = async () => {
  const bekentdankevotganmalumot = await fetch(
    "https://hammabop-backend.onrender.com/users"
  );
  const data = await bekentdankevotganmalumot.json();
  return {
    props: { product: data },
  };
};




const Singlep = ({ product }) => {

  const { addItem, getItem, removeItem } = useCart();

  const router = useRouter();
  const routeId = router.query.id;

  const findNext = product?.find((el) => {
    return el?._id === routeId;
  });


  return (

    <div>


      <div className='pro1'>

        <span>
          <img src={findNext?.image} alt={findNext?.title} />
          <br />

        </span>
        <div className="left">
          <h1>{findNext?.name}</h1>
          <br />
          <p>{findNext?.price}.00 so'm</p>
          {!getItem(findNext?._id) ? (
            <button className='cancelBtn' onClick={() => addItem({ ...findNext, id: findNext?._id })}>
           <p className='btn_p'>   BUY</p>
            </button>
          ) : (
            <button
              className='cancelBtn'
              onClick={() => removeItem(findNext?._id)}
            >
             <p className='btn_p'> Cancel</p>
            </button>
          )}
        </div>
      </div>


    </div>
  )
}

export default Singlep