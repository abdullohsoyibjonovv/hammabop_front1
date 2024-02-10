import axios from 'axios';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import { useIsClient } from 'usehooks-ts';

const Korzinka = () => {
  const { items, isEmpty, updateItemQuantity, removeItem, emptyCart } =
    useCart();
  let total = 0;
  const [soni, setSoni] = useState();
  const isClient = useIsClient();

  const postTest = () => {
    axios
      .post(
        `https://api.telegram.org/bot6870995770:AAFoHKdngCisas3O2baGRae22juCgVmFbcI/sendMessage?chat_id=-1002057915143&text=${encodeURIComponent(
          `<b>Details:</b>

    <b>The operation was completed successfully!</b>
    <b>our couriers will contact you soon!</b>
    <b> Call Center: +998 93 815 42 47 </b>
    
${items
  .map((item) => {
    return `
<b>${item.name}</b>
${item.quantity} x ${item.price} $ = ${item.quantity} 
    `;
  })
  .join('')}        
<b>Total:</b> ${total} $`
        )}&parse_mode=html`
      )
      .then(() => {
        emptyCart();
      });
  };

  const praductOzgartirish = async () => {
    items.forEach(async (item) => {
      const { data: currentItem } = await axios.get(
        `https://hammabop-backend.onrender.com/users/${item._id}`
      );

      axios.patch(`https://hammabop-backend.onrender.com/users/${item._id}`, {
        quantity: currentItem.quantity - item.quantity,
      });
    });
  };

  return (
    <>
      {isClient && (
        <div className='container'>
          <div className='container cart-container'>
            {isEmpty ? (
              <div className='boxFather'>
                <div className='epmty'></div>
              </div>
            ) : (
              <>
                <hr />
                {items?.map((item) => {
                  const priceCount = item.quantity * item.price;
                  total += priceCount;
                  return (
                    <div className='container'>
                      <div className='df_zakaz'>
                        <ul className='prices' key={item.id}>
                          <li className='nameImg'>
                            <div className='korzinka_img'>
                              <img src={item.image} alt={item.name} />
                            </div>
                          </li>
                          <div className='korzinka_price'>
                            <li className='pricecount'>
                              {' '}
                              <h3>{priceCount}$</h3>
                            </li>
                          </div>
                          <li className='countid'>
                            {' '}
                            <button
                              className='minus_pilus'
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <h3>{item.quantity}</h3>
                            <button
                              className='minus_pilus'
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </li>
                          <li className='deleteIconDiv'>
                            <svg
                              onClick={() => {
                                removeItem(item.id);
                              }}
                              xmlns='http://www.w3.org/2000/svg'
                              width='25'
                              height='25'
                              fill='currentColor'
                              className='bi bi-trash'
                              viewBox='0 0 16 16'
                            >
                              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                              <path
                                fill-rule='evenodd'
                                d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                              />
                            </svg>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className='allPrices'>
            <div className='juu'>
              <h1>savat bosh</h1>
            </div>
            <hr />
            <div className='twink'>
              <h2 className='twink_1'>Total:</h2>
              <h2 className='twink_1'>{total}</h2>
              <button
                className='twink_btn'
                onClick={() => {
                  postTest();
                  praductOzgartirish();
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Korzinka;
