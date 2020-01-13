import React, {useState} from "react";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import AddressShort from "../components/AddressShort";
import AddressForm from "../components/AddressForm";

function AddressList() {
  const {data} = useSWR(process.env.MAPIURL_ADDRESLIST, fetcher);
  const [showAdressForm, setShowAdressForm] = useState(false);
  const [addressId, setAddressId] = useState(0);

  if (!data) return <h1>Loading...</h1>;
  const {results} = data;

  return (
    <>
      <AddressForm
        addressId={addressId}
        showAdressForm={showAdressForm}
        setShowAdressForm={setShowAdressForm}
      />
      <section className="container mx-auto z-0">
        <div className="-mx-2 flex flex-wrap">
          {results.map(result => (
            <AddressShort
              key={result.id}
              setAddressId={setAddressId}
              addressId={result}
              showAdressForm={showAdressForm}
              setShowAdressForm={setShowAdressForm}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default AddressList;
