//stream graph variables
var data;
var data_1;
var Tooltip;

//stacked bar variables

var combined_data;
var yearwisedata = new Array();
var barStackData = new Array();
var calendar;
var maxCountSampleData = Number.MIN_VALUE;

var std_dev;
var curr_chem;

//scatter plot variables
let data_Achara, data_Boonsri, data_Busarakhan, data_Chai, data_Decha, data_Kannika, data_Kohsoom, data_Sakda, data_Somchair, data_Tansanee;
let location_files = {};

//innovative view variables
parent_data = [];
location_json = [];
max_val = 0;
radius_scale = 1;
playing = false;
map_locations_json = [{ 'location': 'Achara', 'x': 45, 'y': 70 },
    { 'location': 'Boonsri', 'x': 60, 'y': 85 }, { 'location': 'Busarakhan', x: 80, y: 60 },
    { 'location': 'Chai', 'x': 65, 'y': 55 }, { 'location': 'Decha', 'x': 10, 'y': 40 },
    { 'location': 'Kannika', 'x': 70, 'y': 25 }, { 'location': 'Kohsoom', 'x': 80, 'y': 70 },
    { 'location': 'Sakda', 'x': 55, 'y': 7 }, { 'location': 'Somchair', 'x': 30, 'y': 55 },
    { 'location': 'Tansanee', 'x': 30, 'y': 30 }
];


document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv('data/yearwise_data_for_streamline_graph.csv'), d3.csv('data/combined_data.csv')])
        .then(function(values) {
            //stream plot
            data_1 = values[0];

            data_1.map(function(d) {
                d.year = +d.year;
                d.Achara = +d.Achara;
                d.Boonsri = +d.Boonsri;
                d.Busarakhan = +d.Busarakhan;
                d.Chai = +d.Chai;
                d.Decha = +d.Decha;
                d.Kannika = +d.Kannika;
                d.Kohsoom = +d.Kohsoom;
                d.Sakda = +d.Sakda;
                d.Somchair = +d.Somchair;
                d.Tansanee = +d.Tansanee;
            });


            Tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            //innovative view
            parent_data = values[0];
            combined_data = values[1];
            console.log('data loaded');

            add_chemical_to_ddl(parent_data);

            // curr_chem = d3.select('#chemical_ddl').property('value');

            drawStreamline();

            drawCircleGraph();
            drawPieGraph();

            //scatter plot 

            total_data = values[0];
            data_Achara = total_data.map(({ measure, year, units, Achara }) => ({ measure, year, units, Achara }));
            data_Achara.map(function(data_Achara) {
                data_Achara.location = "Achara";
                data_Achara.year = +data_Achara.year;
                data_Achara.value = parseFloat(data_Achara.Achara);
            });
            data_Boonsri = total_data.map(({ measure, year, units, Boonsri }) => ({ measure, year, units, Boonsri }));
            data_Boonsri.map(function(data_Boonsri) {
                data_Boonsri.location = "Boonsri";
                data_Boonsri.year = +data_Boonsri.year;
                data_Boonsri.value = parseFloat(data_Boonsri.Boonsri);
            });
            data_Busarakhan = total_data.map(({ measure, year, units, Busarakhan }) => ({ measure, year, units, Busarakhan }));
            data_Busarakhan.map(function(data_Busarakhan) {
                data_Busarakhan.location = "Busarakhan";
                data_Busarakhan.year = +data_Busarakhan.year;
                data_Busarakhan.value = parseFloat(data_Busarakhan.Busarakhan);
            });
            data_Chai = total_data.map(({ measure, year, units, Chai }) => ({ measure, year, units, Chai }));
            data_Chai.map(function(data_Chai) {
                data_Chai.location = "Chai";
                data_Chai.year = +data_Chai.year;
                data_Chai.value = parseFloat(data_Chai.Chai);
            });
            data_Decha = total_data.map(({ measure, year, units, Decha }) => ({ measure, year, units, Decha }));
            data_Decha.map(function(data_Decha) {
                data_Decha.location = "Decha";
                data_Decha.year = +data_Decha.year;
                data_Decha.value = parseFloat(data_Decha.Decha);
            });
            data_Kannika = total_data.map(({ measure, year, units, Kannika }) => ({ measure, year, units, Kannika }));
            data_Kannika.map(function(data_Kannika) {
                data_Kannika.location = "Kannika";
                data_Kannika.year = +data_Kannika.year;
                data_Kannika.value = parseFloat(data_Kannika.Kannika);
            });
            data_Kohsoom = total_data.map(({ measure, year, units, Kohsoom }) => ({ measure, year, units, Kohsoom }));
            data_Kohsoom.map(function(data_Kohsoom) {
                data_Kohsoom.location = "Kohsoom";
                data_Kohsoom.year = +data_Kohsoom.year;
                data_Kohsoom.value = parseFloat(data_Kohsoom.Kohsoom);
            });
            data_Sakda = total_data.map(({ measure, year, units, Sakda }) => ({ measure, year, units, Sakda }));
            data_Sakda.map(function(data_Sakda) {
                data_Sakda.location = "Sakda";
                data_Sakda.year = +data_Sakda.year;
                data_Sakda.value = parseFloat(data_Sakda.Sakda);
            });
            data_Somchair = total_data.map(({ measure, year, units, Somchair }) => ({ measure, year, units, Somchair }));
            data_Somchair.map(function(data_Somchair) {
                data_Somchair.location = "Somchair";
                data_Somchair.year = +data_Somchair.year;
                data_Somchair.value = parseFloat(data_Somchair.Somchair);
            });
            data_Tansanee = total_data.map(({ measure, year, units, Tansanee }) => ({ measure, year, units, Tansanee }));
            data_Tansanee.map(function(data_Tansanee) {
                data_Tansanee.location = "Tansanee";
                data_Tansanee.year = +data_Tansanee.year;
                data_Tansanee.value = parseFloat(data_Tansanee.Tansanee);
            });
            location_files = { "Achara": data_Achara, "Boonsri": data_Boonsri, "Busarakhan": data_Busarakhan, "Chai": data_Chai, "Decha": data_Decha, "Kannika": data_Kannika, "Kohsoom": data_Kohsoom, "Sakda": data_Sakda, "Somchair": data_Somchair, "Tansanee": data_Tansanee };

            updateMeanStDAndChem();

            drawAllScatterplots();

            //stacked bar view
            var parseTime = d3.timeParse("%d-%b-%y");
            // combined_data['new_formatted_dates'] = tParser(combined_data['new_formatted_dates']);
            var formatYear = d3.timeFormat("%Y")
            var formatMonth = d3.timeFormat("%m")
            var formatDay = d3.timeFormat("%d")

            calendar = d3.select(".calendar")

            var tem = d3.select("div.calendar").append("div");

            combined_data.forEach(function(d) {
                d['sample date'] = parseTime(d['sample date']);
                d['year'] = formatYear(d['sample date'])
                d['month'] = formatMonth(d['sample date'])
                d['day'] = formatDay(d['sample date'])
            });

            setDataBarStack(curr_chem);

            drawgraph(barStackData);
        })
});

