// import { Amplify } from "aws-amplify";
// import { get } from "aws-amplify/api";
// import { put } from "aws-amplify/api";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import "@aws-amplify/ui-react/styles.css";
// import config from "./amplifyconfiguration.json";
// Amplify.configure(config);

// async function updateTodo() {
//   try {
//     const todo = { name: "pet2", type: "2" };
//     const restOperation = put({
//       apiName: "reportsapi",
//       path: "/reports",
//       options: {
//         body: todo,
//       },
//     });
//     const response = await restOperation.response;
//     console.log("PUT call succeeded: ", response);
//   } catch (e) {
//     console.log("PUT call failed: ", JSON.parse(e.response.body));
//   }
// }
// async function getTodo() {
//   try {
//     const restOperation = get({
//       apiName: "reportsapi",
//       path: "/reports",
//     });
//     const response = await restOperation.response;
//     console.log("GET call succeeded: ", await response.body.json());
//   } catch (e) {
//     console.log("GET call failed: ", e);
//   }
// }

// function App({ signOut, user }) {

//   return (
//     <>
//       <h1>Hello {user.username}</h1>
//       <h6>{console.log(getTodo())}</h6>
//       <button onClick={updateTodo}>Add Record</button>
//       <button onClick={signOut}>Sign out</button>
//     </>
//   );
// }

// export default withAuthenticator(App);


import { Amplify } from "aws-amplify";
import { get, put, post, del } from "aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

async function createTodo() {
  try {
    const todo = {"item":{ "id":"4", "name": "New", "type": "1" }};
    const response = post({
      apiName: "reportsapi",
      path: "/reports",
      options: {
        body: todo,
      },
    });
    console.log("POST call succeeded: ", response);
  } catch (e) {
    console.log("POST call failed: ", JSON.parse(e.response.body));
  }
}

async function updateTodo() {
  try {
    const todo = {"item":{ "id":"2", "name": "Updated", "type": "1" }};
    const response =  put({
      apiName: "reportsapi",
      path: "/reports",
      options: {
        body: todo,
      },
    });
    console.log("PUT call succeeded: ", response);
  } catch (e) {
    console.log("PUT call failed: ", JSON.parse(e.response.body));
  }
}

async function deleteTodo() {
  try {
    const todoId = "4";
    const response =  del({
      apiName: "reportsapi",
      path: `/reports/${todoId}`
    });
    console.log("DELETE call succeeded: ", response);
  } catch (e) {
    console.log("DELETE call failed: ", JSON.parse(e.response.body));
  }
}

async function getTodos() {
  try {
    const response =  get({
      apiName: "reportsapi",
      path: "/reports",
    });
    console.log("GET call succeeded: ",await (await response.response).body.json());
  } catch (e) {
    console.log("GET call failed: ", e);
  }
}

function App({ signOut, user }) {
  const handleGetTodos = async () => {
    await getTodos();
  };

  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={handleGetTodos}>Get Records</button>
      <button onClick={createTodo}>Add Record</button>
      <button onClick={updateTodo}>Update Record</button>
      <button onClick={deleteTodo}>Delete Record</button>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
