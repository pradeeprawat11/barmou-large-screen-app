import * as url from "./url_helper";
import { ApiCore } from "./api_helper";

const api = new ApiCore();

const getMenu = (event) => {
    let categoryId =  (event.categoryId) ? event.categoryId : ""
    let assetId =  (event.assetId) ? event.assetId : ""
    let page =  (event.page) ? event.page : 1
    return api.get(`${url.REST_MENU}/get-menu-app?pageNo=${page}&size=10&categoryId=${categoryId}&assetId=${assetId}`)
}

const getCategories = (event) => {
    let venueId =  (event.venueId) ? event.venueId : ""
    return api.get(`${url.REST_CATEGORY}/get/app?venueId=${venueId}`)
}

const addOrder = (event) => {
    return api.post(url.REST_RESERVATION, event)
}

const getAssetInfos = (event) => {
    let assetId = (event.assetId) ? event.assetId : ""
    return api.get(`${url.ASSET}/asset/info?assetId=${assetId}`)
}

const addNotification = (event) => {
    return api.post(url.REST_NOTIFICATION, event)
}

export {getMenu, getCategories, addOrder, getAssetInfos, addNotification}