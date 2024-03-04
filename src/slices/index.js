import { combineReducers } from 'redux'
import menuReducer from './Menu/reducer'
import cartReducer from './Cart/reducer'
import categoriesReducer from './Category/reducer'
import orderReducer from './Order/reducer'
import notificatonReducer from './Notification/reducer'
import assetReducer from './Asset/reducer'

const rootReducer = combineReducers({
    menus: menuReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    orders: orderReducer,
    notifications: notificatonReducer,
    assets: assetReducer,
})

export default rootReducer