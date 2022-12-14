import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div>
      <div className="container my-1">
        <Link to="/">← Back to Fuzzies</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.dogs.map(({ _id, image, name, rate }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/dogs/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Footer />
      </div>
    </>
  );
}

export default OrderHistory;
