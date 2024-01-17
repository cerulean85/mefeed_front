import axios from "axios";

export async function remoteAxiosPost(
  requestUrl: string,
  requestParameter: object,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  axios
    .post(requestUrl, requestParameter)
    .then(function (response) {
      console.log(response);
      successAction(response);
    })
    .catch(function (error) {
      console.trace();
      console.log(error);
      failAction(error);
    });
}

export async function remoteAxiosDelete(
  requestUrl: string,
  requestParameter: object,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  axios
    .delete(requestUrl, { data: requestParameter })
    .then(function (response) {
      console.log(response);
      successAction(response);
    })
    .catch(function (error) {
      console.log(error);
      failAction(error);
    });
}

export async function remoteAxiosDeleteToForm(
  requestUrl: string,
  requestParameter: object,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  axios
    .delete(requestUrl, requestParameter)
    .then(function (response) {
      console.log(response);
      successAction(response);
    })
    .catch(function (error) {
      console.log(error);
      failAction(error);
    });
}

export async function remoteAxiosPut(
  requestUrl: string,
  requestParameter: object,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  axios
    .put(requestUrl, requestParameter)
    .then(function (response) {
      console.log(response);
      successAction(response);
    })
    .catch(function (error) {
      console.log(error);
      failAction(error);
    });
}

export async function remoteAxiosPutToForm(
  requestUrl: string,
  requestParameter: object,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  axios
    .put(requestUrl, requestParameter)
    .then(function (response) {
      console.log(response);
      successAction(response);
    })
    .catch(function (error) {
      console.log(error);
      failAction(error);
    });
}

export async function remoteAxiosGet(
  requestUrl: string,
  successAction = (result: any) => {},
  failAction = (error: any) => {}
) {
  await axios
    .get(requestUrl)
    .then((response) => {
      console.info(response);
      successAction(response.data);
    })
    .catch((error) => {
      console.trace();
      console.error(error);
      failAction(error);
    });
}

// async function remoteFetch (
//   serverDomain: string,
//   requestName: string,
//   requestParameter: object,
//   requestMethod: string = "POST",
//   successAction = (result: any) => {},
//   failAction = (error: any) => {}
//   )
// {
//   fetch(`${serverDomain}/${requestName}`, {
//     method: requestMethod,
//     mode: "cors", //no-cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(requestParameter),
//   })
//   .then((response) => {
//     console.log(response);
//     console.log(response.json());
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     successAction(data);
//   })
//   .catch((error) => {
//     console.log(`error: ${error}`);
//     failAction(error)
//   });
// }
