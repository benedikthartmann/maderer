import fetcher from "../lib/fetcher";
import useSWR from "swr";
import React, {useState, useEffect} from "react";
import {AddressForm, displayAdressForm} from "../components/AddressForm";

function AddressShort(props) {
  if (Number(props.entity) == 0) {
    return <div></div>;
  }

  const {data} = useSWR(props.entity.url, fetcher,{refreshInterval: 0});

  return (
        data ? (
          <div key={props.entity.id} className="flex z-0">
            <div className="bg-red-500 sm:bg-green-500 md:bg-blue-500 lg:bg-pink-500 xl:bg-teal-500">{props.entity.name}</div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">{data.firstname}</div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">{data.lastname}</div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-gray-500">
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
              </div>
          </div>
        ) : (
          <p className="font-bold text-l capitalize">
            Loading {props.entity.id}...
          </p>
        )
  );
}

export default AddressShort;
/*

*/
