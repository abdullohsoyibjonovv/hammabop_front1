import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsCart2 } from "react-icons/bs";
import { useCart } from 'react-use-cart';
import { useIsClient } from 'usehooks-ts';
import useSWR from 'swr';

const fetcher = (image) => fetch(image).then((res) => res.json());

const Nav = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const { items } = useCart();
  const [search, setSearch] = useState('');
  const { data } = useSWR('https://hammabop-backend.onrender.com/users', fetcher);

  const searchData = data?.filter((el) => {
    return el?.name?.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    setSearch('');
  }, [router]);



  return (
    <>
      <nav>

        <div className="container">


          <div className="navbar">

            <div className="img_hamm">
              <img className='logo_img' src="https://telegra.ph/file/736863c2d68e5045c564e.jpg" alt="" />

            </div>



            <Link href={"/admin"}>Tavarlar </Link>


            <Link href={"/karzinka"}> <BsCart2 /><sub>    {isClient && <sub className="nol">{items.length}</sub>}</sub></Link>

            <div className="nav__search">
              <div className="nav_orta">
                <input
                  autocomplete="off"
                  type="text"
                  placeholder="What are you looking for?"
                  class="search__input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>
              {search !== '' ? (
                <div className="search_card">
                  {searchData?.map((el) => (
                    <Link href={`/aydi/${el._id}`} className="tovars">
                      <img src={el?.image} alt="" />
                      <h2>{el?.name}</h2>
                      <b>{el?.price}.00</b>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link href={"/"}> Admin</Link>
        

          </div>
        </div>
      </nav>





    </>
  )
}

export default Nav