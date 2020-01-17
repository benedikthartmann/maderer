/**
 * adapted from: https://sergiodxa.com/articles/swr/pagination/
 */
import React, {useState} from "react";
import Head from "next/head";
import useSWR, {useSWRPages} from "swr";
import fetcher from "../lib/fetcher";
import useOnScreen from "../hooks/use-on-screen";
import AddressShort from "../components/AddressShort";
import {AddressForm, displayAdressForm} from "../components/AddressForm";

function AddressPagination() {
  const [showAdressForm, setShowAdressForm] = useState(false);
  const [entity, setEntity] = useState(0);

  const {pages, isLoadingMore, loadMore} = useSWRPages(
    "pokemon-list",
    ({offset, withSWR}) => {
      const url = offset || process.env.MAPIURL_ADDRESSLIST;
      const {data} = withSWR(useSWR(url, fetcher));

      if (!data) return null;

      const {results} = data;
      return results.map(result => (
        <section>
          <AddressShort
            key={result.id}
            setEntity={setEntity}
            entity={result}
            showAdressForm={showAdressForm}
            setShowAdressForm={setShowAdressForm}
          />
        </section>
      ));
    },
    SWR => SWR.data.next,
    []
  );

  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(
    false
  );
  const $loadMoreButton = React.useRef(null);
  const infiniteScrollCount = React.useRef(0);
  const isOnScreen = useOnScreen($loadMoreButton, "200px");

  React.useEffect(() => {
    if (!infiniteScrollEnabled || !isOnScreen) return;

    loadMore();

    const count = infiniteScrollCount.current;

    if (count + 1 === 3) {
      setInfiniteScrollEnabled(false);
      infiniteScrollCount.current = 0;
    } else {
      infiniteScrollCount.current = count + 1;
    }
  }, [infiniteScrollEnabled, isOnScreen]);

  return (
    <>
      <AddressForm
        entity={entity}
        showAdressForm={showAdressForm}
        setShowAdressForm={setShowAdressForm}
      />
      {pages}
      <div className="fixed z-40 bg-gray-600 right-0 bottom-0">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={e =>
            displayAdressForm(
              new Object({
                id: 0,
                name: "New",
                url: process.env.MAPIURL_ADDRESSNEW
              }),
              setEntity,
              setShowAdressForm
            )
          }
        >
          +
        </button>
      </div>
      <div className="mx-auto mt-10 mb-20 w-1/3">
        <button
          ref={$loadMoreButton}
          className="bg-red-600 border-solid border-2 hover:bg-white border-red-600 text-white hover:text-red-600 font-bold py-2 px-4 rounded-full w-full"
          disabled={isLoadingMore}
          onClick={() => {
            loadMore();
            setInfiniteScrollEnabled(true);
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default AddressPagination;