// SCATTER PLOT FUNCTIONS

function updateMeanStDAndChem() {
    curr_chem = d3.select('#chemical_ddl').property('value');
    var tot_dict = {};
    let location_arr = ["Achara", "Boonsri", "Busarakhan", "Chai", "Decha", "Kannika", "Kohsoom", "Sakda", "Somchair", "Tansanee"]
    for (let i = 0; i < location_arr.length; i++) {
        tot_dict[location_arr[i]] = { "std": 0.0, "mean": 0.0, "values": [] };
    }
    for (let i = 0; i < total_data.length; i++) {
        if (total_data[i]["measure"] == curr_chem) {
            for (let j = 0; j < location_arr.length; j++) {
                if (total_data[i][location_arr[j]] != 0.0) {
                    tot_dict[location_arr[j]]["values"].push(total_data[i][location_arr[j]]);
                }
            }
        }
    }
    for (let i = 0; i < location_arr.length; i++) {
        tot_dict[location_arr[i]]["mean"] = (d3.mean(tot_dict[location_arr[i]]["values"]) === undefined) ? 0.0 : parseFloat(d3.mean(tot_dict[location_arr[i]]["values"]).toFixed(4));
        tot_dict[location_arr[i]]["std"] = (d3.deviation(tot_dict[location_arr[i]]["values"]) === undefined) ? 0.0 : parseFloat(d3.deviation(tot_dict[location_arr[i]]["values"]).toFixed(4));
        tot_dict[location_arr[i]]["values"] = [];
    }
    std_dev = tot_dict;
}

function drawAllScatterplots() {
    var svg = d3.select("#proj_scatterplots");
    if (!svg.select('svg').empty()) {
        svg.select('svg').remove();
    }
    clear_scatter_plot_graph();
    drawScatterplots("Achara", svg);
    drawScatterplots("Boonsri", svg);
    drawScatterplots("Busarakhan", svg);
    drawScatterplots("Chai", svg);
    drawScatterplots("Decha", svg);
    drawScatterplots("Kannika", svg);
    drawScatterplots("Kohsoom", svg);
    drawScatterplots("Sakda", svg);
    drawScatterplots("Somchair", svg);
    drawScatterplots("Tansanee", svg);

}

