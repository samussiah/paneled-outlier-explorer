# ![#FF9900](https://placehold.it/25x50/FF9900/000000?text=+) Paneled Outlier Explorer - Brushable Plots


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt tag](https://user-images.githubusercontent.com/31038805/30431689-649b02c6-992d-11e7-8497-b4091829652b.gif)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![#FF9900](https://placehold.it/15x300/FF9900/000000?text=+)

### The Paneled Outlier Explorer is a javascript library that provides paneled line charts of data points over time with point and line brushing. 


 
The paneled outlier explorer is closely related to the (non-paneled) [safety outlier explorer](https://github.com/RhoInc/safety-outlier-explorer) library, and can be used to monitor key safety signals in clinical trials in conjunction with other charts in the [safety explorer suite](https://github.com/RhoInc/safety-explorer-suite). 

The Paneled Outlier Explorer includes interactive features such as real-time brushing and requires minimal user configuration.
[Click here for a live demo](https://rhoinc.github.io/viz-library/examples/0019-paneled-outlier-explorer/example.html). When the page loads, the user sees multiple paneled charts providing a lab data summary for each measure over time.

&nbsp;
&nbsp;


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![#FF9900](https://placehold.it/15x375/FF9900/000000?text=+)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt tag](https://user-images.githubusercontent.com/31038805/30434209-a96d443e-9934-11e7-95a9-d2525491bad7.gif)


Generally speaking, minimal configuration is needed to create a Paneled Outlier Explorer. 

### Just [load a json data set](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Data-Guidelines) and the tool will automatically create a user interface (measures, etc.) based on the data set loaded. 

Initialize the chart like so: 
```javascript
paneledOutlierExplorer('body', {}).init(data)
```

See the [API](https://github.com/RhoInc/paneled-outlier-explorer/wiki/API) and [configuration](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Configuration) pages for more details about custom configurations. 

### See this example: [Paneled Outlier Explorer](https://rhoinc.github.io/viz-library/examples/0019-paneled-outlier-explorer/example.html)

For even more information see:

- [Technical Documentation](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Technical-Documentation) 
&nbsp;
- [Data Guidelines](https://github.com/RhoInc/paneled-outlier-explorer/wiki/Data-Guidelines). 
