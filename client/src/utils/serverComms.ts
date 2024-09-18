import { getAuth } from "firebase/auth";

const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  } else {
    return null;
  }
};

/*
To make a call to the server, you can use the following type function call:

const token = await getAuthToken();
const response = await fetch("http://eatsleepcode-ftri49.firebaseio.com/api/v1/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },  
  body: JSON.stringify(data)
});

if (response.ok) {
  const result = await response.json();
  console.log(result);
} else {
  console.error("Failed to make request");
}
*/

export default getAuthToken;