// This function plots a scatterplot for a specific location
function drawScatterplots(location, svg) {
    var margin = { top: 40, right: 30, bottom: 50, left: 60 };
    var width = 420 - margin.left - margin.right;
    var height = 320 - margin.top - margin.bottom;

    var curr_chem = d3.select('#chemical_ddl').property('value');
    // console.log(curr_chem);

    //console.log("Location file selected is: "+location);
    // console.log(location_files[location]);
    var curr_data = location_files[location].filter((x) => { return x.measure == curr_chem; });
    // console.log(curr_data);

    svg = d3.select("#proj_scatterplots")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "scatt_svg")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;
    // svg.append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let xScale = d3.scaleLinear()
        .domain([d3.min(curr_data, d => d.year), d3.max(curr_data, d => d.year) + 1]) // data space
        .range([0, width]); // pixel space
    let yScale = d3.scaleLinear()
        .domain([d3.min(curr_data, d => d.value), d3.max(curr_data, d => d.value) + 1]) // data space
        .range([height, 0]); // pixel space


    //append x axis
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        // .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
    //append y axis
    svg.append("g")
        .attr('class', "y-scatter-axis-" + location)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale));

    svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll("dot")
        .data(curr_data)
        .enter()
        .append("circle")
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr("r", 5)
        .style("fill", d => {
            let threshold1 = std_dev[location]['mean'] + (2 * std_dev[location]['std']);
            let threshold2 = std_dev[location]['mean'] + std_dev[location]['std'];
            // if (std_dev[location]['std'] == 0) threshold = mean*2;
            if (d.value > threshold1) return "#800022";
            if (d.value > threshold2) return "#e35418";
            return "#faaf40";
        });

    svg.append('g')
        .append("text")
        .style('fill', 'black')
        .attr("x", width - 5)
        .attr("y", 20)
        .style("font-size", "16px")
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .text(location);

    let t1 = std_dev[location]['mean'] + (2 * std_dev[location]['std']);
    let t2 = std_dev[location]['mean'] + std_dev[location]['std'];
    let t3 = std_dev[location]['mean'];

    if (!(yScale(t1) < 0) && !(yScale(t1) >= yScale(d3.min(curr_data, d => d.value))))
        svg.append("g")
        .attr("class", "axisGray")
        .attr("transform", "translate(" + margin.left + "," + (yScale(t1) + margin.top) + ")")
        .call(d3.axisBottom(xScale).tickValues([]).tickSize(0))
        .attr("stroke-dasharray", "5,10")
    if (!(yScale(t2) < 0) && !(yScale(t2) >= yScale(d3.min(curr_data, d => d.value))))
        svg.append("g")
        .attr("class", "axisGray")
        .attr("transform", "translate(" + margin.left + "," + (yScale(t2) + margin.top) + ")")
        .call(d3.axisBottom(xScale).tickValues([]).tickSize(0))
        .attr("stroke-dasharray", "5,10")
    if (!(yScale(t3) < 0) && !(yScale(t3) >= yScale(d3.min(curr_data, d => d.value))))
        svg.append("g")
        .attr("class", "axisGray")
        .attr("transform", "translate(" + margin.left + "," + (yScale(t3) + margin.top) + ")")
        .call(d3.axisBottom(xScale).tickValues([]).tickSize(0))

}

function clear_scatter_plot_graph() {
    img = document.getElementById("proj_scatterplots");
    while (img.children != null && img.children[0]) {
        img.removeChild(img.children[0]);
    }

}


// INNOVATIVE VIEW FUNCTIONS

function add_chemical_to_ddl(data) {
    chemical_list = [];
    data.forEach(element => {
        if (!chemical_list.includes(element.measure)) {
            chemical_list.push(element.measure);
        }
    })
    chemical_list.forEach(element => {
        var o = new Option(element, element);
        $(o).html(element);
        $("#chemical_ddl").append(o);
    });
}

function drawCircleGraph() {
    clear_drawing_innovative();

    year_val = $("#myRange")[0].value;
    chemical_val = $("#chemical_ddl")[0].value;
    console.log('drawing innovative view for ' + chemical_val + ' for year ' + year_val);
    location_json = [];
    parent_data.forEach(element => {
        if (element.measure == chemical_val && element.year == year_val) {
            //['Achara','Boonsri','Busarakhan','Chai','Decha','Kannika','Kohsoom','Sakda','Somchair','Tansanee'];
            location_json = {
                'Achara': element.Achara,
                'Boonsri': element.Boonsri,
                'Busarakhan': element.Busarakhan,
                'Decha': element.Decha,
                'Chai': element.Chai,
                'Kannika': element.Kannika,
                'Kohsoom': element.Kohsoom,
                'Sakda': element.Sakda,
                'Somchair': element.Somchair,
                'Tansanee': element.Tansanee
            };

        }


    });
    max_val = 0;
    Object.keys(location_json).forEach(function(d) {


        if (parseFloat(location_json[d]) > max_val) {
            max_val = parseFloat(location_json[d]);
        }
    });
    radius_scale = 1;
    if (max_val == 0) {
        radius_scale = 1;
    } else {
        radius_scale = 40 / max_val;
    }

    console.log('radius_scale for ' + chemical_val + ' for year ' + year_val + ':' + radius_scale);
    console.log('max_val for ' + chemical_val + ' for year ' + year_val + ':' + max_val);


    let margin_top = 30;
    let margin_bottom = 200;
    let margin_right = 40;
    let margin_left = 40;
    width = 800 - margin_left - margin_right,
        height = 800 - margin_top - margin_bottom;

    var svg = d3.select("#innovative_svg")
        // .attr('id', "scatter-plot-group")
        .attr("width", width + margin_left + margin_right)
        .attr("height", height + margin_top + margin_bottom)
        .append("g")

    // .attr("transform","translate(" + margin_left + "," + margin_top + ")");
    //appending a group later to perform svg animations into 
    // svg.append('g');
    var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    //append x axis
    // svg.append("g")
    //     .attr("transform", "translate(" + margin_left + "," + (height + margin_top) + ")")
    //     .call(d3.axisBottom(xScale).tickFormat(""));
    //append y axis
    // svg.append("g")
    //     .attr("transform", "translate(" + margin_left + "," + margin_top + ")")
    //     .call(d3.axisLeft(yScale).tickFormat(""));

    svg.selectAll("circle").data(map_locations_json).enter().append("circle")
        .attr("transform", "translate(" + margin_left + "," + margin_top + ")")
        .attr("cx", function(d) { return xScale(d['x']); })
        .attr("cy", function(d) { return yScale(d['y']); })
        .attr("r", function(d) {

            r_val = (parseFloat(location_json[d['location']])) + (2 / radius_scale);
            // console.log('radius ' + r_val * radius_scale);
            return r_val * radius_scale;
        })
        .style("fill", "#CC0000")
        .attr("stroke", "#CC0000")
        .attr("stroke-width", 2)
        .attr("fill-opacity", .05)
        .on("mouseover", function() {

        })

}

