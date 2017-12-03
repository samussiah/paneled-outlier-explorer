import babel from "rollup-plugin-babel";

module.exports = {
    "name": "paneledOutlierExplorer",
    "input": "./src/index.js",
    "output": {
        "file": "./build/paneledOutlierExplorer.js",
        "format": "umd"
    },
    "globals": {
        "d3": "d3",
        "webcharts": "webCharts"
    },
    "external": (function() {
        var dependencies = require("./package.json").dependencies;

        return Object.keys(dependencies);
    }()),
    "plugins": [
        babel({
            "exclude": "node_modules/**",
            "presets": [
                ["env",
                {"modules": false}
                ]
            ],
            "plugins": [
                "external-helpers"
            ],
            "babelrc": false
        })
    ]
};
