/**
 * Form basedon: https://tailwindcomponents.com/component/form-grid
 * and https://tailwindcomponents.com/component/simple-modal
 */
//import fetcher from "../lib/fetcher";
import useSWR from "swr";
import React, {useState} from "react";
import {checkStatus,parseJSON} from "../lib/jsonfetcher";

function AddressForm(props) {
  if (Number(props.addressId) == 0) {
    return <div></div>;
  }
  const [dataloaded, setDataloaded] = useState(props.addressId);
  const [dfirstname, setDFirstname] = useState("");
  const [dlastname, setDLastname] = useState("");

  //const {data} = useSWR(props.addressId.url, fetcher, {
    //onSuccess: dataloaded=true
  //});

  function saveData(setShowAdressForm) {
    console.log("Data:",dfirstname,dlastname);
    fetch(props.addressId.url, {
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
            "firstname": dfirstname,
            "lastname": dlastname
       })
    });
    setShowAdressForm(false);
  }

  if (props.addressId.url !== dataloaded) {
    fetch(props.addressId.url)
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log("request succeeded with JSON response", data);
        setDFirstname(data.firstname);
        setDLastname(data.lastname);
        setDataloaded(props.addressId.url);
      })
      .catch(function(error) {
        console.log("request failed", error);
        setDataloaded(props.addressId);
      });
  }

  return (
    <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
      {props.showAdressForm ? (
        <div className="z-40 bg-gray-400 rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
          <article className="shadow p-5 relative">
            <h2 className="font-bold text-xl capitalize">
              {props.addressId.name}
            </h2>
            {dataloaded ? (
              <>
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={dfirstname}
                  onChange={e => {
                    setDFirstname(e.target.value);
                  }}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                ></input>
                <p className="text-red text-xs italic">
                  Please fill out this field.
                </p>
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={dlastname}
                  onChange={e => {
                    setDLastname(e.target.value);
                  }}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Cartney"
                ></input>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={e => saveData(props.setShowAdressForm)}
                >
                  save
                </button>
                <br />
              </>
            ) : (
              <p className="font-bold text-l capitalize">Loading {name}...</p>
            )}
          </article>
        </div>
      ) : null}
    </div>
  );
}

export default AddressForm;
