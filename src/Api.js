import CommonUtils from "./modules/base/utils/CommonUtils";
import {AlertType} from "./modules/base/model/SnackbarSlice";
import {store} from "./static/store";

export const APIs = Object.freeze({
  API_REFRESH_TOKEN: "api/jwt/refresh/",
  LOGIN: "accounts/login/"  //,
  // LOGIN: "api/jwt/auth/login/"

});

class Api {

  static getURL (api, params = null) {
    const REACT_APP_API_URL = "http://192.168.8.129:8000"; //https://digitalarznode.com"; //"http://127.0.0.1:8000"; //
    let url = `${REACT_APP_API_URL}/${api}`;
    for (const key in params) 
      url = url.replace(":" + key, params[key]);
    

    return url;
  }

  static async getAccessToken () {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;
    if (refreshToken) {
      const url = Api.getURL(APIs.API_REFRESH_TOKEN);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          refresh: refreshToken
        })
      });
      const data = await response.json();
      return data.access;
    }
  }

  static async get (apiKey, params = null, isJSON = true) {
    try {
      const accessToken = await this.getAccessToken(); //state.user.accessToken
      // const state = store.getState();
      if (accessToken) {
        const headers = new Headers({
          "Authorization": "Bearer " + accessToken
        });

        const url = Api.getURL(apiKey, params);
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: headers
        });
        return await this.apiResponsePayload(response, isJSON);
      }
    } catch (e) {
      CommonUtils.showSnackbar("Services are not available at this time.", AlertType.error);
      console.error(e);
    }
  }

  static async post (apiKey, data, params = null, isJSON = true) {
    try {
      // const state = store.getState();
      const accessToken = await this.getAccessToken(); //state.user.accessToken
      // const state = store.getState();
      if (accessToken) {
        const headers = new Headers({
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json"
        });
        const url = Api.getURL(apiKey, params);
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: headers,
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await this.apiResponsePayload(response, isJSON);
      }
    } catch (e) {
      CommonUtils.showSnackbar("Services are not available at this time.", AlertType.error);
      console.error(e);
    }
  }

  static async authenticate (formData) {
    try {
      const headers = new Headers({
        "X-REQUESTED-WITH": "XMLHttpRequest"
      });
      const url = Api.getURL(APIs.LOGIN);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData // body data type must match "Content-Type" header
      });
      return await this.apiResponsePayload(response, true);



    } catch (e) {
      CommonUtils.showSnackbar("Failed to upload files", AlertType.error);
      console.error(e);
    }
  }

  static async postFile (api_key, formData, isJSON = true) {
    try {
      const accessToken = await this.getAccessToken();
      const headers = new Headers({
        "X-REQUESTED-WITH": "XMLHttpRequest",
        "Authorization": "Bearer " + accessToken
      });
      const url = Api.getURL(api_key);
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData // body data type must match "Content-Type" header
      });
      return await this.apiResponsePayload(response, isJSON);
    } catch (e) {
      CommonUtils.showSnackbar("Failed to upload files", AlertType.error);
      console.error(e);
    }
  }

  static async apiResponsePayload (response, isJSON = true) {
    if (response.ok) 
      return isJSON ? await response.json() : await response.text();
    else if (response.status === 401) 
      CommonUtils.showSnackbar("You are unauthorized to submit this request. Please contact project office.", AlertType.error);
    // store.dispatch(setAuthentication(false));
    else if (response.status === 400) 
      CommonUtils.showSnackbar("Bad Request. Please check your parameters...");
    else if (response.status === 204) 
      CommonUtils.showSnackbar("No related data or content found", AlertType.error);
    else 
      CommonUtils.showSnackbar("Failed to post service. Please contact admin", AlertType.error);
    
    return null;
  }

}

export default Api;
