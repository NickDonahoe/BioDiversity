function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metadataURL = "/metadata/"
  d3.json(metadataURL + sample).then(function(data) {
    console.log(data);

  // Use d3 to select the panel with id of `#sample-metadata`
  var sampleMetaData = d3.select("#sample-metadata").attr("class", "#metadata-table");

  // Use `.html("") to clear any existing metadata
  sampleMetaData.html("");
  var metadataTable = sampleMetaData.append("table").append("tbody");

  // Use `Object.entries` to add each key and value pair to the panel
  Object.entries(data).forEach(function(item){
      metadataTable.append("tr")
      .append("td")
      .text(`${item[0]}: ${item[1]}`)
      console.log(item[0])
      console.log(item[1])
      
  })

  });

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);

}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sampleURL = "/samples/"
  d3.json(sampleURL + sample).then(function(data) {
    console.log(data);
    console.log(data.values);

    var ids = data.otu_ids;
    var labels = data.otu_labels;
    var values = data.sample_values;

    console.log(ids.slice(0,10));
    console.log(values.slice(0,10));

    // @TODO: Build a Bubble Chart using the sample data    
    var trace1 = {
      x: ids,
      y: values,
      hovertext: labels,
      mode: 'markers'
    };
    
    var data1 = [trace1];
    
    var layout1 = {
      title: '',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data1, layout1);

    // @TODO: Build a Bubble Chart using the sample data 
    var trace2 = {
      values: values.slice(0,10),
      labels: ids.slice(0,10),
      hovertext: labels.slice(0,10),      
      type: 'pie'
    };

    var data2 = [trace2];
    
    var layout2 = {
      title: 'Percentage of Bacteria Type',
      showlegend: true,
      height: 600,
      width: 600
    };

    Plotly.newPlot('pie', data2, layout2);

  });

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  nameURL = "/names"
  d3.json(nameURL).then((sampleNames) => {
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
    console.log(firstSample)
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
