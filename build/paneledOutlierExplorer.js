(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('d3'), require('webcharts')))
        : typeof define === 'function' && define.amd
          ? define(['d3', 'webcharts'], factory)
          : (global.paneledOutlierExplorer = factory(global.d3, global.webCharts));
})(this, function(d3, webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        (function() {
            Object.assign = function(target) {
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

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    function defineStyles() {
        var styles = [
                /***--------------------------------------------------------------------------------------\
      Controls
    \--------------------------------------------------------------------------------------***/

                '#paneled-outlier-explorer #controls-header {' +
                    '    margin: 0;' +
                    '    overflow: hidden;' +
                    '    background-color: #333;' +
                    '    width: 24%;' +
                    '    float: left;' +
                    '    font-size: 150%;' +
                    '    display: block;' +
                    '    color: white;' +
                    '    padding: 14px 16px;' +
                    '    box-sizing: border-box;' +
                    '}',
                '#paneled-outlier-explorer #left-side {' +
                    '    width: 24%;' +
                    '    float: left;' +
                    '}',
                '#paneled-outlier-explorer #left-side > * {' +
                    '    width: 100%;' +
                    '    display: inline-block;' +
                    '}',
                '#paneled-outlier-explorer #left-side .wc-controls {' +
                    '    padding: 10px 0;' +
                    '}',
                '#paneled-outlier-explorer #left-side .wc-controls .control-group {' +
                    '    float: left;' +
                    '    clear: left;' +
                    '    margin: 0 0 2px 0;' +
                    '}',
                '#paneled-outlier-explorer #left-side .wc-controls .control-group > * {' +
                    '    display: inline-block;' +
                    '    margin-left: 3px;' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container {' +
                    '   padding:0' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container #measure-list-header {' +
                    '    font-size: 150%;' +
                    '    border-top: 1px solid lightgray;' +
                    '    font-weight: lighter;' +
                    '    padding: 14px 0;' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container #measure-list-checkbox {' +
                    '    margin: 5px;' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container #measure-list {' +
                    '    list-style-type: none;' +
                    '    font-weight: lighter;' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container .measure-item {' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container .measure-item-container {' +
                    '}',
                '#paneled-outlier-explorer #left-side #measure-list-container .measure-checkbox {' +
                    '    margin: 5px;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Navigation
    \--------------------------------------------------------------------------------------***/

                '#paneled-outlier-explorer ul#navigation-bar {' +
                    '    list-style-type: none;' +
                    '    margin: 0;' +
                    '    padding: 0;' +
                    '    overflow: hidden;' +
                    '    background-color: #333;' +
                    '    width: 75%;' +
                    '    float: right;' +
                    '}',
                '#paneled-outlier-explorer ul#navigation-bar li.navigation {' +
                    '    float: left;' +
                    '    cursor: pointer;' +
                    '    font-size: 150%;' +
                    '    display: block;' +
                    '    color: white;' +
                    '    text-align: center;' +
                    '    padding: 14px 16px;' +
                    '    text-decoration: none;' +
                    '}',
                '#paneled-outlier-explorer ul#navigation-bar li.navigation.active {' +
                    '    background-color: #111;' +
                    '}',
                '#paneled-outlier-explorer ul#navigation-bar li.navigation:hover {' +
                    '    background-color: #111;' +
                    '}',
                '#paneled-outlier-explorer ul#navigation-bar li.navigation#Listing-nav.brushed {' +
                    '    color: orange;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Charts
    \--------------------------------------------------------------------------------------***/

                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts {' +
                    '    width: 75%;' +
                    '    float: right;' +
                    '    padding-top: 10px;' +
                    '}',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart {' +
                    '    padding: 0 1em 0 0;' +
                    '}',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart.expanded {' +
                    '    width: 100%;' +
                    ' }',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .wc-chart-title {' +
                    '    text-align: left;' +
                    '    font-size: .9em;' +
                    '}',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button {' +
                    '    float: right;' +
                    '    cursor: pointer;' +
                    '    border: 1px solid black;' +
                    '    border-radius: 3px;' +
                    '    padding: 0px 3px 1px 3px;' +
                    '    font-size: 75%;' +
                    '    margin-left: 5px;' +
                    '    visibility: hidden;' +
                    '}',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button:hover {' +
                    '    background: black;' +
                    '    color: white;' +
                    '}',
                '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart text.no-data {' +
                    '    fill: red;' +
                    '    font-size: 0.8em;' +
                    '}',

                /***--------------------------------------------------------------------------------------\
      Listing
    \--------------------------------------------------------------------------------------***/

                '#paneled-outlier-explorer div.wc-chart#Listing {' +
                    '    width: 75%;' +
                    '    float: right;' +
                    '    padding-top: 10px;' +
                    '    overflow-x: scroll;' +
                    '}',
                '#paneled-outlier-explorer div.wc-chart#Listing table {' + '}',

                /***--------------------------------------------------------------------------------------\
      General styles
    \--------------------------------------------------------------------------------------***/

                '#paneled-outlier-explorer .hidden {' + '    display: none !important;' + '}',
                '#paneled-outlier-explorer path.brushed {' +
                    '    stroke: orange;' +
                    '    stroke-width: 3px;' +
                    '    stroke-opacity: 1;' +
                    '}',
                '#paneled-outlier-explorer tr.brushed {' +
                    '    border: 2px solid orange !important;' +
                    '}'
            ],
            style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    var asyncGenerator = (function() {
        function AwaitValue(value) {
            this.value = value;
        }

        function AsyncGenerator(gen) {
            var front, back;

            function send(key, arg) {
                return new Promise(function(resolve, reject) {
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
                        Promise.resolve(value.value).then(
                            function(arg) {
                                resume('next', arg);
                            },
                            function(arg) {
                                resume('throw', arg);
                            }
                        );
                    } else {
                        settle(result.done ? 'return' : 'normal', result.value);
                    }
                } catch (err) {
                    settle('throw', err);
                }
            }

            function settle(type, value) {
                switch (type) {
                    case 'return':
                        front.resolve({
                            value: value,
                            done: true
                        });
                        break;

                    case 'throw':
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

            if (typeof gen.return !== 'function') {
                this.return = undefined;
            }
        }

        if (typeof Symbol === 'function' && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
                return this;
            };
        }

        AsyncGenerator.prototype.next = function(arg) {
            return this._invoke('next', arg);
        };

        AsyncGenerator.prototype.throw = function(arg) {
            return this._invoke('throw', arg);
        };

        AsyncGenerator.prototype.return = function(arg) {
            return this._invoke('return', arg);
        };

        return {
            wrap: function(fn) {
                return function() {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function(value) {
                return new AwaitValue(value);
            }
        };
    })();

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
            return obj;

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

    var rendererSettings = {
        measure_col: 'TEST',
        time_cols: [
            {
                value_col: 'VISIT',
                type: 'ordinal',
                order: null,
                order_col: 'VISITNUM',
                label: 'Visit',
                rotate_tick_labels: true,
                vertical_space: 75
            },
            {
                value_col: 'DY',
                type: 'linear',
                order: null,
                order_col: 'DY',
                label: 'Study Day',
                rotate_tick_labels: false,
                vertical_space: 0
            }
        ],
        value_col: 'STRESN',
        id_col: 'USUBJID',
        unit_col: 'STRESU',
        lln_col: 'STNRLO',
        uln_col: 'STNRHI',
        measures: null,
        filters: null,
        multiples_sizing: {
            width: 350,
            height: 175
        },
        inliers: false,
        normal_range_method: 'LLN-ULN',
        normal_range_sd: 1.96,
        normal_range_quantile_low: 0.05,
        normal_range_quantile_high: 0.95,
        visits_without_data: false,
        unscheduled_visits: false,
        unscheduled_visit_pattern: '/unscheduled|early termination/i',
        unscheduled_visit_values: null // takes precedence over unscheduled_visit_pattern   visits_without_data: false,
    };

    var webchartsSettings = {
        x: {
            type: null, // sync to [ time_cols[0].type ]
            column: null, // sync to [ time_cols[0].value_col ]
            label: '' // sync to [ time_cols[0].label ]
        },
        y: {
            type: 'linear',
            column: null, // sync to [ value_col ]
            label: ''
        },
        marks: [
            {
                type: 'line',
                per: null, // sync to [ id_col ] and [ measure_col ]
                attributes: {
                    'stroke-width': 1,
                    'stroke-opacity': 0.2,
                    stroke: 'black'
                }
            }
        ],
        resizable: false,
        scale_text: false,
        margin: {
            bottom: 0,
            left: 50
        },
        gridlines: 'xy'
    };

    var defaultSettings = Object.assign(rendererSettings, webchartsSettings);

    function syncSettings(settings) {
        var syncedSettings = clone(settings);
        syncedSettings.x.type = settings.time_cols[0].type;
        syncedSettings.x.order = settings.time_cols[0].order;
        syncedSettings.x.column = settings.time_cols[0].value_col;
        syncedSettings.x.rotate_tick_labels = settings.time_cols[0].rotate_tick_labels;
        syncedSettings.y.column = settings.value_col;
        syncedSettings.marks[0].per = [settings.id_col, settings.measure_col];
        syncedSettings.width = syncedSettings.multiples_sizing.width;
        syncedSettings.height = syncedSettings.multiples_sizing.height;

        //Convert unscheduled_visit_pattern from string to regular expression.
        if (
            typeof syncedSettings.unscheduled_visit_pattern === 'string' &&
            syncedSettings.unscheduled_visit_pattern !== ''
        ) {
            var flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
                pattern = settings.unscheduled_visit_pattern.replace(
                    new RegExp('^/(.*?)/' + flags + '$'),
                    '$1'
                );
            syncedSettings.unscheduled_visit_regex = new RegExp(pattern, flags);
        }

        return syncedSettings;
    }

    var controlInputs = [
        {
            type: 'dropdown',
            label: 'X-axis',
            option: 'x.column',
            require: true
        },
        {
            type: 'checkbox',
            label: 'Visits without data',
            option: 'visits_without_data'
        },
        {
            type: 'checkbox',
            label: 'Unscheduled visits',
            option: 'unscheduled_visits'
        },
        {
            type: 'checkbox',
            label: 'Normal range inliers',
            option: 'inliers'
        },
        {
            type: 'dropdown',
            label: 'Normal range method',
            option: 'normal_range_method',
            values: ['None', 'LLN-ULN', 'Standard Deviation', 'Quantiles'],
            require: true
        },
        {
            type: 'number',
            label: 'Number of standard deviations',
            option: 'normal_range_sd'
        },
        {
            type: 'number',
            label: 'Lower quantile',
            option: 'normal_range_quantile_low'
        },
        {
            type: 'number',
            label: 'Upper quantile',
            option: 'normal_range_quantile_high'
        }
    ];

    function syncControlInputs(controlInputs, settings) {
        var syncedControlInputs = clone(controlInputs);

        syncedControlInputs.filter(function(controlInput) {
            return controlInput.label === 'X-axis';
        })[0].values = settings.time_cols.map(function(d) {
            return d.value_col || d;
        });

        if (settings.filters)
            settings.filters.forEach(function(filter) {
                syncedControlInputs.push({
                    type: 'subsetter',
                    value_col: filter.value_col || filter,
                    label: filter.label || filter.value_col || filter,
                    description: 'filter',
                    multiple: false
                });
            });

        //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
        if (!(settings.unscheduled_visit_regex || settings.unscheduled_visit_values))
            controlInputs.splice(
                controlInputs
                    .map(function(controlInput) {
                        return controlInput.label;
                    })
                    .indexOf('Unscheduled visits'),
                1
            );

        return syncedControlInputs;
    }

    function removeVariables() {
        var _this = this;

        //Define set of required variables.
        this.config.variables = d3
            .set(
                d3.merge([
                    [this.config.measure_col],
                    [this.config.id_col],
                    this.config.time_cols.map(function(time_col) {
                        return time_col.value_col;
                    }),
                    this.config.time_cols.map(function(time_col) {
                        return time_col.order_col;
                    }),
                    [this.config.value_col],
                    [this.config.unit_col],
                    [this.config.lln_col],
                    [this.config.uln_col],
                    this.config.filters
                        ? this.config.filters.map(function(filter) {
                              return filter.value_col;
                          })
                        : []
                ])
            )
            .values()
            .filter(function(variable) {
                return Object.keys(_this.data.initial[0]).indexOf(variable) > -1;
            });

        //Delete extraneous variables.
        this.data.initial.forEach(function(d) {
            for (var variable in d) {
                if (_this.config.variables.indexOf(variable) < 0) delete d[variable];
            }
        });

        //If data do not have normal range variables update normal range method setting and options.
        if (
            this.config.variables.indexOf(this.config.lln_col) < 0 ||
            this.config.variables.indexOf(this.config.uln_col) < 0
        ) {
            if (this.config.normal_range_method === 'LLN-ULN')
                this.config.normal_range_method = 'Standard Deviation';
            this.controls.config.inputs
                .find(function(input) {
                    return input.option === 'normal_range_method';
                })
                .values.splice(1, 1);
        }
    }

    function deriveVariables() {
        var _this = this;

        var ordinalTimeSettings = this.config.time_cols.find(function(time_col) {
            return time_col.type === 'ordinal';
        });

        this.data.raw.forEach(function(d) {
            //brushed datum placeholder
            d.brushed = false;

            //Concatenate measure and unit.
            if (d[_this.config.unit_col])
                d.measure_unit =
                    d[_this.config.measure_col] + ' (' + d[_this.config.unit_col] + ')';
            else d.measure_unit = d[_this.config.measure_col];

            //Identify abnormal results.
            var lo =
                    d[_this.config.lln_col] !== undefined
                        ? +d[_this.config.value_col] < +d[_this.config.lln_col]
                        : false,
                hi =
                    d[_this.config.uln_col] !== undefined
                        ? +d[_this.config.value_col] > +d[_this.config.uln_col]
                        : false;
            d.abnormal = lo || hi;

            //Identify unscheduled visits.
            d.unscheduled = false;
            if (ordinalTimeSettings) {
                if (_this.config.unscheduled_visit_values)
                    d.unscheduled =
                        _this.config.unscheduled_visit_values.indexOf(
                            d[ordinalTimeSettings.value_col]
                        ) > -1;
                else if (_this.config.unscheduled_visit_regex)
                    d.unscheduled = _this.config.unscheduled_visit_regex.test(
                        d[ordinalTimeSettings.value_col]
                    );
            }
        });
    }

    function defineData(data) {
        var _this = this;

        this.data = {
            initial: data
        };

        //Remove extraneous variables.
        removeVariables.call(this);

        //Remove invalid data.
        this.data.raw = this.data.initial.filter(function(d) {
            return (
                !/^\s*$/.test(d[_this.config.measure_col]) &&
                /^[0-9.]+$/.test(d[_this.config.value_col])
            );
        });

        //Derive additional variables.
        deriveVariables.call(this);

        //Warn user of dropped records.
        if (this.data.raw.length !== this.data.initial.length)
            console.warn(
                this.data.initial.length -
                    this.data.raw.length +
                    ' non-numeric observations have been removed from the data.'
            );

        //Define placeholder data array.s
        this.data.filtered = this.data.raw;
        this.data.brushed = [];
        this.data.selectedIDs = [];
    }

    function captureMeasures() {
        var _this = this;

        this.config.allMeasures = d3
            .set(
                this.data.raw.map(function(d) {
                    return d.measure_unit;
                })
            )
            .values()
            .sort(function(a, b) {
                var leftSort = a < b,
                    rightSort = a > b;

                if (_this.config.measures && _this.config.measures.length) {
                    var aPos = _this.config.measures.indexOf(a),
                        bPos = _this.config.measures.indexOf(b),
                        diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

                    return diff
                        ? diff
                        : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
                } else return leftSort ? -1 : rightSort ? 1 : 0;
            });
        this.config.measures =
            this.config.measures && this.config.measures.length
                ? this.config.measures
                : this.config.allMeasures;
    }

    function defineVisitOrder() {
        var _this = this;

        this.config.time_cols.forEach(function(time_settings) {
            if (time_settings.type === 'ordinal') {
                var visits = void 0,
                    visitOrder = void 0;

                //Given an ordering variable sort a unique set of visits by the ordering variable.
                if (
                    time_settings.order_col &&
                    _this.data.raw[0].hasOwnProperty(time_settings.order_col)
                ) {
                    //Define a unique set of visits with visit order concatenated.
                    visits = d3
                        .set(
                            _this.data.raw.map(function(d) {
                                return (
                                    d[time_settings.order_col] + '|' + d[time_settings.value_col]
                                );
                            })
                        )
                        .values();

                    //Sort visits.
                    visitOrder = visits
                        .sort(function(a, b) {
                            var aOrder = a.split('|')[0],
                                bOrder = b.split('|')[0],
                                diff = +aOrder - +bOrder;
                            return diff ? diff : d3.ascending(a, b);
                        })
                        .map(function(visit) {
                            return visit.split('|')[1];
                        });
                } else {
                    //Otherwise sort a unique set of visits alphanumerically.
                    //Define a unique set of visits.
                    visits = d3
                        .set(
                            _this.data.raw.map(function(d) {
                                return d[time_settings.value_col];
                            })
                        )
                        .values();

                    //Sort visits;
                    visitOrder = visits.sort();
                }

                //Set x-axis domain.
                if (time_settings.order) {
                    //If a visit order is specified, use it and concatenate any unspecified visits at the end.
                    time_settings.order = time_settings.order.concat(
                        visitOrder.filter(function(visit) {
                            return time_settings.order.indexOf(visit) < 0;
                        })
                    );
                } else
                    //Otherwise use data-driven visit order.
                    time_settings.order = visitOrder;

                //Define domain.
                time_settings.domain = time_settings.order;
            } else if (time_settings.type === 'linear') {
                time_settings.order = null;
                time_settings.domain = d3.extent(_this.data.raw, function(d) {
                    return +d[time_settings.value_col];
                });
            }
        });
    }

    function toggleCharts(chart) {
        var toggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var measureListCheckbox = d3.select('#measure-list-checkbox'),
            checked = measureListCheckbox.property('checked'),
            measureItems = d3.selectAll('li.measure-item'),
            anyUnchecked = measureItems[0].some(function(measureItem) {
                return !measureItem.getElementsByTagName('input')[0].checked;
            });

        //Handle overall toggle.
        if (toggle) {
            measureListCheckbox.attr('title', checked ? 'Remove all charts' : 'Display all charts');
            measureItems.each(function(d) {
                d3
                    .select(this)
                    .select('input')
                    .property('checked', checked);
                toggleChart(chart, this, d);
            });
            measureListCheckbox.property('checked', checked);
        } else {
            //Handle individual toggles.
            measureListCheckbox.attr(
                'title',
                anyUnchecked ? 'Display all charts' : 'Remove all charts'
            );
            measureListCheckbox.property('checked', !anyUnchecked);
        }
    }

    function toggleChart(chart, li) {
        //Determine state of checkbox.
        var checkbox = d3.select(li).select('input'),
            checked = checkbox.property('checked');
        checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');
        d3
            .select(chart.div)
            .selectAll('.wc-chart')
            .filter(function(di) {
                return di.measure === d3.select(li).datum();
            })
            .classed('hidden', !checked);

        //If any checkbox is unchecked, uncheck measureListCheckbox.
        toggleCharts(chart, false);
    }

    function layout() {
        this.wrap.attr('id', 'Charts');
        this.listing.wrap.attr('id', 'Listing').classed('hidden', true);

        var chart = this,
            //Create navigation bar.
            navigationBar = this.container
                .insert('ul', ':first-child')
                .attr('id', 'navigation-bar'),
            navigationButtons = navigationBar
                .selectAll('li.navigation')
                .data(['Charts', 'Listing'])
                .enter()
                .append('li')
                .classed('navigation', true)
                .classed('active', function(d) {
                    return d === 'Charts';
                })
                .attr('id', function(d) {
                    return d + '-nav';
                })
                .text(function(d) {
                    return d;
                })
                .on('click', function(d) {
                    navigationButtons
                        .filter(function(di) {
                            return di === d;
                        })
                        .classed('active', true);
                    navigationButtons
                        .filter(function(di) {
                            return di !== d;
                        })
                        .classed('active', false);
                    if (d === 'Charts') {
                        d3.select('#Listing').classed('hidden', true);
                        d3.select('#Charts').classed('hidden', false);
                    } else {
                        d3.select('#Charts').classed('hidden', true);
                        d3.select('#Listing').classed('hidden', false);
                    }
                }),
            //Create controls header.
            controlsTab = this.container
                .insert('div', ':first-child')
                .attr('id', 'controls-header')
                .text('Controls'),
            //Define all-chart toggle.
            measureListContainer = this.container
                .select('#left-side')
                .append('ul')
                .attr('id', 'measure-list-container'),
            measureListHeader = measureListContainer
                .append('div')
                .attr('id', 'measure-list-header'),
            measureListCheckbox = measureListHeader
                .append('input')
                .attr({
                    id: 'measure-list-checkbox',
                    type: 'checkbox',
                    title:
                        this.config.measures.length === this.config.allMeasures.length
                            ? 'Remove all charts'
                            : 'Display all charts'
                })
                .property('checked', this.config.measures.length === this.config.allMeasures.length)
                .on('click', function() {
                    toggleCharts(chart, this);
                });

        measureListHeader.append('span').text('Measures');
        var measureList = measureListContainer //Define individual chart toggles.
            .append('ul')
            .attr('id', 'measure-list');
        var measureItems = measureList
            .selectAll('li.measure-item')
            .data(this.config.allMeasures)
            .enter()
            .append('li')
            .attr('class', function(d) {
                return 'measure-item ' + d.replace(/[^a-z0-9-]/gi, '-');
            })
            .each(function(d) {
                //Append div inside list item.
                var measureItemContainer = d3
                    .select(this)
                    .append('div')
                    .classed('measure-item-container', true);
                //Check whether measure should by displayed initially.
                var checked = chart.config.measures.indexOf(d) > -1; //Append checkbox inside div.
                var measureItemCheckbox = measureItemContainer
                    .append('input')
                    .classed('measure-checkbox', true)
                    .attr({
                        type: 'checkbox',
                        title: checked ? 'Remove chart' : 'Display chart'
                    })
                    .property('checked', checked);
                var measureItemLabel = measureItemContainer.append('span').text(function(d) {
                    return d;
                });
            })
            .on('change', function(d) {
                toggleChart(chart, this);
            });
    }

    function applyFilters(d) {
        var _this = this;

        this.data.brushed = [];
        this.data.selectedIDs = [];

        //Reset brush.
        this.multiples.forEach(function(multiple) {
            multiple.package.overlay.call(multiple.package.brush.clear());
            multiple.config.extent = multiple.package.brush.extent();
        });

        //De-highlight brushed lines.
        this.wrap.selectAll('.line-supergroup g.line path').classed('brushed', false);

        //De-highlight listing.
        d3.select('#Listing-nav').classed('brushed', false);

        //Define filtered data.
        if (d.type === 'subsetter') {
            this.data.filtered = this.data.raw.filter(function(d) {
                var filtered = false;

                _this.controls.config.inputs
                    .filter(function(d) {
                        return d.type === 'subsetter';
                    })
                    .forEach(function(filter) {
                        if (!filtered && filter.value && filter.value !== 'All')
                            filtered = d[filter.value_col] !== filter.value;
                    });

                return !filtered;
            });
        }

        //Redraw listing.
        this.listing.draw(this.data.filtered);
    }

    function customizeControls() {
        var _this = this;

        var context = this,
            controls = this.controls.wrap
                .selectAll('.control-group')
                .classed('hidden', function(d) {
                    return (
                        (_this.config.normal_range_method !== 'Standard Deviation' &&
                            /standard deviation/i.test(d.label)) ||
                        (_this.config.normal_range_method !== 'Quantiles' &&
                            /quantile/i.test(d.label))
                    );
                });

        //Define x-axis option labels.
        controls
            .filter(function(control) {
                return control.label === 'X-axis';
            })
            .selectAll('option')
            .property('label', function(d) {
                return _this.config.time_cols
                    .filter(function(time_col) {
                        return time_col.value_col === d;
                    })
                    .pop().label;
            });

        //Define x-axis option labels.
        controls
            .filter(function(control) {
                return control.label === 'X-axis';
            })
            .selectAll('option')
            .property('label', function(d) {
                return _this.config.time_cols
                    .filter(function(time_col) {
                        return time_col.value_col === d;
                    })
                    .pop().label;
            });

        //Add custom x-domain and filter functionality.
        controls
            .filter(function(d) {
                return d.type === 'subsetter' || d.label === 'X-axis';
            })
            .on('change', function(d) {
                d.value = d3
                    .select(this)
                    .selectAll('option')
                    .filter(function() {
                        return this.selected;
                    })
                    .text();
                applyFilters.call(context, d);
            });

        //Add custom normal range functionality.
        var normalRangeControl = controls.filter(function(d) {
            return d.label === 'Normal range method';
        });
        normalRangeControl.on('change', function(d) {
            var normal_range_method = d3
                .select(this)
                .select('option:checked')
                .text();

            controls.classed('hidden', function(d) {
                return (
                    (normal_range_method !== 'Standard Deviation' &&
                        /standard deviation/i.test(d.label)) ||
                    (normal_range_method !== 'Quantiles' && /quantile/i.test(d.label))
                );
            });
        });
    }

    function init(data) {
        defineData.call(this, data);

        //Capture unique set of measures in data.
        captureMeasures.call(this);

        //Capture ordered set of visits.
        defineVisitOrder.call(this);

        //Define layout of renderer.
        layout.call(this);

        //Initialize charts.
        webcharts.multiply(this, this.data.raw, 'measure_unit', this.config.allMeasures);

        //Initialize listing.
        this.listing.config.cols = Object.keys(data[0]).filter(function(key) {
            return ['brushed', 'measure_unit', 'abnormal', 'abnormalID'].indexOf(key) === -1;
        }); // remove system variables from listing
        this.listing.init(this.data.raw);

        //Define custom event listener for filters.
        customizeControls.call(this);
    }

    function setCurrentMeasure() {
        this.currentMeasure = this.filters[0].val;
    }

    function defineMeasureData() {
        var _this = this;

        this.measure_data = this.raw_data.filter(function(d) {
            return d.measure_unit === _this.currentMeasure;
        });
        this.results = this.measure_data
            .map(function(d) {
                return +d[_this.config.value_col];
            })
            .sort(function(a, b) {
                return a - b;
            });
    }

    function onInit() {
        setCurrentMeasure.call(this);
        defineMeasureData.call(this);
    }

    function minimize(chart) {
        //Modify chart config and redraw.
        chart.wrap
            .select('.m__imize-chart')
            .html('&plus;')
            .attr('title', 'Maximize chart');
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
            chart.wrap
                .select('.m__imize-chart')
                .html('&minus;')
                .attr('title', 'Minimize chart');
            chart.wrap.classed('expanded', true);

            chart.config.width = null;
            chart.config.max_width = 9999;
            chart.config.height = null;
            chart.config.aspect = 2.5;

            chart.draw();

            //Sort expanded chart first.
            chart.parent.wrap.selectAll('.wc-chart').sort(function(a, b) {
                return a.measure === chart.currentMeasure
                    ? -1
                    : b.measure === chart.currentMeasure
                      ? 1
                      : chart.config.measures.indexOf(a.measure) -
                        chart.config.measures.indexOf(b.measure);
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
            chart.parent.wrap.selectAll('.wc-chart').sort(function(a, b) {
                return (
                    chart.config.measures.indexOf(a.measure) -
                    chart.config.measures.indexOf(b.measure)
                );
            });
        }
    }

    function onLayout() {
        var _this = this;

        this.wrap
            .on('mouseover', function() {
                _this.wrap.selectAll('.wc-chart-title span').style('visibility', 'visible');
            })
            .on('mouseout', function() {
                _this.wrap.selectAll('.wc-chart-title span').style('visibility', 'hidden');
            })
            .select('.wc-chart-title')
            .append('span')
            .classed('remove-chart chart-button', true)
            .html('&#10006;')
            .attr('title', 'Remove chart')
            .style('visibility', 'hidden')
            .on('click', function() {
                //Minimize chart.
                if (_this.wrap.classed('full-screen')) m__imize(_this);

                var li = d3.select(
                    'li.measure-item.' + _this.currentMeasure.replace(/[^a-z0-9-]/gi, '-')
                );
                li.select('input').property('checked', false);
                toggleChart(_this, li.node());
            });

        //Add ability to maximize charts in the chart title.
        var m__imizeButton = this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('m__imize-chart chart-button', true)
            .html('&plus;')
            .attr('title', 'Maximize chart');
        m__imizeButton.on('click', function() {
            m__imize(_this);
        });

        //Hide measures not listed in [ settings.measures ].
        this.wrap
            .classed(this.currentMeasure.replace(/[^a-z0-9-]/gi, '-'), true)
            .classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
    }

    function removeVisitsWithoutData() {
        var _this = this;

        if (!this.config.visits_without_data) {
            this.config.x.domain = this.config.x.domain.filter(function(visit) {
                return (
                    d3
                        .set(
                            _this.measure_data.map(function(d) {
                                return d[_this.config.x.column];
                            })
                        )
                        .values()
                        .indexOf(visit) > -1
                );
            });
        }
    }

    function removeUnscheduledVisits() {
        var _this = this;

        if (!this.config.unscheduled_visits) {
            if (this.config.unscheduled_visit_values)
                this.config.x.domain = this.config.x.domain.filter(function(visit) {
                    return _this.config.unscheduled_visit_values.indexOf(visit) < 0;
                });
            else if (this.config.unscheduled_visit_regex)
                this.config.x.domain = this.config.x.domain.filter(function(visit) {
                    return !_this.config.unscheduled_visit_regex.test(visit);
                });
        }
    }

    function setXoptions() {
        var _this = this;

        //Update x-object.
        Object.assign(
            this.config.x,
            this.config.time_cols.find(function(time_col) {
                return time_col.value_col === _this.config.x.column;
            })
        );

        //Remove visits without data from x-domain if x-type is ordinal.
        if (this.config.x.type === 'ordinal') {
            this.config.x.domain = this.config.x.order;
            removeVisitsWithoutData.call(this);
            removeUnscheduledVisits.call(this);
        }

        //Delete domain setting if x-type is linear
        if (this.config.x.type !== 'ordinal') delete this.config.x.domain;

        //Update bottom margin.
        this.config.margin.bottom = this.config.x.vertical_space;
    }

    function setYoptions() {
        var _this = this;

        this.config.y.domain = d3.extent(this.measure_data, function(d) {
            return +d[_this.config.value_col];
        });
        var range = this.config.y.domain[1] - this.config.y.domain[0];
        this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';
    }

    function deriveStatistics() {
        var _this = this;

        if (this.config.normal_range_method === 'LLN-ULN') {
            this.lln = function(d) {
                return d instanceof Object
                    ? +d[_this.config.lln_col]
                    : d3.median(_this.measure_data, function(d) {
                          return +d[_this.config.lln_col];
                      });
            };
            this.uln = function(d) {
                return d instanceof Object
                    ? +d[_this.config.uln_col]
                    : d3.median(_this.measure_data, function(d) {
                          return +d[_this.config.uln_col];
                      });
            };
        } else if (this.config.normal_range_method === 'Standard Deviation') {
            this.mean = d3.mean(this.results);
            this.sd = d3.deviation(this.results);
            this.lln = function() {
                return _this.mean - _this.config.normal_range_sd * _this.sd;
            };
            this.uln = function() {
                return _this.mean + _this.config.normal_range_sd * _this.sd;
            };
        } else if (this.config.normal_range_method === 'Quantiles') {
            this.lln = function() {
                return d3.quantile(_this.results, _this.config.normal_range_quantile_low);
            };
            this.uln = function() {
                return d3.quantile(_this.results, _this.config.normal_range_quantile_high);
            };
        } else {
            this.lln = function(d) {
                return d instanceof Object ? d[_this.config.value_col] + 1 : _this.results[0];
            };
            this.uln = function(d) {
                return d instanceof Object
                    ? d[_this.config.value_col] - 1
                    : _this.results[_this.results.length - 1];
            };
        }
    }

    function deriveVariables$1() {
        var _this = this;

        this.measure_data.forEach(function(d) {
            d.abnormal =
                d[_this.config.value_col] < _this.lln(d) ||
                d[_this.config.value_col] > _this.uln(d);
        });
    }

    function identifyNormalParticipants() {
        var _this = this;

        this.abnormalIDs = d3
            .set(
                this.measure_data
                    .filter(function(d) {
                        return d.abnormal;
                    })
                    .map(function(d) {
                        return d[_this.config.id_col];
                    })
            )
            .values();
        this.measure_data.forEach(function(d) {
            d.abnormalID = _this.abnormalIDs.indexOf(d[_this.config.id_col]) > -1;
        });
    }

    function filterData() {
        this.raw_data = this.measure_data;
        if (!this.config.inliers)
            this.raw_data = this.raw_data.filter(function(d) {
                return d.abnormalID;
            });
        if (!this.config.unscheduled_visits)
            this.raw_data = this.raw_data.filter(function(d) {
                return !d.unscheduled;
            });
    }

    function hideNormalRangeControls() {
        //console.log(
        //d3.select(this.parent.div)
        //    .selectAll('.control-group')
        //    .filter(d => ['normal_range_sd', 'normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1)
        //    .classed('hidden', d =>
        //        (d.option === 'normal_range_sd' && this.config.normal_range_method !== 'Standard Deviations') ||
        //        (['normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1 &&  this.config.normal_range_method !== 'Quantiles')
        //    ));
    }

    function onPreprocess() {
        setXoptions.call(this);
        setYoptions.call(this);
        deriveStatistics.call(this);
        deriveVariables$1.call(this);
        identifyNormalParticipants.call(this);
        filterData.call(this);
        hideNormalRangeControls.call(this);
    }

    function onDatatransform() {}

    function onDraw() {
        if (this.package) this.package.overlay.call(this.package.brush.clear());
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function() {
            this.parentNode.appendChild(this);
        });
    };

    function drawNormalRange() {
        this.svg.select('.normal-range').remove();
        this.svg
            .insert('rect', '.line-supergroup')
            .classed('normal-range', true)
            .attr({
                x: this.x(this.x_dom[0]) - 5, // make sure left side of normal range does not appear in chart
                y: this.y(this.uln()),
                width: this.plot_width + 10, // make sure right side of normal range does not appear in chart
                height: this.y(this.lln()) - this.y(this.uln()),
                fill: 'green',
                'fill-opacity': 0.05,
                stroke: 'green',
                'stroke-opacity': 1,
                'clip-path': 'url(#' + this.id + ')'
            });
    }

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
            if (
                equalPoints(p, q) ||
                equalPoints(p, q2) ||
                equalPoints(p2, q) ||
                equalPoints(p2, q2)
            ) {
                return true;
            }
            // Do they overlap? (Are all the point differences in either direction the same sign)
            return (
                !allEqual(q.x - p.x < 0, q.x - p2.x < 0, q2.x - p.x < 0, q2.x - p2.x < 0) ||
                !allEqual(q.y - p.y < 0, q.y - p2.y < 0, q2.y - p.y < 0, q2.y - p2.y < 0)
            );
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
        var brushedLines = lines.filter(function(d, i) {
            var intersection = false;
            d.lines.forEach(function(line, j) {
                sides.forEach(function(side, k) {
                    if (!intersection)
                        intersection = doLineSegmentsIntersect(
                            { x: line.x0, y: line.y0 },
                            { x: line.x1, y: line.y1 },
                            { x: side.x0, y: side.y0 },
                            { x: side.x1, y: side.y1 }
                        );
                });
            });

            return intersection;
        });

        //Attached brushed IDs to chart parent object.
        chart.parent.data.selectedIDs = brushedLines.data().map(function(d) {
            return d.id;
        });

        //Highlight brushed lines.
        chart.parent.wrap
            .selectAll('.line-supergroup g.line path')
            .classed('brushed', false)
            .filter(function(d) {
                return chart.parent.data.selectedIDs.indexOf(d.id) > -1;
            })
            .classed('brushed', true)
            .each(function(d) {
                d3.select(this.parentNode).moveToFront();
            });

        //Draw listing displaying brushed IDs first.
        if (chart.parent.data.selectedIDs.length) {
            chart.parent.data.filtered.forEach(function(d) {
                d.brushed = chart.parent.data.selectedIDs.indexOf(d[chart.config.id_col]) > -1;
            });
            chart.parent.data.brushed = chart.parent.data.filtered.filter(function(d) {
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
        lines.each(function(d, i) {
            d.id = d.values[0].values.raw[0][chart.config.id_col];
            d.lln = d.values[0].values.raw[0][chart.config.lln_col];
            d.uln = d.values[0].values.raw[0][chart.config.uln_col];
            d.lines = d.values.map(function(di, i) {
                var line;
                if (i) {
                    line = {
                        x0:
                            chart.config.x.type === 'linear'
                                ? d.values[i - 1].values.x
                                : chart.x(d.values[i - 1].values.x) + chart.x.rangeBand() / 2,
                        y0: d.values[i - 1].values.y,
                        x1:
                            chart.config.x.type === 'linear'
                                ? di.values.x
                                : chart.x(di.values.x) + chart.x.rangeBand() / 2,
                        y1: di.values.y
                    };
                }
                return line;
            });
            d.lines.shift();
        });

        //Highlight previously brushed points.
        if (this.parent.data.selectedIDs.length) {
            lines
                .filter(function(d) {
                    return _this.parent.data.selectedIDs.indexOf(d.id) > -1;
                })
                .classed('brushed', true)
                .each(function() {
                    d3.select(this.parentNode).moveToFront();
                });
        }

        //Apply brush.
        this.package.brush
            .on('brushstart', function() {})
            .on('brush', function() {
                chart.parent.wrap.selectAll('.wc-chart').each(function(d) {
                    if (d.measure !== chart.currentMeasure) d.overlay.call(d.brush.clear());
                });
                chart.config.extent = chart.package.brush.extent();

                //brush marks
                brushMarks(chart, lines);
            })
            .on('brushend', function() {});

        //Initialize brush on brush overlay.
        this.package.overlay.call(this.package.brush);

        //Maintain brush on redraw.
        if (!this.config.extent) this.config.extent = this.package.brush.extent();
        if (
            (this.config.extent[0][0] !== this.package.brush.extent()[0][0] ||
                this.config.extent[0][1] !== this.package.brush.extent()[0][1] ||
                this.config.extent[1][0] !== this.package.brush.extent()[1][0] ||
                this.config.extent[1][1] !== this.package.brush.extent()[1][1]) &&
            this.currentMeasure === chart.parent.brushedMeasure
        ) {
            this.package.brush.extent(this.config.extent);
            this.package.overlay.call(this.package.brush);
            brushMarks(chart, lines);
        }
    }

    function adjustTicks(axis, dx, dy, rotation, anchor, nchar) {
        if (!axis) return;
        var ticks = this.svg
            .selectAll('.' + axis + '.axis .tick text')
            .attr({
                transform: 'rotate(' + rotation + ')',
                dx: dx,
                dy: dy
            })
            .style('text-anchor', anchor || 'start');

        if (nchar) {
            ticks
                .filter(function(d) {
                    var dText = '' + d;
                    return dText.length > nchar;
                })
                .text(function(d) {
                    return d.slice(0, nchar - 3) + '...';
                })
                .style('cursor', 'help')
                .append('title')
                .text(function(d) {
                    return d;
                });
        }
    }

    function onResize() {
        if (this.filtered_data.length == 0) {
            this.svg.selectAll('*').classed('hidden', true);
            this.svg.select('text.no-data').remove();
            this.svg
                .append('text')
                .classed('no-data', true)
                .attr({
                    x: 0,
                    dx: -this.config.margin.left,
                    y: 0,
                    dy: 10
                })
                .text('No data selected.');
        } else {
            this.svg.selectAll('*').classed('hidden', false);
            this.svg.select('text.no-data').remove();

            //Draw normal range.
            drawNormalRange.call(this);

            //Capture each multiple's scale.
            this.package = {
                measure: this.currentMeasure,
                container: this.wrap,
                overlay: this.svg.append('g').classed('brush', true),
                value: this.currentMeasure,
                domain: clone(this.config.y.domain),
                xScale: clone(this.x),
                yScale: clone(this.y),
                brush: d3.svg
                    .brush()
                    .x(this.x)
                    .y(this.y)
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
            this.package.overlay
                .style('cursor', 'crosshair')
                .datum({ measure: this.currentMeasure });

            //Add brush functionality.
            brush.call(this);

            //Rotate x-axis tick labels.
            if (this.config.x.rotate_tick_labels) {
                adjustTicks.call(this, 'x', -10, 10, -45, 'end', 10);
            }
        }
    }

    function onDestroy() {}

    var chartCallbacks = {
        onInit: onInit,
        onLayout: onLayout,
        onPreprocess: onPreprocess,
        onDatatransform: onDatatransform,
        onDraw: onDraw,
        onResize: onResize,
        onDestroy: onDestroy
    };

    function onInit$1() {}

    function onLayout$1() {}

    function onPreprocess$1() {}

    function onDatatransform$1() {}

    function onDraw$1() {
        //Highlight selected rows.
        this.table.selectAll('tbody tr').classed('brushed', function(d) {
            return d ? d.brushed : false;
        });
    }

    function onResize$1() {}

    function onDestroy$1() {}

    var listingCallbacks = {
        onInit: onInit$1,
        onLayout: onLayout$1,
        onPreprocess: onPreprocess$1,
        onDatatransform: onDatatransform$1,
        onDraw: onDraw$1,
        onResize: onResize$1,
        onDestroy: onDestroy$1
    };

    //Utility polyfills
    function paneledOutlierExplorer() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';
        var settings = arguments[1];

        //Define unique div within passed element argument.
        var container = d3
                .select(element)
                .append('div')
                .attr('id', 'paneled-outlier-explorer'),
            containerElement = container.node(),
            controlsContainer = container.append('div').attr('id', 'left-side'),
            controlsContainerElement = controlsContainer.node();

        //Define .css styles to avoid requiring a separate .css file.
        defineStyles();

        //Clone, merge, and sync settings and define chart.
        var initialSettings = clone(settings),
            mergedSettings = Object.assign({}, defaultSettings, initialSettings),
            syncedSettings = syncSettings(mergedSettings),
            syncedControlInputs = syncControlInputs(controlInputs, syncedSettings),
            controls = webcharts.createControls(controlsContainerElement, {
                location: 'top',
                inputs: syncedControlInputs
            }),
            chart = webcharts.createChart(containerElement, syncedSettings, controls),
            listing = webcharts.createTable(containerElement, {}, controls);

        //Attach stuff to chart.
        chart.container = container;
        chart.listing = listing;
        chart.config.initialSettings = clone(syncedSettings);

        //Attach stuff to listing.
        listing.container = container;
        listing.chart = chart;

        //Define chart callbacks.
        for (var callback in chartCallbacks) {
            chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);
        } //Define listing callbacks.
        for (var _callback in listingCallbacks) {
            listing.on(_callback.substring(2).toLowerCase(), listingCallbacks[_callback]);
        } //Redefine chart.init() in order to call webCharts.multiply() on paneledOutlierExplorer().init().
        Object.defineProperty(chart, 'init', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: init
        });

        return chart;
    }

    return paneledOutlierExplorer;
});
