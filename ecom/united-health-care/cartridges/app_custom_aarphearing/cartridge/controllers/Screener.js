'use strict';

/**
 * @namespace Screener
 */
var Site = require('dw/system/Site');
var currentSiteID = Site.current.ID;
var currentSitePipeline = 'Sites-' + currentSiteID + '-Site';

var server = require('server');


server.get(
    'Show',
    function (req, res, next) {
        res.render('hearingScreener/questionnaire');
        next();
    }
);
server.get(
    'ShowLanding',
    function (req, res, next) {
        res.render('questionnaire/questionnaireLanding');
        next();
    }
);
module.exports = server.exports();