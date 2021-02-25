function buildMetadata(sample) {
  d3.json("../../data/samples.json").then((data) => {
    let metadata = data.metadata;
    //Filter dataset to show single subject
    var subjectArray = metadata.filter(item => item.id == sample);
    //retrieve result from array
    var subjectData = subjectArray[0];
    
    let Panel = d3.select("#sample-metadata");
    // clear existing MetaData
    Panel.html("");

    //From the Subject Data, loop through each key and value and append it to the panel.
    Object.entries(subjectData).forEach(([key, value]) => {
      Panel.append("h5").text(`${key}: ${value}`);
    });

  });
}
    //Build Visualizaitons
function buildVisuals(sample) {
  d3.json("../../data/samples.json").then((data) => {
    var samples = data.samples;
    var SubjectArray = samples.filter(item => item.id == sample);
    var SubjectData = SubjectArray[0];

    var otu_ids = SubjectData.otu_ids;
    var otu_labels = SubjectData.otu_labels;
    var sample_values = SubjectData.sample_values;

//-------------------------------------------------------------------------------
    // Build a Bubble Chart 
    var trace = 
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Picnic"
        }
      };

      let data1 = [trace]

    var layout = {
      title: "Belly Button Bacteria Bubble Chart",
      xaxis: { title: "Otu Id" },
    };

    Plotly.newPlot("bubble", data1, layout);
//--------------------------------------------------------------------------------
    //Build Horizontal Bar Chart with top 10 Values
    var yticks = otu_ids.slice(0, 10).map(otuID => `ID ${otuID}`).reverse();
    var trace2 = 
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };

    var layout2 = {
      title: "Top 10 OTU Bacterias Found",
      margin: { t: 30, l: 150 },
    };

    let data2 = [trace2]

    Plotly.newPlot("bar", data2, layout2);
  });
}
//---------------------------------------------------------------------------------
function BuildDropdown() {
  var selector = d3.select("#selDataset");

  d3.json("../../data/samples.json").then((data) => {
    var Names = data.names;

    Names.forEach((data) => {
      selector
        .append("option")
        .text(data)
        .property("value", data);
    });

    // Use the first sample from the list to build the initial plots
    var firstID = Names[0];
    buildVisuals(firstID);
    buildMetadata(firstID);
  });
}

function optionChanged(newID) {
  // Fetch new data each time a new sample is selected
  buildVisuals(newID);
  buildMetadata(newID);
}

//Build Dropdown menu
BuildDropdown();


  