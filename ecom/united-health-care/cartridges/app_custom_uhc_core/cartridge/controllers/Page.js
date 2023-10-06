'use strict';

/**
 * @namespace Page
 */

var server = require('server');
server.extend(module.superModule);

/**
 * Page-DynamicSlot : This end point will render a content Slot from the content assets
 * @name Base/Page-DynamicSlot
 * @function
 * @memberof Page
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('DynamicSlot', function (req, res, next) {
    res.render('/components/content/dynamicSlot');
    next();
});

/**
 * Page-HSIDSignIn : This end point will fetch HSID SignIn URL from Preferences.
 * @name Page-HSIDSignIn
 * @function
 * @memberof Page
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('HSIDSignIn', function (req, res, next) {
    var preferences = require('*/cartridge/config/preferences');
    var signInURL = preferences.hsidSignInURL;
    res.render('/components/content/hsidSignInURLRedirect', { signInURL: signInURL });
    next();
});

server.append('IncludeHeaderMenu', function (req, res, next) {
    var Site = require('dw/system/Site');
    var viewData = res.getViewData();
    var currentSite = Site.current.ID;

    viewData.currentSite = currentSite;

    res.setViewData(viewData);

    next();
})

module.exports = server.exports();