function drawPieGraph() {
    clear_drawing_pie_graph();
    var width = 450;
    height = 450;
    margin = 40;

    var radius = Math.min(width, height) / 2 - margin;
    var svg = d3.select("#innovative_svg_pie")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    year_val = $("#myRange")[0].value;
    chemical_val = $("#chemical_ddl")[0].value;
    zero_val_locations = "Locations with '0' reading value : \n\n";
    console.log('drawing innovative view for ' + chemical_val + ' for year ' + year_val);
    parent_data.forEach(element => {
        if (element.measure == chemical_val && element.year == year_val) {
            //['Achara','Boonsri','Busarakhan','Chai','Decha','Kannika','Kohsoom','Sakda','Somchair','Tansanee'];
            location_json = {};
            if (element.Achara != 0) {
                location_json['Achara'] = Math.round((element.Achara * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Achara, ";
            }
            if (element.Boonsri != 0) {
                location_json['Boonsri'] = Math.round((element.Boonsri * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Boonsri, ";
            }

            if (element.Busarakhan != 0) {
                location_json['Busarakhan'] = Math.round((element.Busarakhan * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Busarakhan, ";
            }

            if (element.Decha != 0) {
                location_json['Decha'] = Math.round((element.Decha * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Decha, ";
            }

            if (element.Chai != 0) {
                location_json['Chai'] = Math.round((element.Chai * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Chai, ";
            }

            if (element.Kannika != 0) {
                location_json['Kannika'] = Math.round((element.Kannika * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Kannika, ";
            }

            if (element.Kohsoom != 0) {
                location_json['Kohsoom'] = Math.round((element.Kohsoom * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Kohsoom, ";
            }

            if (element.Sakda != 0) {
                location_json['Sakda'] = Math.round((element.Sakda * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Sakda, ";
            }

            if (element.Somchair != 0) {
                location_json['Somchair'] = Math.round((element.Somchair * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Somchair, ";
            }
            if (element.Tansanee != 0) {
                location_json['Tansanee'] = Math.round((element.Tansanee * 10 + 1) * 1000) / 1000;
            } else {
                zero_val_locations = zero_val_locations + "Tansanee, ";
            }

            if (zero_val_locations != "Locations with 0 reading value : ") {
                zero_val_locations = zero_val_locations.substring(0, zero_val_locations.length - 2);
                $("#zero_val_loc_label").text(zero_val_locations);
            }
          
               
            
        }

    });

    if (Object.keys(location_json).length == 0) {
        $("#innovative_svg_pie").hide();
        $("#zero_val_loc_label").text("No data found for any locations, unable to draw pie chart.");
        $("#zero_val_loc_label")[0].style["margin-left"] = "100px";
    } else {
        $("#innovative_svg_pie").show();
        $("#zero_val_loc_label")[0].style["margin-left"] = "-352px";

    }
    var color = d3.scaleOrdinal()
        .domain(location_json)
        .range(d3.schemeSet2);
    var pie = d3.pie()
        .value(function(d) { return d.value; })

    var data_ready = pie(d3.entries(location_json))

    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    var tooltip = d3.select("#my_dataviz_pie")
        .append("div")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "solid")
        .style("width", "100px")
        .style("height", "130px")
        .attr("class", "tooltip")
        .style("text-align", "center")
        .style("font-size", "15px")
        .style("font-family", "sans-serif")
        .style("border-width", "1px")
        .style("border-radius", "3px")
        .style("padding", "10px")
        .style("position", "absolute");
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d) { return (color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(d) {

            tooltip
                .style("opacity", 1);

        })
        .on("mousemove", function(d) {

            if (d3.select('#chemical_ddl').property('value') == "Water temperature")
            {
                tooltip
                .style("opacity", 1)
                .html("Current value at  " + d.data.key + "- " + (d.data.value / 10).toFixed(2) + " <span>&#176;</span>C , against a mean value of " + mean_val(d.data.key) +" <span>&#176;</span>C")
                .style("left", (d3.mouse(this)[0] + 1090 - 70) + "px")
                .style("top", (d3.mouse(this)[1] + 300) + "px");

            }
            else if(d3.select('#chemical_ddl').property('value') == "Macrozoobenthos")
            {
                tooltip
                .style("opacity", 1)
                .html("Current value at  " + d.data.key + "- " + (d.data.value / 10).toFixed(2) + " , against a mean value of " + mean_val(d.data.key) +" ")
                .style("left", (d3.mouse(this)[0] + 1090 - 70) + "px")
                .style("top", (d3.mouse(this)[1] + 300) + "px");
            }
            else
            {
                tooltip
                .style("opacity", 1)
                .html("Current value at  " + d.data.key + "- " + (d.data.value / 10).toFixed(2) + " <span>&#181;</span>g/L , against a mean value of " + mean_val(d.data.key) +" <span>&#181;</span>g/L")
                .style("left", (d3.mouse(this)[0] + 1090 - 70) + "px")
                .style("top", (d3.mouse(this)[1] + 300) + "px");

            }
            
        })
        .on("mouseleave", function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);

        })


    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d) { return d.data.key + " " + Math.round(((d.data.value - 1) / 10) * 1000) / 1000 })
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .style("font-size", 13);

}




function clear_drawing_innovative() {
    try {
        img = document.getElementById("innovative_svg");
        while (img.children != null && img.children[0]) {
            img.removeChild(img.children[0]);
        }
        d3.select("#innovative_svg").exit().remove();
    } catch (e) {
        console.log(e);
    }

}

function clear_drawing_pie_graph() {
    try {
        img = document.getElementById("innovative_svg_pie");
        while (img.children != null && img.children[0]) {
            img.removeChild(img.children[0]);
        }
    } catch (e) {
        console.log(e);
    }

}


function playAnimation() {
    if (playing) {
        playing = false;
        $("#btn_play")[0].value = 'Play';
        return;
    }
    playing = true;
    $("#btn_play")[0].value = 'Pause';
    current_year = parseInt($("#myRange")[0].value);

    ts = window.setInterval(function() {
        if (!playing || current_year > 2015) {
            $("#btn_play")[0].value = 'Play';
            window.clearTimeout(ts)
        }
        current_year += 1;
        $("#myRange")[0].value = current_year + '';
        $("#demo").text(current_year + '');
        drawCircleGraph();
        drawPieGraph();
        drawAllScatterplots();
    }, 1000);

    return;

}

function mean_val(location) {
    chemical_val = $("#chemical_ddl")[0].value;
    location_val = location;
    sum = 0;
    i = 0;
    parent_data.forEach(element => {
        if (element.measure == chemical_val) {
            sum = sum + parseFloat(element[location]);
            i++;

        }

    })
    return Math.round(((sum / i)) * 1000) / 1000;
}

//STREAM GRAPH FUNCTIONS

function drawStreamline() {

    var margin = { top: 20, right: 60, bottom: 0, left: 80 },
        width = 550 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;


    var svg = d3.select('#stream_svg');
    svg.selectAll('*').remove();

    svg.append("g")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    //console.log(data.columns);

    let data = data_1;
    // console.log(data);


    var attrib = d3.select('#chemical_ddl').property('value');
    console.log(attrib);

    data.map(function(d) {
        d.year = +d.year;
        d.Achara = +d.Achara;
        d.Boonsri = +d.Boonsri;
        d.Busarakhan = +d.Busarakhan;
        d.Chai = +d.Chai;
        d.Decha = +d.Decha;
        d.Kannika = +d.Kannika;
        d.Kohsoom = +d.Kohsoom;
        d.Sakda = +d.Sakda;
        d.Somchair = +d.Somchair;
        d.Tansanee = +d.Tansanee;
    });

    // console.log(data);

    const keys = data.columns.slice(2);
    keys.shift();

    // const keys = data.columns.slice(1)
    // console.log(keys);
    // console.log(attrib);
    data = data.filter(function(d) { return d.measure == attrib; });
    // console.log(data);
    var loc_1 = d3.max(data, d => d.Achara);
    var loc_2 = d3.max(data, d => d.Boonsri);
    var loc_3 = d3.max(data, d => d.Busarakhan);
    var loc_4 = d3.max(data, d => d.Chai);
    var loc_5 = d3.max(data, d => d.Decha);
    var loc_6 = d3.max(data, d => d.Kannika);
    var loc_7 = d3.max(data, d => d.Kohsoom);
    var loc_8 = d3.max(data, d => d.Sakda);
    var loc_9 = d3.max(data, d => d.Somchair);
    var loc_10 = d3.max(data, d => d.Tansanee);


    var arr = [loc_1, loc_2, loc_3, loc_4, loc_5, loc_6, loc_7, loc_8, loc_9, loc_10];

    // console.log(arr);



    var x = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height) + ")")
        .call(d3.axisBottom(x).tickSize(-height * .7).tickFormat(d3.format("d")))
        // .tickSize(-height * .7)
        // .tickValues([1998, 1999, 2000, 2001])
        .select(".domain").remove()


    svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width * 2.3 / 3)
        .attr("y", height + 40)
        .style("font-family","sans-serif")
        .text("Time (year)");

    var y = d3.scaleLinear()
        .domain([-d3.max(arr) * 3, d3.max(arr) * 3])
        .range([height, 0]);


    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeDark2);

    var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (data)

    // console.log(stackedData);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("font-family","sans-serif")
        .style("opacity", 0);

    var mouseover = function(d, i) {
        div.style("opacity", 1)
        d3.selectAll(".myArea").style("opacity", .2)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        grp = keys[i];
        // Tooltip.text(grp)
        // console.log(grp)

        // console.log(d);

        div.transition()
            .duration(50)
            .style("opacity", 1);

        div.html("Location: " + grp + "<br> Year: " + data.year + "<br> value: " + data.attrib)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    }


    var mousemove = function(d, i) {
        grp = keys[i]

        div.html("Location: " + grp + "<br> Year: " + data.year + "<br> Value: " + data.attrib)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");


        var mousex = d3.mouse(this);
        mousex = mousex[0];
        var invertedx = Math.floor(x.invert(mousex));

        var datearray = [];
        var chem_conc = "";
        for (var k = 0; k < d.length; k++) {
            // console.log(d[k]['data']);

            if (d[k]['data']['year'] == invertedx) {
                chem_conc = d[k]['data'][d.key];
                break;
            }
        }
        div.html("Location: " + d.key + "<br> Year: " + invertedx + "<br> Value: " + chem_conc)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    }

    var mouseleave = function(d) {
        div.style("opacity", 0)
        d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
        div.transition()
            .duration('50')
            .style("opacity", 0);
    }

    var mouseclick = function(d)
    {
        var mousex = d3.mouse(this);
        mousex = mousex[0];
        var invertedx = Math.floor(x.invert(mousex));
        
        
        
        $("#myRange")[0].value = invertedx+'';
        var output = document.getElementById("demo");
        output.innerHTML = invertedx+'';

        drawCircleGraph();
        drawPieGraph();
        document.getElementById('slide_div').scrollIntoView({
            behavior: 'smooth'
          });

    }

    var area = d3.area()
        .x(function(d) { return x(d.data.year); })
        .y0(function(d) { return parseInt(y(d[0])); })
        .y1(function(d) { return parseInt(y(d[1])); })


    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click",mouseclick)

}



// STACKED BAR GRAPH FUNCTIONS

function setDataBarStack(chem) {
    var filteredData = Object.assign([], combined_data);
    // console.log(filteredData);
    if (chem != '')
        filteredData = filteredData.filter(el => el["measure"] == chem);
    // console.log(filteredData);

    yearwisedata = new Array();
    filteredData.forEach(function(d) {
        var tem_year = +d['year']
        var tem_month = +d['month']
        var tem_day = +d['day']
        if (tem_year in yearwisedata) {
            if (tem_month in yearwisedata[tem_year]) {
                if (tem_day in yearwisedata[tem_year][tem_month]) {
                    yearwisedata[tem_year][tem_month][tem_day] += 1;
                    yearwisedata[tem_year][tem_month]['locations'].add(d['location']);
                } else {
                    yearwisedata[tem_year][tem_month][tem_day] = 1;
                    yearwisedata[tem_year][tem_month]['locations'] = new Set();
                    yearwisedata[tem_year][tem_month]['locations'].add(d['location']);
                }
            } else {
                yearwisedata[tem_year][tem_month] = new Object();
                yearwisedata[tem_year][tem_month][tem_day] = 1;
                yearwisedata[tem_year][tem_month]['locations'] = new Set();
                yearwisedata[tem_year][tem_month]['locations'].add(d['location']);
            }
        } else {
            yearwisedata[tem_year] = new Object();
            yearwisedata[tem_year][tem_month] = new Object();
            yearwisedata[tem_year][tem_month][tem_day] = 1;
            yearwisedata[tem_year][tem_month]['locations'] = new Set();
            yearwisedata[tem_year][tem_month]['locations'].add(d['location']);
        }
    });



    // console.log(yearwisedata);
    barStackData = new Array();
    // Object.keys(yearwisedata).forEach(function(d) {
    for (let m = 1998; m <= 2016; m++) {
        let d = "" + m;
        // console.log(d);
        var temp = new Object();
        temp['year'] = d;
        for (var i = 1; i <= 12; i++) {
            if (yearwisedata[d] != undefined && !(i in yearwisedata[d])) yearwisedata[d][i] = {};

            if (yearwisedata[d] != undefined && Object.keys(yearwisedata[d][i]).length > 0)
                temp[i] = Object.keys(yearwisedata[d][i]).length - 1;
            else temp[i] = 0;

            var no_days = daysInMonth(i, d);
            for (var j = 1; j <= no_days; j++) {
                if (yearwisedata[d] != undefined && !(j in yearwisedata[d][i])) {
                    yearwisedata[d][i][j] = 0;
                }
                if (yearwisedata[d] != undefined && yearwisedata[d][i] != undefined && yearwisedata[d][i][j] != undefined)
                    maxCountSampleData = Math.max(maxCountSampleData, yearwisedata[d][i][j]);
            }
        }
        barStackData.push(temp);
    }
    // );
}


function drawCalendar(m, y) {
    d3.select("#calendar").selectAll('*').remove();
    let data = yearwisedata;


    // data = data[y][m];
    var clone = new Array();

    for (var p in data[y][m]) {
        if (p == 'locations') continue;
        let temp = new Object();
        temp['day'] = y + "-" + m + "-" + p;
        temp['count'] = data[y][m][p];
        clone.push(temp);
    }

    // var clone = Object.assign({}, data[y][m]);


    let locations = data[y][m]["locations"];
    delete clone["locations"];
    // console.log(data[y][m]);

    // for (var p in clone) {
    //         clone[y + "-" + m + "-" + p] = data[y][m][p];
    //     }
    // console.log(clone);
    // console.log(locations);


    let cal_dat = d3.csvFormat(clone);

    var dateData = d3.csvParse(cal_dat);

    var weeksInMonth = function(month) {
        var m = d3.timeMonth.floor(month)
        return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
    }

    var calendarRows = function(month) {
        var m = d3.timeMonth.floor(month);
        return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
    }


    var minDate = d3.min(dateData, function(d) { return new Date(d.day) })
    var maxDate = d3.max(dateData, function(d) { return new Date(d.day) })

    var cellMargin = 2,
        cellSize = 20;

    var day = d3.timeFormat("%w"),
        week = d3.timeFormat("%U"),
        format = d3.timeFormat("%Y-%m-%d"),
        dateformat = d3.timeFormat("%d"),
        titleFormat = d3.utcFormat("%a, %d-%b");
    monthName = d3.timeFormat("%B"),
        months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

    // var svg = d3.select("#calendar").selectAll("svg")
    //     .data(months)
    //     .enter().append("svg")
    //     .attr("class", "month")
    //     .attr("height", ((cellSize * 7) + (cellMargin * 8) + 20)) // the 20 is for the month labels
    //     .attr("width", function(d) {
    //         var columns = weeksInMonth(d);
    //         return ((cellSize * columns) + (cellMargin * (columns + 1)));
    //     })
    //     .append("g")

    // svg.append("text")
    //     .attr("class", "month-name")
    //     .attr("y", (cellSize * 7) + (cellMargin * 8) + 15)
    //     .attr("x", function(d) {
    //         var columns = weeksInMonth(d);
    //         return (((cellSize * columns) + (cellMargin * (columns + 1))) / 2);
    //     })
    //     .attr("text-anchor", "middle")
    //     .text(function(d) { return monthName(d); })

    var svg = d3.select("#calendar").selectAll("svg")
        .data(months)
        .enter().append("svg")
        .attr("class", "month")
        .attr("width", (cellSize * 7) + (cellMargin * 8))
        .attr("height", function(d) {
            var rows = calendarRows(d);
            return (cellSize * rows) + (cellMargin * (rows + 1)) + 50; // the 20 is for the month labels
        })
        .append("g")


    var cal_day = svg.selectAll("cal.day")
        .data(function(d, i) { return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1)); })
        .enter().append("rect")
        .attr("class", "day hover")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("rx", 3).attr("ry", 3) // rounded corners
        .attr("fill", '#eaeaea') // default light grey fill
        .style("border", '1px black')
        .attr("x", function(d) { return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin; })
        .attr("y", function(d) { return ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellSize) + ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellMargin) + cellMargin; })
        .attr("text", function(d) { return d.getDate() })
        .attr("transform", "translate(0," + 20 + ")")
        // .on("mouseover", function(d) {
        //     d3.select(this).classed('hover', true);
        // })
        // .on("mouseout", function(d) {
        //     d3.select(this).classed('hover', false);
        // })
        .datum(format);

    svg.selectAll("cal.date")
        .data(function(d, i) { return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1)); })
        .enter().append("text")
        .attr("class", "date")
        .attr("x", function(d) { return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin; })
        .attr("y", function(d) { return ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellSize) + ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellMargin) + cellMargin; })
        .attr("dy", "1.2em")
        .attr("dx", ".35em")
        .style("font-size", 10)
        .attr("transform", "translate(0," + 20 + ")")
        .text(function(d) {
            return dateformat(new Date(d));
        });

    svg.selectAll("cal.week")
        .data(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"])
        .enter().append("text")
        .attr("class", "date")
        .attr("x", function(d, i) { return i * 22.75; })
        .attr("y", function(d, i) { var rows = calendarRows(d); return (cellSize * rows) + (cellMargin * (rows + 1)); })
        .attr("dy", "1em")
        .attr("dx", ".35em")
        .style("font-size", "10")
        .style("font-weight", "bold")
        .text(function(d) {
            return d;
        });

    // cal_day.append("title")
    //     .text(function(d) { return titleFormat(new Date(d)); });

    var lookup = d3.nest()
        .key(function(d) { return d.day.split("-").pop(); })
        .rollup(function(leaves) {
            return d3.sum(leaves, function(d) { return parseInt(d.count); });
        })
        .object(dateData);

    var scale = d3.scaleLinear()
        .domain([0, maxCountSampleData])
        .range([0, 1]);

    let barWidth = width;
    let barHeight = 10;

    cal_day.style("fill", function(d) {
        return d3.interpolatePuBu(scale(lookup[+d.split("-").pop()]));
    });

    let linearGradient = svg.append("linearGradient")
        .attr("id", "linear-gradient");

    var colorScale = d3.scaleSequential(d3.interpolatePuBu)
        .domain([0, maxCountSampleData]);

    // console.log(maxCountSampleData);

    linearGradient.selectAll("stop")
        .data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    var rows = calendarRows(months[0]);
    let height_cal = (cellSize * rows) + (cellMargin * (rows + 1)) + 30;

    let cal_width = ((cellSize * 7) + (cellMargin * (7 + 1)));
    let axisScalecal = d3.scaleLinear()
        .domain(colorScale.domain())
        .range([0, cal_width - 10])

    let axisBottomcal = g => g
        .attr("class", 'x-axis')
        .attr("transform", 'translate(5,' + (height_cal + barHeight) + ')')
        .call(d3.axisBottom(axisScalecal)
            .ticks((cal_width - 10) / 40)
            .tickSize(-barHeight))

    var rect = svg.append("rect")
        .attr("class", "legend-scale")
        .attr("width", cal_width - 10)
        .attr("height", barHeight)
        .attr("transform", 'translate(5,' + (height_cal) + ')')
        .style("fill", "url(#linear-gradient)");

    svg.append('g')
        .call(axisBottomcal);

}


function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}


function drawgraph(barStackData) {
    var margin = { top: 10, right: 150, bottom: 100, left: 80 },
        width = 830 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz_stacked_bar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var csv_dat = d3.csvFormat(barStackData);

    var data = d3.csvParse(csv_dat);


    var subgroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var groups = d3.set(data, function(d) { return d.year }).values();

    var stackedData = d3.stack()
        .keys(subgroups)
        (data);

    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.4])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    var y = d3.scaleLinear()
        .domain(getExtentSamples(stackedData))
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var colors = ['#4d1b2f', '#5f1e31', '#731f30', '#87202a', '#9d1f1f', '#b32c1e', '#cb3e1b', '#e35418', '#ee7322', '#f59230', '#faaf40', '#ffca50'];
    // var colors = ['#5C4B51', '#8CBEB2', '#F2EBBF', '#F3B562', '#F06060', '#1B3E59', '#c18fab', '#FFAC00', '#BF0404', '#730202', '#1B005A', '#7543E8'];

    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(colors)

    // console.log(stackedData);

    // var stackedData = d3.stack();
    // var temp = subgroups.map(function(month) {
    //     console.log(month);
    //     return data.map(function(d) {
    //         console.log(d);
    //         console.log(month);
    //         console.log({ x: d.year, y: +d[month] });
    //         return { x: d.year, y: +d[month] };
    //     });
    // });

    // Show the bars
    svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d['data']['year']); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .on("mouseover", function(d, i) {
            // console.log(d);
            calendar.transition()
                .style("opacity", 1);
            var y = d['data']['year'];
            var month = getMonth(d);
            var strArray = [];
            for (str of yearwisedata[y][month]['locations']) {
                strArray.push(str);
            }
            var toolHtml = "<center class='bold'>" + d3.timeFormat("%B")(d3.timeParse("%m")(month)) + " - " + d['data']['year'] +
                "<br><br>HeatMap - Samples collected/day: <br><div id='calendar'></div>" +
                "Total days (samples collected): " + (d[1] - d[0]) + "<br>Locations: " + strArray.join(', ') + "</center>";
            // var temp_html = calendar.html();
            calendar.html(toolHtml)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 200) + "px");
            drawCalendar(month, d['data']['year']);
        })
        .on("mouseout", function() {
            calendar.transition()
                .style("opacity", 0);
        })
        .on("mousemove", function(d) {
            var month = getMonth(d);
            calendar.style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 290) + "px");
        })
        .on("click",function(d)
        {
            var y = d['data']['year'];
            $("#myRange")[0].value = y+'';
        var output = document.getElementById("demo");
        output.innerHTML = y+'';

        drawCircleGraph();
        drawPieGraph();
        document.getElementById('slide_div').scrollIntoView({
            behavior: 'smooth'
          });
        });;

    addLabelsstackedBar(svg, width, height, margin);
    addLegendstackedBar(svg, colors, width);

}

