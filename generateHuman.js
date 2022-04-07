import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import * as validation from "../validation.js";

const generateRandomNumberByRange = (fromValue, toValue) => {
  validation.isValidNumber(fromValue);
  validation.isValidNumber(toValue);
  validation.isNotNaN(fromValue);
  validation.isNotNaN(toValue);

  const isFromHigherThanTo = fromValue > toValue;
  if (isFromHigherThanTo) {
    throw new Error(`fromValue cant be higher than toValue`);
  }

  return Math.floor(Math.random() * (toValue - fromValue) + fromValue);
};

async function fetchUserData() {
  try {
    const res = await fetch(
      "https://random-data-api.com/api/users/random_user"
    );

    return await res.json();
  } catch (error) {
    throw new Error(`Can't connect to data source`);
  }
}

// generatePhoneNumber

function generatePhoneNumber() {
  const phoneNumber = Math.floor(
    Math.random() * (999999999 - 100000000) + 100000000
  );

  return phoneNumber;
}

async function generateHuman() {
  try {
    const userData = await fetchUserData();

    validation.isObject(userData);
    validation.objectHasProperty(userData, "first_name");
    validation.objectHasProperty(userData, "last_name");
    validation.objectHasProperty(userData, "address");

    const { first_name, last_name, address } = userData;

    validation.isValidName(first_name);
    validation.isValidName(last_name);
    validation.isValidCountry(address.country);

    // validation.isValidName(address.country, options);
    // defaultValues
    // {
    //   errorMessage: 'qweqweqweqw',
    //   shouldThrow: true / false
    // }

    const ageMin = 18;
    const ageMax = 85;
    const age = generateRandomNumberByRange(ageMin, ageMax);
    const name = first_name;
    const surname = last_name;
    const country = address.country;
    const email = `${name}${surname}@op.pl`.toLowerCase();
    const phoneNumber = generatePhoneNumber();

    return {
      id: uuidv4(),
      name,
      surname,
      email,
      age,
      phoneNumber,
      country,
    };
  } catch (error) {
    console.error(error);
  }
}

const newUser1 = await generateHuman();

console.log(newUser1);

//newUser1.then((val) => console.log(val));
