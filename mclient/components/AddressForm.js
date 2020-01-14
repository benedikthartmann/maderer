/**
 * Form basedon: https://tailwindcomponents.com/component/form-grid
 * and https://tailwindcomponents.com/component/simple-modal
 *
 * Patttern: local-state sharing
 * https://github.com/zeit/swr/tree/master/examples/local-state-sharing
 */
import fetcher from "../lib/fetcher";
import useSWR, {mutate} from "swr";
import React, {useState, useEffect} from "react";

function displayAdressForm(entity, setEntity, setShowAdressForm) {
  setEntity(entity);
  setShowAdressForm(true);
}

function AddressForm(props) {
  if (Number(props.entity) == 0) {
    return <div></div>;
  }

  let swrKey = props.entity.url;
  let swrFetcher = fetcher;

  if (Number(props.entity.id) == 0) {
    swrKey = "localStateNew";
    swrFetcher =  { initialData: {
      id: 0,
      firstname: "",
      lastname: ""
    } };
    console.log("New");
  }

  const {data} = useSWR(swrKey, swrFetcher);
  if (!data) {
    return null;
  }

  console.log("Data:", data);

  const [formfielddata, setFormFieldData] = useState(new Object());

  // Similar to componentDidMount and componentDidUpdate:
  // set the initial data from the json data load (swr) for the formfield
  useEffect(() => {
    setFormFieldData(data);
  });

  function handleSave(event) {
    fetch(props.entity.url, {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formfielddata)
    });
    mutate(
      props.entity.url,
      {...data, formfielddata},
      //{...data, firstname: dfirstname, lastname: dlastname},
      false
    );
    props.setShowAdressForm(false);
  }

  function changeFormField(fieldname, value) {
    let formfielddataTmp = formfielddata;
    formfielddata[fieldname] = value;
    setFormFieldData(formfielddata);
  }

  return (
    <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
      {props.showAdressForm ? (
        <div className="z-40 bg-gray-400 rounded shadow p-8 m-4 max-w-xs max-h-full text-center fixed overflow-y-scroll">
          <article className="shadow p-5 relative">
            <h2 className="font-bold text-xl capitalize">
              {props.entity.name}
            </h2>
            {data ? (
              <>
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  defaultValue={data.firstname}
                  onChange={e => {
                    changeFormField("firstname", e.target.value);
                  }}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                ></input>
                <p className="text-red text-xs italic">
                  Please fill out this field.
                </p>
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  defaultValue={data.lastname}
                  onChange={e => {
                    changeFormField("lastname", e.target.value);
                  }}
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Cartney"
                ></input>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSave}
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

export {AddressForm, displayAdressForm};