function addLabelsstackedBar(svg, width, height) {
    svg.append("text")
        .attr("transform", "rotate(-90)")
        // .attr("transform", "translate(10, 0)")
        .attr("y", -50)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-family","sans-serif")
        .text("Days - Sample Collection");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .style("text-anchor", "middle")
        .style("font-family","sans-serif")
        .text("Year");
}

function getMonth(d) {
    var dat = d['data'];
    var l = 0;
    var r = 0;
    for (var i = 1; i <= 12; i++) {
        l += (+dat[i]);
        if (d[1] == l) {
            return i;
        }
        r = l;
    }
    return 1;
}

function addLegendstackedBar(svg, colors, width) {
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(50," + i * 19 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) {
            return d3.timeFormat("%B")(d3.timeParse("%m")(i + 1));
        });


    // Prep the tooltip bits, initial display is hidden
    // tooltip = svg.append("g")
    //     .attr("class", "calendar-tooltip")
    //     .style("opacity", 0);

    // tooltip.append("rect")
    //     .attr("width", 200)
    //     .attr("height", 100)
    //     .attr("fill", "white")
    //     // .style("border", "2px")

    // tooltip.append("text")
    //     .attr("x", 15)
    //     .attr("dy", "1.2em")
    //     .style("text-anchor", "middle")
    //     .attr("font-size", "12px")
    //     .attr("font-weight", "bold");
}

function getExtentSamples(data) {
    var max = d3.max(data[data.length - 1], d => {
        return d[1];
    });
    // console.log(max);
    return [0, max];
}

function drawStackedBarGraph() {
    clearStackedBarGraph();
    var curr_chem = d3.select('#chemical_ddl').property('value');
    setDataBarStack(curr_chem);
    drawgraph(barStackData);
}

function clearStackedBarGraph() {
    img = document.getElementById("my_dataviz_stacked_bar");
    while (img.children != null && img.children[0]) {
        img.removeChild(img.children[0]);
    }
}