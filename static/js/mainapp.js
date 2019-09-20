var level = 2;

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
    var url = "/metadata/"+ sample ;
   // var level = 1;
    
    d3.json(url).then(function(data){
    //Append rows to the metadata table
    // Use `d3.json` to fetch the metadata for a sample
        var div = d3.select("#sample-metadata");
         
    // Use d3 to select the panel with id of `#sample-metadata`      
    // Use `.html("") to clear any existing metadata
        div.html("");
       window['level'] = data.WFREQ;
       console.log("fetch metadata WFREQ Level : " + level);
        
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
        var tr = div.append("tr");
        tr.append('tr').append('td').text("Age: " + data.AGE);
        tr.append('tr').append('td').text("BBTYPE: " + data.BBTYPE);
        tr.append('tr').append('td').text("ETHNICITY: ").append('td').text(data.ETHNICITY);
        tr.append('tr').append('td').text("GENDER: " + data.GENDER);
        tr.append('tr').append('td').text("LOCATION: " + data.LOCATION);
        tr.append('tr').append('td').text("WFREQ: " + data.WFREQ);
        tr.append('tr').append('td').text("sample: " + data.sample);
        });


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
//    var level = data.WFREQ;

        // Trig to calc meter point
        console.log("just before build Guage Level : " + level);
        var degrees = 10 - level,
             radius = .5;
        var radians = degrees * Math.PI / 10;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
             pathX = String(x),
             space = ' ',
             pathY = String(y),
             pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
           x: [0], y:[0],
            marker: {size: 14, color:'850000'},
            showlegend: false,
            name: 'Level',
            text: level,
            hoverinfo: 'text+name'},
          { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
          rotation: 90,
          text: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3',
                    '1-2', '0-1', ''],
          textinfo: 'text',
          textposition:'inside',
          marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(3, 142, 8, .5)',
                                 'rgba(35, 186, 16, .5)','rgba(64, 216, 45, .5)', 'rgba(154, 255, 127, .5)',
                                 'rgba(179, 229, 156, .5)', 'rgba(202, 209, 95, .5)',
                                 'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                                 'rgba(255, 255, 255, 0)']},
          labels: ['8-9', '7-8', '6-7','5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
          hoverinfo: 'label',
          hole: .5,
          type: 'pie',
          showlegend: false
        }];

        var layout = {
          shapes:[{
              type: 'path',
              path: path,
              fillcolor: '850000',
              line: {
                color: '850000'
              }
            }],
          title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
          height: 500,
          width: 500,
          xaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]},
          yaxis: {zeroline:false, showticklabels:false,
                     showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);

        }

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = "/samples/" + sample;
    
    d3.json(url).then(function (data) {
    var values = data.sample_values;
    var ids = data.otu_ids;
    var labels = data.otu_labels;
    var values_with_index = [];
    for (var i in values) {
        values_with_index.push([values[i], i]);
    }
    values_with_index.sort(function(left, right) {
    return (right[0] - left[0]);
    });
    var indexes = [];
    var otu_ids = [];
    var sample_values = [];
    var otu_labels = [];
    for (var j in values_with_index) {
        sample_values.push(values_with_index[j][0]);
        indexes.push(values_with_index[j][1]);
        otu_ids.push(ids[values_with_index[j][1]]);
        otu_labels.push(labels[values_with_index[j][1]]);
    }
    console.log("otu_ids = " + otu_ids);
    console.log("sample_values = " + sample_values);
    var otu_ids1 = otu_ids.slice(0,10);
    var sample_values1 = sample_values.slice(0,10);
    var otu_labels1 = otu_labels.slice(0,10);
        /*var otu_ids = data.otu_ids.slice(0,9);
        console.log("otu_ids = " + otu_ids);
        var sample_values = data.sample_values.slice(0,9);
        var otu_labels = data.otu_labels.slice(0,9); */
        var piedata = [{
                labels: otu_ids1,
                values: sample_values1,
                hovertext: otu_labels1,
                type: 'pie'
            }];
            
        
        var layout = {
                title: "Plot for Sample",
                height: 500,
                width: 500
            };
           
        Plotly.plot("pie", piedata, layout);
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
        
    //draw bubble chart
    var bubbledata = [{
                x: data.otu_ids,
                y: data.sample_values,
                text: data.otu_labels,
                mode: 'markers',
                marker: {
                    color: data.otu_ids,
                    size: data.sample_values
                }
            }];
            
        
        var layout1 = {
                title: "Sample BubbleChart",
                height: 600,
                width: 1350
            
            };
    Plotly.plot("bubble", bubbledata, layout1);
        
    });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
   console.log("inside init function");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  console.log("This is new sample");
}

// Initialize the dashboard
init();
  
