import React, {useState} from "react";
import Head from "next/head";
import useSWR, {trigger} from "swr";
import fetcher from "../lib/fetcher";
import AddressShort from "../components/AddressShort";
import {AddressForm, displayAdressForm} from "../components/AddressForm";

function AddressList() {
  const {data} = useSWR(process.env.MAPIURL_ADDRESSLIST, fetcher, {
    refreshInterval: 0
  });
  const [showAdressForm, setShowAdressForm] = useState(false);
  const [entity, setEntity] = useState(0);

  if (!data) return <h1>Loading...</h1>;
  const {results} = data;

  return (
    <>
      <AddressForm
        entity={entity}
        showAdressForm={showAdressForm}
        setShowAdressForm={setShowAdressForm}
      />
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
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={e =>
            trigger(process.env.MAPIURL_ADDRESSLIST)
          }
        >
          reload
        </button>
      </div>
      <section>
        {results.map(result => (
          <AddressShort
            key={result.id}
            setEntity={setEntity}
            entity={result}
            showAdressForm={showAdressForm}
            setShowAdressForm={setShowAdressForm}
          />
        ))}
      </section>
    </>
  );
}

export default AddressList;
