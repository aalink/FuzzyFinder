import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import Footer from '../components/Footer'
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_DOGS,
} from '../utils/actions';
import { QUERY_DOGS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentDog, setCurrentDog] = useState({});

  const { loading, data } = useQuery(QUERY_DOGS);

  const { dogs, cart } = state;

  useEffect(() => {
    // already in global store
    if (dogs.length) {
      setCurrentDog(dogs.find((dog) => dog._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_DOGS,
        dogs: data.dogs,
      });

      data.dogs.forEach((dog) => {
        idbPromise('dogs', 'put', dog);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('dogs', 'get').then((indexedDogs) => {
        dispatch({
          type: UPDATE_DOGS,
          dogs: indexedDogs,
        });
      });
    }
  }, [dogs, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        dog: { ...currentDog, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentDog, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentDog._id,
    });

    idbPromise('cart', 'delete', { ...currentDog });
  };

  return (
    <>
      {currentDog && cart ? (
        <div className="container my-1">
          <Link to="/">??? Back to Our Fuzzies</Link>

          <h2>{currentDog.name}</h2>

          <p>{currentDog.description}</p>

          <p>
            <strong>Hourly Rate:</strong>${currentDog.rate}{' '}
            <button onClick={addToCart}>Choose this fuzzy</button>
            <button
              disabled={!cart.find((p) => p._id === currentDog._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentDog.image}`}
            alt={currentDog.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
      <Footer />
    </>
  );
}

export default Detail;
