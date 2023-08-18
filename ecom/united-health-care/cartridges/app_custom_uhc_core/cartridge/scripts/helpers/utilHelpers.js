<<<<<<< HEAD
'use strict';

var base = module.superModule;
/**
 * Tests if device is desktop or not
 * @returns {boolean}  true if it is desktop
 */
base.isDesktopDevice = function isDesktopDevice() {
    var userAgent = request.getHttpUserAgent();
    if (userAgent && (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(userAgent))) {
        return false;
    }
    return true;
};

/**
 * If there is an api key creates the url to include the google maps api else returns null
 * @param {string} apiKey - the api key or null
 * @returns {string|Null} return the api
 */
base.getGoogleMapsApi = function getGoogleMapsApi(apiKey) {
    var googleMapsApi;
    if (apiKey) {
        googleMapsApi = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap&v=weekly';
    } else {
        googleMapsApi = null;
    }

    return googleMapsApi;
};

/**
 * Set cookie
 * @param {string} cookieId - cookieId
 * @param {Object} cookieValue - cookieValue
 */
base.setCookie = function setCookie(cookieId, cookieValue) {
    var Cookie = require('dw/web/Cookie');
    var cookieObj = new Cookie(cookieId, cookieValue);
    cookieObj.setPath('/');
    cookieObj.setSecure(true);
    response.addHttpCookie(cookieObj);
};

/**
 * Set customer for orders
 * @param {Object} customer - customer
 * @returns {boolean} - if orders are linked to customer
 */
base.setOrderCustomer = function setOrderCustomer(customer) {
    var OrderMgr = require('dw/order/OrderMgr');
    var Transaction = require('dw/system/Transaction');
    var Logger = require('dw/system/Logger');
    var statusNew = 3;
    var statusOpen = 4;
    // var orderIterator = OrderMgr.searchOrders('customerEmail = {0} AND (status = {1} OR status = {2})', 'creationDate asc', customer.profile.email, Order.ORDER_STATUS_NEW, Order.ORDER_STATUS_OPEN);
    Logger.info('searching for orders from customer ' + customer.profile.customerNo + ' ' + customer.profile.email);
    var orderIterator = OrderMgr.searchOrders('customerEmail = {0} AND (status = {1} OR status = {2})', 'creationDate asc', customer.profile.email, statusNew, statusOpen);
    Logger.info(orderIterator.count + ': Order Processed for customer ' + customer.profile.customerNo);
    var linkedOrders = false;
    if (orderIterator.count > 0) {
        while (orderIterator.hasNext()) {
            var order = orderIterator.next();
            Logger.info(order.getOrderNo() + ': Order Number Start Processing');
            // eslint-disable-next-line no-loop-func
            Transaction.wrap(function () {
                order.setCustomer(customer);
                order.addNote('Order linked to customer -', customer.profile.email);
            });
            linkedOrders = true;
        }
    }
    orderIterator.close();
    return linkedOrders;
};

module.exports = base;
=======
'use strict';

var base = module.superModule;
/**
 * Tests if device is desktop or not
 * @returns {boolean}  true if it is desktop
 */
base.isDesktopDevice = function isDesktopDevice() {
    var userAgent = request.getHttpUserAgent();
    if (userAgent && (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(userAgent))) {
        return false;
    }
    return true;
};

/**
 * If there is an api key creates the url to include the google maps api else returns null
 * @param {string} apiKey - the api key or null
 * @returns {string|Null} return the api
 */
base.getGoogleMapsApi = function getGoogleMapsApi(apiKey) {
    var googleMapsApi;
    if (apiKey) {
        googleMapsApi = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap&v=weekly';
    } else {
        googleMapsApi = null;
    }

    return googleMapsApi;
};

/**
 * Set cookie
 * @param {string} cookieId - cookieId
 * @param {Object} cookieValue - cookieValue
 */
base.setCookie = function setCookie(cookieId, cookieValue) {
    var Cookie = require('dw/web/Cookie');
    var cookieObj = new Cookie(cookieId, cookieValue);
    cookieObj.setPath('/');
    cookieObj.setSecure(true);
    response.addHttpCookie(cookieObj);
};

/**
 * Set customer for orders
 * @param {Object} customer - customer
 */
base.setOrderCustomer = function setOrderCustomer(customer) {
    var preferences = require('*/cartridge/config/preferences');
    var orderHistoryDate = preferences.orderHistoryDate;
    var Calendar = require('dw/util/Calendar');
    var OrderMgr = require('dw/order/OrderMgr');
    var Transaction = require('dw/system/Transaction');
    var Order = require('dw/order/Order');
    var dateFromCal = new Calendar(orderHistoryDate);
    var orderHistoryDates = dateFromCal.time;
    var Logger = require('dw/system/Logger');
    Logger.info('searching for orders from customer ' + customer.profile.customerNo);
    var orderIterator = OrderMgr.searchOrders('customerEmail = {0} AND creationDate >= {1}   AND (status = {2} OR status = {3}', 'creationDate asc', customer.profile.email, orderHistoryDates, Order.ORDER_STATUS_NEW, Order.ORDER_STATUS_OPEN);
    Logger.info(orderIterator.count + ': Order Processed for customer ' + customer.profile.customerNo);
    if (orderIterator.count > 0) {
        while (orderIterator.hasNext()) {
            var order = orderIterator.next();
            Logger.info(order.getOrderNo() + ': Order Number Start Processing');
            // eslint-disable-next-line no-loop-func
            Transaction.wrap(function () {
                order.setCustomer(customer);
            });
        }
    }
    orderIterator.close();
    return;
};

module.exports = base;
>>>>>>> 30b30ede8e6eef942643cb8fb5192de1d1c11bc9
