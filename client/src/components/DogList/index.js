import React, { useEffect } from 'react';
import DogItem from '../DogItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_DOGS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_DOGS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function DogList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_DOGS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_DOGS,
        dogs: data.dogs,
      });
      data.dogs.forEach((dog) => {
        idbPromise('dogs', 'put', dog);
      });
    } else if (!loading) {
      idbPromise('dogs', 'get').then((dogs) => {
        dispatch({
          type: UPDATE_DOGS,
          dogs: dogs,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterDogs() {
    if (!currentCategory) {
      return state.dogs;
    }

    return state.dogs.filter(
      (dog) => dog.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Fuzzies:</h2>
      {state.dogs.length ? (
        <div className="flex-row">
          {filterDogs().map((dog) => (
            <DogItem
              key={dog._id}
              _id={dog._id}
              image={dog.image}
              name={dog.name}
              rate={dog.rate}
              quantity={dog.quantity}
              description={dog.description}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any dogs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default DogList;
