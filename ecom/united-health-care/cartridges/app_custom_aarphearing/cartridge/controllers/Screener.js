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
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = adobeDataLayer.pageTypes.HHQ1;
        viewData.adobeDataLayer.PageName = 'questionnaire-results-1';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/results/q-results-1');
        res.setViewData();

        next();
    }
);
server.get(
    'ResultsPage2',
    function (req, res, next) {
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = adobeDataLayer.pageTypes.HHQ2;
        viewData.adobeDataLayer.PageName = 'questionnaire-results-2';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/results/q-results-2');
        res.setViewData();

        next();
    }
);
server.get(
    'ResultsPage3',
    function (req, res, next) {
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = adobeDataLayer.pageTypes.HHQ3;
        viewData.adobeDataLayer.PageName = 'questionnaire-results-3';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/results/q-results-3');
        res.setViewData();

        next();
    }
);
server.get(
    'ResultsPage4',
    function (req, res, next) {
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = adobeDataLayer.pageTypes.HHQ4;
        viewData.adobeDataLayer.PageName = 'questionnaire-results-4';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/results/q-results-4');
        res.setViewData();

        next();
    }
);


server.get(
    'Show',
    function (req, res, next) {
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = 'Questionnaire Widget';
        viewData.adobeDataLayer.PageName = 'questionnaire-widget';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/questionnaire');
        res.setViewData();

        next();
    }
);
server.get(
    'ShowLanding',
    function (req, res, next) {
        let adobeDataLayer = require('*/cartridge/scripts/datalayer.js');
        var viewData = res.getViewData();

        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.Context = adobeDataLayer.CONTEXT.GLOBAL;
        viewData.adobeDataLayer.PageGroup = 'Questionnaire Landing Page';
        viewData.adobeDataLayer.PageName = 'questionnaire-landing-page';

        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        
        res.render('hearingScreener/questionnaireLanding');
        res.setViewData();

        next();
    }
);
module.exports = server.exports();
