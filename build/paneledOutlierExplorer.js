(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('d3'), require('webcharts')) :
	typeof define === 'function' && define.amd ? define(['d3', 'webcharts'], factory) :
	(global.paneledOutlierExplorer = factory(global.d3,global.webCharts));
}(this, (function (d3,webcharts) { 'use strict';

function defineStyles() {
    var styles = [

    /***--------------------------------------------------------------------------------------\
      Global styles
    \--------------------------------------------------------------------------------------***/

    '#paneled-outlier-explorer {' + '    display: inline-block;' + '    width: 100%;' + '}', '#paneled-outlier-explorer .poe-column {' + '    display: inline-block;' + '}', '#paneled-outlier-explorer #poe-left-column {' + '    width: 20%;' + '    float: left;' + '}', '#paneled-outlier-explorer #poe-right-column {' + '    width: 79%;' + '    float: right;' + '}', '#paneled-outlier-explorer .poe-column > * {' + '    width: 100%;' + '    vertical-align: top;' + '    display: inline-block;' + '    margin-bottom: 10px;' + '    border: 1px solid #eee;' + '}', '#paneled-outlier-explorer .poe-column .poe-header {' + '    box-sizing: border-box;' + '    padding: 14px 16px;' + '    background-color: #333;' + '    color: white;' + '    font-size: 150%;' + '}', '#paneled-outlier-explorer .poe-column > * > * {' + '    margin: 10px;' + '}', '#paneled-outlier-explorer .poe-hidden {' + '    display: none !important;' + '}',

    /***--------------------------------------------------------------------------------------\
      Left column elements
    \--------------------------------------------------------------------------------------***/

    '#paneled-outlier-explorer #poe-left-column > * {' + '}',

    //webcharts controls
    '#paneled-outlier-explorer #poe-controls .wc-controls {' + '    margin-bottom: 0;' + '    clear: left;' + '}', '#paneled-outlier-explorer #poe-controls .control-group {' + '    margin: 0 0 5px 0;' + '    display: block;' + '    float: right;' + '    clear: both;' + '    width: 100%;' + '}', '#paneled-outlier-explorer #poe-controls .control-group > * {' + '    display: inline-block;' + '    vertical-align: top;' + '    float: right;' + '}', '#paneled-outlier-explorer #poe-controls .span-description {' + '    font-size: 90%;' + '}', '#paneled-outlier-explorer #poe-controls .changer {' + '    margin-left: 5px;' + '    width: 50%;' + '    clear: right;' + '    box-sizing: border-box;' + '}',

    //measure list
    '#paneled-outlier-explorer #poe-all-measures {' + '    width: 100%;' + '    display: inline-block;' + '    clear: both;' + '}', '#paneled-outlier-explorer #poe-all-measures > * {' + '    float: right;' + '}', '#paneled-outlier-explorer #poe-measure-list {' + '    list-style-type: none;' + '    font-weight: lighter;' + '    padding-left: 0;' + '}', '#paneled-outlier-explorer #poe-measure-list .poe-measure-item-container {' + '    width: 100%;' + '    clear: both;' + '}', '#paneled-outlier-explorer #poe-measure-list .poe-measure-item-container > * {' + '    float: right;' + '}',

    /***--------------------------------------------------------------------------------------\
      Right column elements
    \--------------------------------------------------------------------------------------***/

    '#paneled-outlier-explorer #poe-right-column > * {' + '}',

    //navigation
    '#paneled-outlier-explorer #poe-nav-bar {' + '    list-style-type: none;' + '    padding: 0;' + '    margin: 0;' + '}', '#paneled-outlier-explorer #poe-nav-bar .poe-nav {' + '    cursor: pointer;' + '    text-decoration: none;' + '    display: inline-block;' + '}', '#paneled-outlier-explorer #poe-nav-bar .poe-nav:not(:last-child) {' + '    margin-right: 14px;' + '}', '#paneled-outlier-explorer #poe-nav-bar .poe-nav:hover {' + '    background-color: #111;' + '}', '#paneled-outlier-explorer #poe-nav-bar .poe-nav.poe-active {' + '    background-color: #111;' + '}', '#paneled-outlier-explorer #poe-nav-bar .poe-nav.poe-brushed {' + '    color: orange;' + '}',

    /***--------------------------------------------------------------------------------------\
      Charts
    \--------------------------------------------------------------------------------------***/

    '#paneled-outlier-explorer path.brushed {' + '    stroke: orange;' + '    stroke-width: 3px;' + '    stroke-opacity: 1;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts {' + '    width: 75%;' + '    float: right;' + '    padding-top: 10px;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart {' + '    padding: 0 1em 0 0;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart.expanded {' + '    width: 100%;' + ' }', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .wc-chart-title {' + '    text-align: left;' + '    font-size: .9em;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button {' + '    float: right;' + '    cursor: pointer;' + '    border: 1px solid black;' + '    border-radius: 3px;' + '    padding: 0px 3px 1px 3px;' + '    font-size: 75%;' + '    margin-left: 5px;' + '    visibility: hidden;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button:hover {' + '    background: black;' + '    color: white;' + '}', '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart text.no-data {' + '    fill: red;' + '    font-size: 0.8em;' + '}',

    /***--------------------------------------------------------------------------------------\
      Listing
    \--------------------------------------------------------------------------------------***/

    '#paneled-outlier-explorer tr.brushed {' + '    border: 2px solid orange !important;' + '}', '#paneled-outlier-explorer div.wc-chart#Listing {' + '    width: 75%;' + '    float: right;' + '    padding-top: 10px;' + '    overflow-x: scroll;' + '}', '#paneled-outlier-explorer div.wc-chart#Listing table {' + '}'],
        style = this.test ? this.dom.window.document.createElement('style') : document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    if (this.test) this.dom.window.document.getElementsByTagName('head')[0].appendChild(style);else document.getElementsByTagName('head')[0].appendChild(style);
}

function applyFilters$1() {
    var _this = this;

    this.data.filtered = this.data.raw.filter(function (d) {
        var filtered = false;

        for (var variable in _this.filters) {
            if (filtered === false && !(values.length === 1 && values[0] === 'All')) filtered = _this.filters[variable].indexOf(d[variable]) === -1;
        }

        return !filtered;
    });
    this.charts.multiples.forEach(function (multiple) {
        multiple.draw(_this.data.filtered);
    });
    this.listing.draw(this.data.filtered);
}

function toggleMeasure(input, d) {
    //Determine state of checkbox.
    var checkbox = d3.select(input),
        checked = checkbox.property('checked');

    //Toggle tooltip.
    checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');

    //Hide/display associated chart.
    this.containers.charts.selectAll('.wc-chart').filter(function (di) {
        return di.measure === d.measure;
    }).classed('poe-hidden', !checked);

    //Update currently selected measures.
    if (checked) this.data.currentMeasures.push(d.measure).sort();else this.data.currentMeasures.splice(this.data.currentMeasures.indexOf(d.measure), 1);
    applyFilters$1.call(this);

    //Toggle all measures checkbox
    var allChecked = this.containers.measureToggles.size() === this.containers.measureToggles.filter(function () {
        return this.checked;
    }).size();
    this.allMeasuresToggle.attr('title', allChecked ? 'Remove all charts' : 'Display all charts').property('checked', allChecked);
}

function toggleAllMeasures() {
    var context = this,
        checked = this.containers.allMeasureToggle.property('checked');

    this.containers.allMeasureToggle.attr('title', checked ? 'Remove all charts' : 'Display all charts');

    this.containers.measureToggles.each(function (d) {
        d3.select(this).property('checked', checked);
        toggleMeasure(context, this, d);
    });
}

function navClick(d) {
    this.containers.navs.classed('active', function (di) {
        return di === d;
    });
    this.containers.rightColumn.selectAll('.poe-display').classed('hidden', true);
    this.containers.rightColumn.select('#poe-' + d.toLowerCase()).classed('hidden', false);
}

function defineLayout() {
    var _this = this;

    var context = this;

    //Top-level container
    this.containers.main = d3.select(this.element).append('div').attr('id', 'paneled-outlier-explorer');

    /**-------------------------------------------------------------------------------------------\
      Left column
    \-------------------------------------------------------------------------------------------**/

    this.containers.leftColumn = this.containers.main.append('div').classed('poe-column', true).attr('id', 'poe-left-column');
    this.containers.leftColumnHeader = this.containers.leftColumn.append('div').classed('poe-header', true).attr('id', 'poe-left-column-header').text('Controls');
    this.containers.controls = this.containers.leftColumn.append('div').attr('id', 'poe-controls');

    //Measure controls
    this.containers.measures = this.containers.leftColumn.append('div').attr('id', 'poe-measures');
    this.containers.allMeasures = this.containers.measures.append('div').attr('id', 'poe-all-measures');
    this.containers.allMeasuresToggle = this.containers.allMeasures.append('input').attr({
        'id': 'poe-toggle-all-measures',
        'type': 'checkbox'
    }).on('change', function () {
        toggleAllMeasures.call(context);
    });
    this.containers.allMeasures.append('label').attr('for', 'poe-toggle-all-measures').text('Measures');
    this.containers.measureList = this.containers.measures.append('ul').attr('id', 'poe-measure-list');

    /**-------------------------------------------------------------------------------------------\
      Right column
    \-------------------------------------------------------------------------------------------**/

    this.containers.rightColumn = this.containers.main.append('div').classed('poe-column', true).attr('id', 'poe-right-column');
    this.containers.rightColumnHeader = this.containers.rightColumn.append('div').classed('poe-header', true).attr('id', 'poe-right-column-header');
    this.containers.navBar = this.containers.rightColumnHeader.append('ul').attr('id', 'poe-nav-bar');
    this.containers.navs = this.containers.navBar.selectAll('li.poe-nav').data(['Charts', 'Listing']).enter().append('li').classed('poe-nav', true).classed('active', function (d) {
        return d === 'Charts';
    }).attr('id', function (d) {
        return 'poe-' + d + '-nav';
    }).text(function (d) {
        return d;
    });
    this.containers.navs.on('click', function (d) {
        navClick.call(_this, d);
    });
    this.containers.charts = this.containers.rightColumn.append('div').classed('poe-display', true).attr('id', 'poe-charts');
    this.containers.listing = this.containers.rightColumn.append('div').classed('poe-display', true).attr('id', 'poe-listing');
}

if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';

            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

function clone(obj) {
    var copy = void 0;

    //boolean, number, string, null, undefined
    if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj) return obj;

    //date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy [obj]! Its type is not supported.');
}

var controls = [{
    type: 'dropdown',
    label: 'X-axis',
    option: 'x.column',
    require: true
}];

var rendererSettings = {
    measure_col: 'TEST',
    time_cols: [{
        value_col: 'DY',
        type: 'linear',
        label: 'Study Day',
        order: null,
        rotate_tick_labels: false,
        vertical_space: 0
    }, {
        value_col: 'VISIT',
        type: 'ordinal',
        label: 'Visit',
        order: null,
        rotate_tick_labels: true,
        vertical_space: 75
    }, {
        value_col: 'VISITN',
        type: 'ordinal',
        label: 'Visit Number',
        order: null,
        rotate_tick_labels: false,
        vertical_space: 0
    }],
    value_col: 'STRESN',
    id_col: 'USUBJID',
    unit_col: 'STRESU',
    lln_col: 'STNRLO',
    uln_col: 'STNRHI',
    measures: null,
    filters: null,
    rotate_x_tick_labels: false
};

var webchartsSettings = {
    x: {
        type: null, // sync to [ time_cols[0].type ]
        column: null, // sync to [ time_cols[0].value_col ]
        label: ''
    },
    y: {
        type: 'linear',
        column: null, // sync to [ value_col ]
        label: ''
    },
    marks: [{
        type: 'line',
        per: null, // sync to [ id_col ]
        attributes: {
            'stroke-width': 1,
            'stroke-opacity': 0.2,
            'stroke': 'black'
        }
    }],
    resizable: false,
    scale_text: false,
    width: 400,
    height: 200,
    margin: {
        bottom: 0,
        left: 50
    },
    gridlines: 'xy'
};

function syncSettings() {
    this.settings.synced = clone(this.settings.merged);

    //x
    this.settings.synced.x.type = this.settings.synced.time_cols[0].type;
    this.settings.synced.x.column = this.settings.synced.time_cols[0].value_col;
    this.settings.synced.x.order = this.settings.synced.time_cols[0].order;
    this.settings.synced.x.rotate_tick_labels = this.settings.synced.time_cols[0].rotate_tick_labels;

    //y
    this.settings.synced.y.column = this.settings.synced.value_col;

    //marks
    this.settings.synced.marks[0].per = [this.settings.synced.id_col, this.settings.synced.measure_col];
}

function syncControls() {
    //Set x-axis control options to settings.time_cols[].value_col;
    controls.filter(function (control) {
        return control.label === 'X-axis';
    }).pop().values = settings.time_cols.map(function (d) {
        return d.value_col;
    });

    //Add user-defined filters to controls.
    if (this.settings.synced.filters && this.settings.synced.filters.length) this.settings.synced.filters.forEach(function (filter) {
        controls.push({
            type: 'subsetter',
            value_col: filter.value_col || filter,
            label: filter.label || filter.value_col || filter,
            description: 'filter',
            multiple: filter.multiple || false
        });
    });

    this.settings.controls = controls;
}

var defaults$1 = {
    rendererSettings: rendererSettings,
    webchartsSettings: webchartsSettings,
    controlsSettings: controls,
    syncSettings: syncSettings,
    syncControls: syncControls
};

function defineSettings() {
    this.settings.merged = Object.assign(Object.assign(defaults$1.rendererSettings, defaults$1.webchartsSettings), clone(this.settings.user));
    defaults$1.syncSettings.call(this);
    Object.assign(this.settings, this.settings.synced);
    defaults$1.syncControls.call(this);
}

function controls$1() {
    this.controls = webcharts.createControls(this.containers.controls.node(), {
        location: 'top',
        inputs: this.settings.controls
    });
}

function onInit() {
    this.currentMeasure = this.filters[0].val;
}

function minimize(chart) {
    //Modify chart config and redraw.
    chart.wrap.select('.m__imize-chart').html('&plus;').attr('title', 'Maximize chart');
    chart.wrap.classed('expanded', false);

    chart.config.width = chart.config.initialSettings.width;
    chart.config.max_width = null;
    chart.config.height = chart.config.initialSettings.height;
    chart.config.aspect = null;

    chart.draw();
}

function m__imize(chart) {
    //Maximize chart.
    if (!chart.wrap.classed('expanded')) {
        //Clear previously expanded chart.
        if (chart.parent.expandedChart) minimize(chart.parent.expandedChart);

        //Attach expanded chart to parent.
        chart.parent.expandedChart = chart;

        //Modify chart configuation and redraw.
        chart.wrap.select('.m__imize-chart').html('&minus;').attr('title', 'Minimize chart');
        chart.wrap.classed('expanded', true);

        chart.config.width = null;
        chart.config.max_width = 9999;
        chart.config.height = null;
        chart.config.aspect = 2.5;

        chart.draw();

        //Sort expanded chart first.
        chart.parent.wrap.selectAll('.wc-chart').sort(function (a, b) {
            return a.measure === chart.currentMeasure ? -1 : b.measure === chart.currentMeasure ? 1 : chart.config.measures.indexOf(a.measure) - chart.config.measures.indexOf(b.measure);
        });

        //Scroll window to expanded chart.
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = chart.wrap.node().getBoundingClientRect(),
            offset = elemRect.top - bodyRect.top;
        window.scrollTo(0, offset);
    } else {
        //Minimize chart
        minimize(chart);

        //Revert to default sort.
        chart.parent.wrap.selectAll('.wc-chart').sort(function (a, b) {
            return chart.config.measures.indexOf(a.measure) - chart.config.measures.indexOf(b.measure);
        });
    }
}

function onLayout() {
    var _this = this;

    this.wrap.on('mouseover', function () {
        _this.wrap.selectAll('.wc-chart-title span').style('visibility', 'visible');
    }).on('mouseout', function () {
        _this.wrap.selectAll('.wc-chart-title span').style('visibility', 'hidden');
    }).select('.wc-chart-title').append('span').classed('remove-chart chart-button', true).html('&#10006;').attr('title', 'Remove chart').style('visibility', 'hidden').on('click', function () {
        //Minimize chart.
        if (_this.wrap.classed('full-screen')) m__imize(_this);

        var checkbox = d3.select('#poe-measure-item-checkbox-' + _this.currentMeasure.replace(/[^a-z0-9-]/gi, '-'));
        checkbox.property('checked', false);
        toggleMeasure(_this.paneledOutlierExplrorer, checkbox.node(), { measure: _this.currentMeasure });
    });

    //Add ability to maximize charts in the chart title.
    var m__imizeButton = this.wrap.select('.wc-chart-title').append('span').classed('m__imize-chart chart-button', true).html('&plus;').attr('title', 'Maximize chart');
    m__imizeButton.on('click', function () {
        m__imize(_this);
    });

    //Hide measures not listed in [ settings.measures ].
    this.wrap.classed(this.currentMeasure.replace(/[^a-z0-9-]/gi, '-'), true).classed('hidden', this.parent.paneledOutlierExplorer.data.currentMeasures.indexOf(this.currentMeasure) === -1);
}

function onPreprocess() {
    var _this = this;

    //Set the y-domain individually for each measure.
    this.config.y.domain = d3.extent(this.raw_data.filter(function (d) {
        return d.measure_unit === _this.currentMeasure;
    }), function (d) {
        return +d[_this.config.value_col];
    });
    var range = this.config.y.domain[1] - this.config.y.domain[0];
    this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';

    //Sync config with X-axis selection.
    var xInput = this.controls.config.inputs.filter(function (input) {
        return input.label === 'X-axis';
    })[0],
        time_col = this.parent.paneledOutlierExplorer.settings.time_cols.filter(function (time_col) {
        return time_col.value_col === _this.config.x.column;
    })[0];

    this.config.x.type = time_col.type;
    this.config.x.order = time_col.order;
    this.config.x.rotate_tick_labels = time_col.rotate_tick_labels;
    this.config.margin.bottom = time_col.vertical_space;
}

function onDatatransform() {}

function onDraw() {
    if (this.package) this.package.overlay.call(this.package.brush.clear());
}

d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */

/**
 * See if two line segments intersect. This uses the
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 *
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */

function doLineSegmentsIntersect(p, p2, q, q2) {
    var r = subtractPoints(p2, p);
    var s = subtractPoints(q2, q);

    var uNumerator = crossProduct(subtractPoints(q, p), r);
    var denominator = crossProduct(r, s);

    if (uNumerator == 0 && denominator == 0) {
        // They are coLlinear

        // Do they touch? (Are any of the points equal?)
        if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
            return true;
        }
        // Do they overlap? (Are all the point differences in either direction the same sign)
        return !allEqual(q.x - p.x < 0, q.x - p2.x < 0, q2.x - p.x < 0, q2.x - p2.x < 0) || !allEqual(q.y - p.y < 0, q.y - p2.y < 0, q2.y - p.y < 0, q2.y - p2.y < 0);
    }

    if (denominator == 0) {
        // lines are paralell
        return false;
    }

    var u = uNumerator / denominator;
    var t = crossProduct(subtractPoints(q, p), s) / denominator;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

/**
 * Calculate the cross product of the two points.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the cross product result as a float
 */
function crossProduct(point1, point2) {
    return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return the subtraction result as a point object
 */

function subtractPoints(point1, point2) {
    var result = {};
    result.x = point1.x - point2.x;
    result.y = point1.y - point2.y;

    return result;
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1, point2) {
    return point1.x == point2.x && point1.y == point2.y;
}

/**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
function allEqual(args) {
    var firstValue = arguments[0],
        i;
    for (i = 1; i < arguments.length; i += 1) {
        if (arguments[i] != firstValue) {
            return false;
        }
    }
    return true;
}

function brushMarks(chart, lines) {
    chart.parent.brushedMeasure = chart.currentMeasure;

    var extent$$1 = chart.config.extent,
        x0 = extent$$1[0][0],
        // top left x-coordinate
    y0 = extent$$1[1][1],
        // top left y-coordinate
    x1 = extent$$1[1][0],
        // bottom right x-coordinate
    y1 = extent$$1[0][1],
        // bottom right y-coordinate
    top = { x0: x1, y0: y0, x1: x0, y1: y0 },
        right = { x0: x1, y0: y1, x1: x1, y1: y0 },
        bottom = { x0: x0, y0: y1, x1: x1, y1: y1 },
        left = { x0: x0, y0: y0, x1: x0, y1: y1 },
        sides = [top, right, bottom, left];

    //Determine which lines fall inside the brush.
    var brushedLines = lines.filter(function (d, i) {
        var intersection = false;
        d.lines.forEach(function (line, j) {
            sides.forEach(function (side, k) {
                if (!intersection) intersection = doLineSegmentsIntersect({ x: line.x0, y: line.y0 }, { x: line.x1, y: line.y1 }, { x: side.x0, y: side.y0 }, { x: side.x1, y: side.y1 });
            });
        });

        return intersection;
    });

    //Attached brushed IDs to chart parent object.
    chart.parent.data.selectedIDs = brushedLines.data().map(function (d) {
        return d.id;
    });

    //Highlight brushed lines.
    chart.parent.wrap.selectAll('.line-supergroup g.line path').classed('brushed', false).filter(function (d) {
        return chart.parent.data.selectedIDs.indexOf(d.id) > -1;
    }).classed('brushed', true).each(function (d) {
        d3.select(this.parentNode).moveToFront();
    });

    //Draw listing displaying brushed IDs first.
    if (chart.parent.data.selectedIDs.length) {
        chart.parent.data.filtered.forEach(function (d) {
            d.brushed = chart.parent.data.selectedIDs.indexOf(d[chart.config.id_col]) > -1;
        });
        chart.parent.data.brushed = chart.parent.data.filtered.filter(function (d) {
            return d.brushed;
        });
        chart.parent.listing.draw(chart.parent.data.brushed);
        d3.select('#Listing-nav').classed('brushed', true);
    } else {
        chart.parent.data.brushed = [];
        chart.parent.listing.draw(chart.parent.data.filtered);
        d3.select('#Listing-nav').classed('brushed', false);
    }
}

function brush() {
    var _this = this;

    var chart = this;

    //lines
    var lines = this.svg.selectAll('.line-supergroup g.line path');
    lines.each(function (d, i) {
        d.id = d.values[0].values.raw[0][chart.config.id_col];
        d.lln = d.values[0].values.raw[0][chart.config.lln_col];
        d.uln = d.values[0].values.raw[0][chart.config.uln_col];
        d.lines = d.values.map(function (di, i) {
            var line;
            if (i) {
                line = {
                    x0: chart.config.x.type === 'linear' ? d.values[i - 1].values.x : chart.x(d.values[i - 1].values.x) + chart.x.rangeBand() / 2,
                    y0: d.values[i - 1].values.y,
                    x1: chart.config.x.type === 'linear' ? di.values.x : chart.x(di.values.x) + chart.x.rangeBand() / 2,
                    y1: di.values.y
                };
            }
            return line;
        });
        d.lines.shift();
    });

    //Highlight previously brushed points.
    if (this.parent.paneledOutlierExplorer.data.selectedIDs.length) {
        lines.filter(function (d) {
            return _this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1;
        }).classed('brushed', true).each(function () {
            d3.select(this.parentNode).moveToFront();
        });
    }

    //Apply brush.
    this.package.brush.on('brushstart', function () {}).on('brush', function () {
        chart.parent.wrap.selectAll('.wc-chart').each(function (d) {
            if (d.measure !== chart.currentMeasure) d.overlay.call(d.brush.clear());
        });
        chart.config.extent = chart.package.brush.extent();

        //brush marks
        brushMarks(chart, lines);
    }).on('brushend', function () {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);

    //Maintain brush on redraw.
    if (!this.config.extent) this.config.extent = this.package.brush.extent();
    if ((this.config.extent[0][0] !== this.package.brush.extent()[0][0] || this.config.extent[0][1] !== this.package.brush.extent()[0][1] || this.config.extent[1][0] !== this.package.brush.extent()[1][0] || this.config.extent[1][1] !== this.package.brush.extent()[1][1]) && this.currentMeasure === chart.parent.brushedMeasure) {
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks(chart, lines);
    }
}

function adjustTicks(axis, dx, dy, rotation, anchor, nchar) {
    if (!axis) return;
    var ticks = this.svg.selectAll('.' + axis + '.axis .tick text').attr({
        transform: 'rotate(' + rotation + ')',
        dx: dx,
        dy: dy
    }).style('text-anchor', anchor || 'start');

    if (nchar) {
        ticks.filter(function (d) {
            var dText = '' + d;
            return dText.length > nchar;
        }).text(function (d) {
            return d.slice(0, nchar - 3) + '...';
        }).style('cursor', 'help').append('title').text(function (d) {
            return d;
        });
    }
}

function onResize() {
    if (this.filtered_data.length == 0) {
        this.svg.selectAll('*').classed('hidden', true);
        this.svg.select('text.no-data').remove();
        this.svg.append('text').classed('no-data', true).attr({
            x: 0,
            dx: -this.config.margin.left,
            y: 0,
            dy: 10
        }).text('No data selected.');
    } else {
        this.svg.selectAll('*').classed('hidden', false);
        this.svg.select('text.no-data').remove();
        this.svg.select('.normal-range').remove();
        this.svg.insert('rect', '.line-supergroup').classed('normal-range', true).attr({
            x: this.x(this.x_dom[0]) - 5, // make sure left side of normal range does not appear in chart
            y: this.y(this.filtered_data[0][this.config.uln_col]),
            width: this.plot_width + 10, // make sure right side of normal range does not appear in chart
            height: this.y(this.filtered_data[0][this.config.lln_col]) - this.y(this.filtered_data[0][this.config.uln_col]),
            fill: 'green',
            'fill-opacity': 0.05,
            stroke: 'green',
            'stroke-opacity': 1,
            'clip-path': 'url(#' + this.id + ')'
        });

        //Capture each multiple's scale.
        this.package = {
            measure: this.currentMeasure,
            container: this.wrap,
            overlay: this.svg.append('g').classed('brush', true),
            value: this.currentMeasure,
            domain: clone(this.config.y.domain),
            xScale: clone(this.x),
            yScale: clone(this.y),
            brush: d3.svg.brush().x(this.x).y(this.y)
        };
        this.wrap.datum(this.package);

        //Define invisible brush overlay.
        this.package.overlay.append('rect').attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });

        //Attach additional data to SVG and marks.
        this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.currentMeasure });

        //Add brush functionality.
        brush.call(this);

        //Rotate x-axis tick labels.
        if (this.config.x.rotate_tick_labels) {
            adjustTicks.call(this, 'x', -10, 10, -45, 'end', 10);
        }
    }
}

function onDestroy() {}

var callbacks = {
    onInit: onInit,
    onLayout: onLayout,
    onPreprocess: onPreprocess,
    onDatatransform: onDatatransform,
    onDraw: onDraw,
    onResize: onResize,
    onDestroy: onDestroy
};

function charts() {
    this.charts = webcharts.createChart(this.containers.charts.node(), this.settings, this.controls);

    for (var callback in callbacks) {
        this.charts.on(callback.substring(2).toLowerCase(), callbacks[callback]);
    }this.charts.paneledOutlierExplorer = this;
}

function onInit$1() {
    this.config.cols = this.paneledOutlierExplorer.data.variables;
    this.config.headers = this.config.cols;
}

function onLayout$1() {}

function onPreprocess$1() {}

function onDatatransform$1() {}

function onDraw$1() {
    //Highlight selected rows.
    this.table.selectAll('tbody tr').classed('brushed', function (d) {
        return d ? d.brushed : false;
    });
}

function onResize$1() {}

function onDestroy$1() {}

var callbacks$1 = {
    onInit: onInit$1,
    onLayout: onLayout$1,
    onPreprocess: onPreprocess$1,
    onDatatransform: onDatatransform$1,
    onDraw: onDraw$1,
    onResize: onResize$1,
    onDestroy: onDestroy$1
};

function listing() {
    this.listing = webcharts.createTable(this.containers.listing.node(), this.settings.listing);

    for (var callback in callbacks$1) {
        this.listing.on(callback.substring(2).toLowerCase(), callbacks$1[callback]);
    }this.listing.paneledOutlierExplorer = this;
}

function recurse() {
    this.charts.listing = this.listing;
    this.listing.charts = this.charts;
}

function defineData(data) {
    var _this = this;

    //Capture variable names.
    this.data.variables = Object.keys(data[0]);

    //Define set of unique IDs.
    this.data.population = d3.set(data.map(function (d) {
        return d[_this.settings.id_col];
    })).values().sort();

    //Define set of unique measures.
    this.data.measures = d3.set(data.map(function (d) {
        return d.measure_unit;
    })).values().sort();

    //Filter data on observations with numeric results.
    this.data.raw = data.filter(function (d) {
        return (/^[0-9.]+$/.test(d[_this.settings.value_col])
        );
    });

    if (data.length !== this.data.raw.length) console.warn(data.length - this.data.raw.length + ' non-numeric observations have been removed from the data.');

    //Define additional variables.
    this.data.raw.forEach(function (d) {
        //Concatenate measure and unit.
        if (d[_this.settings.unit_col]) d.measure_unit = d[_this.settings.measure_col] + ' (' + d[_this.settings.unit_col] + ')';else d.measure_unit = d[_this.settings.measure_col];

        d.brushed = false;
    });

    //Define set of unique quantitative measures.
    this.data.quantitativeMeasures = d3.set(this.data.raw.map(function (d) {
        return d.measure_unit;
    })).values().sort();

    //Define set of unique qualitative measures.
    this.data.qualitativeMeasures = this.data.measures.filter(function (measure) {
        return _this.data.quantitativeMeasures.indexOf(measure) < 0;
    });

    //Define set of initially displayed measures.
    this.data.currentMeasures = this.settings.measures && this.settings.measures.length ? this.settings.measures : this.data.quantitativeMeasures;
    this.filters[this.settings.measure_col] = this.data.currentMeasures;

    //Filter data on the specified subset of measures.
    this.data.filtered = this.data.raw.filter(function (d) {
        return _this.data.currentMeasures.indexOf(d[_this.settings.measure_col]) > -1;
    });

    //Placeholder data arrays.
    this.data.brushed = [];
    this.data.selectedIDs = [];
}

function initializeDisplays() {
    //Initialize charts.
    webcharts.multiply(this.charts, this.data.raw, 'measure_unit');

    //Initialize listing.
    this.listing.init(this.data.raw);
}

function xAxisControlLabels() {
    var _this = this;

    this.controls.wrap.selectAll('.control-group').filter(function (control) {
        return control.label === 'X-axis';
    }).selectAll('option').property('label', function (d) {
        return _this.settings.synced.time_cols.filter(function (time_col) {
            return time_col.value_col === d;
        }).pop().label;
    });
}

function updateAllMeasuresCheckbox() {
    this.containers.allMeasuresToggle.attr('title', this.data.currentMeasures.length === this.data.quantitativeMeasures.length ? 'Remove all charts' : 'Display all charts').property('checked', this.data.currentMeasures.length === this.data.quantitativeMeasures.length);
}

function addMeasureList() {
    var context = this;

    //Append a list item for each measure.
    this.containers.measureList.selectAll('li.poe-measure-item').data(this.data.quantitativeMeasures.map(function (measure) {
        return {
            'measure': measure,
            'selector': measure.replace(/[^a-z0-9-]/gi, '-')
        };
    })).enter().append('li').classed('poe-measure-item', true).attr('id', function (d) {
        return 'poe-measure-item-' + d.selector;
    }).each(function (d) {
        //Append div inside list item.
        var measureItemContainer = d3.select(this).append('div').classed('poe-measure-item-container', true),
            checked = context.data.currentMeasures.indexOf(d.measure) > -1,
            measureItemCheckbox = measureItemContainer.append('input').classed('poe-measure-item-checkbox', true).attr({
            'id': 'poe-measure-item-checkbox-' + d.selector,
            'type': 'checkbox',
            'title': checked ? 'Remove chart' : 'Display chart'
        }).property('checked', checked),
            measureItemLabel = measureItemContainer.append('label').attr('for', 'poe-measure-item-checkbox-' + d.selector).text(d.measure);
    });
    this.containers.measureToggles = this.containers.measureList.selectAll('input');

    //Add event listeners to checkboxes.
    this.containers.measureToggles.on('change', function (d) {
        toggleMeasure.call(context, this, d);
    });
}

function addFilterEventListeners() {
    var context = this;

    this.controls.wrap.selectAll('.control-group').filter(function (control) {
        return control.type === 'subsetter';
    }).select('select').on('change', function (d) {
        context.filters[d.value_col] = d3.select(this).selectAll('option:checked').data();

        applyFilters.call(context);
    });
}

function init(data) {
    //Attach data arrays to central chart object.
    defineData.call(this, data);

    //Initialize displays.
    initializeDisplays.call(this);

    //Label x-axis options.
    xAxisControlLabels.call(this);

    //Update all measures checkbox.
    updateAllMeasuresCheckbox.call(this);

    //Add measure items to measure list.
    addMeasureList.call(this);

    //Add filter event listeners.
    addFilterEventListeners.call(this);
}

function paneledOutlierExplorer() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var paneledOutlierExplorer = {
        element: element,
        settings: {
            user: settings
        },
        containers: {},
        init: init,
        data: {},
        filters: {}
    };

    //Define layout.
    defineLayout.call(paneledOutlierExplorer);

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles.call(paneledOutlierExplorer);

    //Define settings.
    defineSettings.call(paneledOutlierExplorer);

    //Create controls.
    controls$1.call(paneledOutlierExplorer);

    //Create charts.
    charts.call(paneledOutlierExplorer);

    //Create listing.
    listing.call(paneledOutlierExplorer);

    //Point paneledOutlierExplorer, charts, and listing objects at each other.
    recurse.call(paneledOutlierExplorer);

    return paneledOutlierExplorer;
}

return paneledOutlierExplorer;

})));
