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
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Results 1";
        viewData.adobeDataLayer.PageName = "questionnaire-results-1";

        res.setViewData();
        
        res.render('hearingScreener/results/q-results-1');
        
        next();
    }
);
server.get(
    'ResultsPage2',
    function (req, res, next) {
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Results 2";
        viewData.adobeDataLayer.PageName = "questionnaire-results-2";

        res.setViewData();

        res.render('hearingScreener/results/q-results-2');
        
        next();
    }
);
server.get(
    'ResultsPage3',
    function (req, res, next) {
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Results 3";
        viewData.adobeDataLayer.PageName = "questionnaire-results-3";

        res.setViewData();

        res.render('hearingScreener/results/q-results-3');
        
        next();
    }
);
server.get(
    'ResultsPage4',
    function (req, res, next) {
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Results 4";
        viewData.adobeDataLayer.PageName = "questionnaire-results-4";

        res.setViewData();

        res.render('hearingScreener/results/q-results-4');
        
        next();
    }
);


server.get(
    'Show',
    function (req, res, next) {
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Widget";
        viewData.adobeDataLayer.PageName = "questionnaire-widget";

        res.setViewData();

        res.render('hearingScreener/questionnaire');
        
        next();
    }
);
server.get(
    'ShowLanding',
    function (req, res, next) {
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = 'GlobalData';
        viewData.adobeDataLayer.PageGroup = "Questionnaire Landing Page";
        viewData.adobeDataLayer.PageName = "questionnaire-landing-page";

        res.setViewData();

        res.render('hearingScreener/questionnaireLanding');
        
        next();
    }
);
module.exports = server.exports();