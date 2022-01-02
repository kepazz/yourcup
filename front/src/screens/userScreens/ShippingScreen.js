import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShippingInformation } from "../../actions/cartActions";

export default function ShippingScreen(props) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  if (!userInfo) {
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingInformation = {
      name: name,
      surname: surname,
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
    };

    dispatch(createShippingInformation(shippingInformation));

    props.history.push("/checkout");
  };

  return (
    <div className="container">
      <div className="content is-medium has-text-centered">
        <h1 className="py-5">Shipping information</h1>
        <hr className="mx-4" />
      </div>

      <section class="hero halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered ">
              <div class="column is-one-third  is-offset-one-third box">
                <form onSubmit={submitHandler} autoComplete="off">
                  <div class="field">
                    <label htmlFor="name" class="label">
                      Name
                    </label>
                    <div class="control">
                      <input
                        id="name"
                        type="text"
                        class="input"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="surname" class="label">
                      Surname
                    </label>
                    <div class="control">
                      <input
                        id="surname"
                        type="text"
                        class="input"
                        placeholder="Enter surname"
                        required
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="address" class="label">
                      Address
                    </label>
                    <div class="control">
                      <input
                        id="address"
                        type="text"
                        class="input"
                        placeholder="Enter address"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label htmlFor="city" class="label">
                      City
                    </label>
                    <div class="control">
                      <input
                        id="city"
                        type="text"
                        class="input"
                        placeholder="Enter city"
                        required
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label htmlFor="postalcode" class="label">
                      Postal code
                    </label>
                    <div class="control">
                      <input
                        id="postalcode"
                        type="text"
                        class="input"
                        placeholder="Enter surname"
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label htmlFor="country" class="label">
                      Country
                    </label>
                    <div class="select">
                      <select
                        name="country"
                        id="country"
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        
                      >
                        <option value="" hidden>
                          Select country
                        </option>
                        <option value="LT">Lithuania</option>
                        <option value="AX">Aland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="AD">Andorra</option>
                        <option value="AT">Austria</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BG">Bulgaria</option>
                        <option value="HR">Croatia</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="EE">Estonia</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GG">Guernsey</option>
                        <option value="VA">
                          Holy See (Vatican City State)
                        </option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IT">Italy</option>
                        <option value="JE">Jersey</option>
                        <option value="XK">Kosovo</option>
                        <option value="LV">Latvia</option>
                        <option value="LI">Liechtenstein</option>

                        <option value="LU">Luxembourg</option>
                        <option value="MK">
                          Macedonia, the Former Yugoslav Republic of
                        </option>
                        <option value="MT">Malta</option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="ME">Montenegro</option>
                        <option value="NL">Netherlands</option>
                        <option value="NO">Norway</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="RO">Romania</option>
                        <option value="SM">San Marino</option>
                        <option value="RS">Serbia</option>
                        <option value="CS">Serbia and Montenegro</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="ES">Spain</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="UA">Ukraine</option>
                        <option value="GB">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <div class="field has-text-centered py-3">
                    <button class="button is-rounded btn-prim ">Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
