import fetcher from "../lib/fetcher";
import useSWR from "swr";
import React, {useState, useEffect} from "react";
import {AddressForm, displayAdressForm} from "../components/AddressForm";

function AddressShort(props) {
  if (Number(props.entity) == 0) {
    return <div></div>;
  }

  const {data} = useSWR(props.entity.url, fetcher);

  return (
    <div className="my-5 p-2 w-1/3">
      <article className="shadow p-5 relative">
        <h2 className="font-bold text-xl capitalize">{props.entity.name}</h2>
        {data ? (
          <>
            <div className="absolute top-0 right-0">
              <img src="" />
            </div>
            <ul>
              <li>
                {data.firstname}
              </li>
              <li>
                {data.lastname}
              </li>
            </ul>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={e =>
                displayAdressForm(
                  props.entity,
                  props.setEntity,
                  props.setShowAdressForm
                )
              }
            >
              edit
            </button>
            <br />
          </>
        ) : (
          <p className="font-bold text-l capitalize">
            Loading {props.entity.id}...
          </p>
        )}
      </article>
    </div>
  );
}

export default AddressShort;
