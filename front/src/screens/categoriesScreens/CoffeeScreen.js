import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent";
import { listProducts } from "../../actions/productsActions";
import Card from "../../components/Card";

export default function CoffeeScreen() {
  const selectableVariables = {
    coffee: [
      { value: "arabica", displayName: "Arabica" },
      { value: "robusta", displayName: "Robusta" },
      { value: "liberica", displayName: "Liberica" },
      { value: "excelsa", displayName: "Excelsa" },
    ],
    tea: [
      { value: "white", displayName: "White" },
      { value: "green", displayName: "Green" },
      { value: "black", displayName: "Black" },
    ],
    cups: [
      { value: "mug", displayName: "Mug" },
      { value: "teacup", displayName: "Teacup" },
    ],
    machines: [
      { value: "mokapot", displayName: "Moka pot" },
      { value: "kettle", displayName: "Kettle" },
    ],
  };
  const [country, setCountry] = useState("coffee");
  const [city, setCity] = useState("paris");
  const [cities, setCities] = useState(selectableVariables["coffee"]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    setCities(selectableVariables[event.target.value]);
    setCity(selectableVariables[event.target.value][0].value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChangeCountry} value={country}>
        <option value="coffee">Coffee</option>
        <option value="tea">Tea</option>
        <option value="cups">Cups</option>
        <option value="machines">Machines</option>
      </select>
      <select onChange={handleChangeCity}>
        {cities.map((city) => (
          <option value={city.value}>{city.displayName}</option>
        ))}
      </select>

      <fieldset>
        <div className="container ">
<div class="columns  is-multiline mx-2">
  <div class="column is-one-quarter is-offset-one-quarter   small-padding"> <label htmlFor="name" class="label">Name</label><input name="fname" class="input" placeholder="First Name..." required/></div>
  <div class="column is-one-quarter  small-padding"><label htmlFor="name" class="label">Name</label><input name="lname" class="input" placeholder="Last Name..." required/></div>
  
  <div class="column is-one-quarter is-offset-one-quarter   small-padding"> <label htmlFor="name" class="label">Name</label><input name="fname" class="input" placeholder="First Name..." required/></div>
  <div class="column is-one-quarter  small-padding"><label htmlFor="name" class="label">Name</label><input name="lname" class="input" placeholder="Last Name..." required/></div>

  <div class="column is-full small-padding"><label>Address</label><input name="address" class="input" placeholder="Full Address..."/></div>
  <div class="column is-full small-padding"><input name="city" class="input" placeholder="Suburb..."/></div>
  <div class="column is-half small-padding"><input name="state" class="input" placeholder="State..."/></div>
  <div class="column is-half small-padding"><input name="postal_code" class="input" placeholder="Postcode..."/></div>
</div></div>
</fieldset>


<div class="field is-horizontal container">
  <div class="field-body">
     
     <div class="field">
        <p class="control is-expanded">
           <span class="select is-fullwidth">
              <select name="status" id="status">
                 <option value="">Status:</option>
                 <option value="active">active</option>
                 <option value="pause">pause</option>
              </select>
           </span>
        </p>
     </div>
     <div class="field">
        <p class="control is-expanded">
           <span class="select is-fullwidth">
              <select name="limit" id="limit">
                 <option value="">Limits:</option>
                 <option value="10">10</option>
                 <option value="20">20</option>
              </select>
           </span>
        </p>
     </div>
  </div>
  </div>

  <div class="level">
  <div class="level-left">
    <div class="level-item">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g Alex"/>
        </div>
      </div>
    </div>
    <div class="level-item">
      <div class="field">
        <label class="label">Middle Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="e.g Bob"/>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  
</div>


    </div>
  );
}
