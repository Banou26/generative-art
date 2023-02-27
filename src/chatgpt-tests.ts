// import * as d3 from 'd3'
// console.log('d3')

// // Set up the dimensions and margins of the plot
// const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// const width = 500 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Create the SVG element and set its dimensions
// const svg = d3.select("body")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Define the data for the raster plot
// const data = [
//   [0.1, 0.2, 0.3],
//   [0.4, 0.5, 0.6],
//   [0.7, 0.8, 0.9]
// ];

// // Define the color scale for the plot
// const colorScale = d3.scaleSequential()
//   .domain([0, 1])
//   .interpolator(d3.);

// // Create the raster plot
// svg.selectAll("rect")
//   .data(data)
//   .enter()
//   .append("rect")
//   .attr("x", (d, i) => i * width / data.length)
//   .attr("y", (d, i) => i * height / data.length)
//   .attr("width", width / data.length)
//   .attr("height", height / data.length)
//   .attr("fill", d => colorScale(d));

// import * as d3 from 'd3'
// console.log('d3')

// // Set up the dimensions and margins of the plot
// const margin = { top: 50, right: 50, bottom: 50, left: 50 };
// const width = 500 - margin.left - margin.right;
// const height = 500 - margin.top - margin.bottom;

// // Define the x and y scales with equal ranges
// const xScale = d3.scaleLinear()
//   .domain([0, 1])
//   .range([0, width]);

// const yScale = d3.scaleLinear()
//   .domain([0, 1])
//   .range([height, 0]);

// // Create the SVG element and set its dimensions
// const svg = d3.select("body")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Create the rectangular plot area with equal aspect ratio
// const plotArea = svg.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", width)
//   .attr("height", height)
//   .style("fill", "none")
//   .style("stroke", "black")
//   .style("stroke-width", "1px");

// // Create the x and y axes
// const xAxis = d3.axisBottom(xScale);
// const yAxis = d3.axisLeft(yScale);

// svg.append("g")
//   .attr("transform", `translate(0, ${height})`)
//   .call(xAxis);

// svg.append("g")
//   .call(yAxis);


import * as d3 from 'd3'
console.log('d3')

// Set up the dimensions and margins of the plot
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Define the data for the raster plot
const data = [
  { x: 0.1, y: 0.2, v: 0.3 },
  { x: 0.4, y: 0.5, v: 0.6 },
  { x: 0.7, y: 0.8, v: 0.9 }
];

// Define the color scale for the plot
const colors = ["#0000FF", "#00FFFF", "#FFFF00", "#FF0000"];
const colorScale = d3.scaleLinear()
  .domain([0, 1])
  .range(colors);

// Define the x and y scales with equal ranges
const xScale = d3.scaleLinear()
  .domain([0, 1])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

// Create the SVG element and set its dimensions
const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create the rectangular plot area with equal aspect ratio
const plotArea = svg.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", "1px");

// Create the raster plot
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => xScale(d.x))
  .attr("y", d => yScale(d.y))
  .attr("width", width / data.length)
  .attr("height", height / data.length)
  .attr("fill", d => colorScale(d.v));

// Create the x and y axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svg.append("g")
  .call(yAxis);

// Customize the axes and plot area styles
svg.selectAll("path.domain")
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", "1px");

svg.selectAll("line")
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", "1px");

svg.selectAll(".tick line")
  .style("stroke", "black")
  .style("stroke-width", "1px");
