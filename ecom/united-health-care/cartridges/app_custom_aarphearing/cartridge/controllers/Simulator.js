'use strict';

/**
 * @namespace Simulator
 */
var Site = require('dw/system/Site');
var currentSiteID = Site.current.ID;
var currentSitePipeline = 'Sites-' + currentSiteID + '-Site';

var server = require('server');


server.get(
    'Show',
    function (req, res, next) {
        res.render('simulator/simulatorLanding');
        next();
    }
);

module.exports = server.exports();