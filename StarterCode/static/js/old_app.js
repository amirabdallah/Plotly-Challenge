//create dropdown of all json names
function buildDropdown(S){
    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then(data=>{
        console.log(data);
        let names = data.names;
        names.forEach((name) => {
            dropdown.append("option")
            .text(name)
            .property("value",name);
        });
    });
};

//create table for each individual name or subject Id



function buildChart(Subject){
    d3.json("samples.json").then(data=>{
        let sample_Data = data.samples;
        console.log(sample_Data);
        var filtered_Data = sample_Data.filter(object => object.id == Subject);
        var sub_Data = filtered_Data[0];
        
        var otu_ids = sub_Data.otu_ids;
        var otu_labels = sub_Data.otu_labels;
        var sample_values = sub_Data.sample_values;
        console.log(sample_Data);

  });
}



// function buildTable(){
//     d3.json("samples.json").then((data) => {
//         let table = d3.select("")
//     }
// }








//Create a horizontal bar chart with a dropdown menu
//to display the top 10 OTU's found in that individual.

//Sort the data by top
// function SubjectIds("samples.json"){

// }
// d3.json("samples.json").then((data)=>{
//     function SubjectIds()
// });
buildDropdown();
buildChart();

