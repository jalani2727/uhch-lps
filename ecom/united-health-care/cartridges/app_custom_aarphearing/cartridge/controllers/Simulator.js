<<<<<<< HEAD
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
        var viewData = res.getViewData();
        viewData.adobeDataLayer = {};
        viewData.adobeDataLayer.PageGroup = 'Simulator';
        viewData.adobeDataLayer.PageName = 'simulator-landing-page';
        viewData.adobeDataLayer.Context = 'GlobalData';
        var sections = {};
        sections.section1 = '';
        sections.section2 = '';
        sections.section3 = '';
        sections.section4 = '';
        viewData.adobeDataLayer.sections = sections;
        res.render('simulator/simulatorLanding');
        res.setViewData();
        next();
    }
);

=======
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

>>>>>>> 30b30ede8e6eef942643cb8fb5192de1d1c11bc9
module.exports = server.exports();