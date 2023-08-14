'use strict';

/**
 * @namespace Screener
 */
var Site = require('dw/system/Site');
var currentSiteID = Site.current.ID;
var currentSitePipeline = 'Sites-' + currentSiteID + '-Site';

var server = require('server');

// 8/14/2023 - Questionnaire needs selections to be recorded and on submit, one of four landing pages is rendered.

// For temporary testing and construction purposes, give each template it's own render method

server.get(
    'ResultsPage1',
    function (req, res, next) {
        res.render('hearingScreener/results/q-results-1');
        next();
    }
);
server.get(
    'ResultsPage2',
    function (req, res, next) {
        res.render('hearingScreener/results/q-results-2');
        next();
    }
);
server.get(
    'ResultsPage3',
    function (req, res, next) {
        res.render('hearingScreener/results/q-results-3');
        next();
    }
);
server.get(
    'ResultsPage4',
    function (req, res, next) {
        res.render('hearingScreener/results/q-results-4');
        next();
    }
);


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
        res.render('hearingScreener/questionnaireLanding');
        next();
    }
);
module.exports = server.exports();