# Paneled Outlier Explorer - Brushable Plots

![alt tag](https://user-images.githubusercontent.com/31038805/30431689-649b02c6-992d-11e7-8497-b4091829652b.gif)

## Overview 

The Paneled Outlier Explorer is a javascript library that provides paneled line charts of data points over time with point and line brushing. It is designed for use in clinical trial research, but can also be applied in other areas. 

The paneled outlier explorer is closely related to the (non-paneled) [safety outlier explorer](https://github.com/RhoInc/safety-outlier-explorer) library, and can be used to monitor key safety signals in clinical trials in conjunction with other charts in the [safety explorer suite](https://github.com/RhoInc/safety-explorer-suite). 

The Paneled Outlier Explorer includes interactive features such as real-time brushing and requires minimal user configuration.
[Click here for a live demo](https://rhoinc.github.io/viz-library/examples/0019-paneled-outlier-explorer/example.html). When the page loads, the user sees multiple paneled charts providing a lab data summary for each measure over time.

[alt tag](https://user-images.githubusercontent.com/31038805/30434209-a96d443e-9934-11e7-95a9-d2525491bad7.gif)


## Usage

Generally speaking, minimal configuration is needed to create a Paneled Outlier Explorer. Just [load a json data set](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Data-Guidelines) and the tool will automatically create a user interface (measures, etc.) based on the data set loaded. 

Initialize the chart like so: 
```javascript
paneledOutlierExplorer('body', {}).init(data)
```

Our [API](https://github.com/RhoInc/paneled-outlier-explorer/wiki/API) also offers custom [configuraton](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Configuration) settings: 
| Param | Type | Description |
| --- | --- | --- |
| element | `string` | CSS selector identifying the element in which to create the chart |
| settings| `object` | settings object specifying chart appearance and behavior; options defined here overwrite defaults; see [Configuration](Configuration) |


### Links 

More information is available in the project's [wiki](https://github.com/RhoInc/paneled-outlier-explorer/wiki/): 

- [Interactive Example](https://rhoinc.github.io/viz-library/examples/0019-paneled-outlier-explorer/example.html)
- [Configuration](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Configuration) 
- [Technical Documentation](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Technical-Documentation) 
- [Data Guidelines](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Data-Guidelines). 
