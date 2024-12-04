// ---------Samples per song----------

// Data
const songTitles = ["One More Time", "Aerodynamic", "Digital Love", "Harder, Better, Faster, Stronger", "Crescendolls", "Nightvision", "Superheroes", "High Life", "Something About Us", "Voyager", "Veridis Quo", "Short Circuit", "Face to Face", "Too Long"];
const sampleCounts = [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 20, 3];

// Chart dimensions; SPS for samplesPerSong
const widthSPS = 700;
const heightSPS = 500;
const marginSPS = { top: 20, right: 20, bottom: 50, left: 170 };

// Create an SVG container
const svgSPS = d3
  .select("#samplesPerSong")
  .append("svg")
  .attr("width", widthSPS + marginSPS.left + marginSPS.right)
  .attr("height", heightSPS + marginSPS.top + marginSPS.bottom)
  .append("g")
  .attr("transform", "translate(" + marginSPS.left + "," + marginSPS.top + ")");

// Create scales
const xScale = d3.scaleLinear()
  .domain([0, d3.max(sampleCounts)])
  .nice()
  .range([0, widthSPS]);

const yScale = d3.scaleBand()
  .domain(songTitles)
  .range([0, heightSPS])
  .padding(0.1);

// Draw bars
svgSPS.selectAll(".bar")
  .data(sampleCounts)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", 0) // Bars start at x=0
  .attr("y", (d, i) => yScale(songTitles[i]))
  .attr("width", d => xScale(d))
  .attr("height", yScale.bandwidth())
  .attr("fill", "#3498db");

// Add x-axis
svgSPS.append("g")
  .attr("transform", `translate(0, ${heightSPS})`)
  .call(d3.axisBottom(xScale));

// Add y-axis
svgSPS.append("g")
  .call(d3.axisLeft(yScale))
  .selectAll("text")
  .style("text-anchor", "end");

// Add labels
svgSPS.append("text")
  .attr("x", widthSPS / 2)
  .attr("y", heightSPS + marginSPS.bottom - 10)
  .attr("text-anchor", "middle")
  .text("Number of Samples");

svgSPS.append("text")
  .attr("x", -heightSPS / 2)
  .attr("y", -marginSPS.left + 50)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Songs");

// ---------Songs Comparison----------

// Data
const dataSC = [
    { category: "With Samples", count: 10 },
    { category: "Without Samples", count: 4 }
];

// Dimensions
const widthSC = 400;
const heightSC = 400;
const marginSC = 40;

const radiusSC = Math.min(widthSC, heightSC) / 2 - marginSC;

// Append SVG
const svgSC = d3
    .select("#songsComparison")
    .append("svg")
    .attr("width", widthSC)
    .attr("height", heightSC)
    .append("g")
    .attr("transform", `translate(${widthSC / 2}, ${heightSC / 2})`);

// Color scale
const colorSC = d3
    .scaleOrdinal()
    .domain(["With Samples", "Without Samples"])
    .range(["green", "gray"]);

// Create pie and arc
const pieSC = d3.pie()
    .value(d => d.count);

const arcSC = d3.arc()
    .innerRadius(0)
    .outerRadius(radiusSC);

// Draw slices
svgSC.selectAll("path")
    .data(pieSC(dataSC))
    .enter()
    .append("path")
    .attr("d", arcSC)
    .attr("fill", d => colorSC(d.data.category))
    .attr("stroke", "white")
    .style("stroke-width", "2px")

// Add labels
svgSC.selectAll("text")
    .data(pieSC(dataSC))
    .enter()
    .append("text")
    .text(d => d.data.category)
    .attr("transform", d => `translate(${arcSC.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#fff");

// ---------Sample Dates----------

//Data
const scatterData = [
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Sister Sledge - Il Macquillage Lady", year: 1982},
    {song: "George Duke - I Love You More", year: 1979},
    {song: "Edwin Birdsong - Cola Bottle Baby", year: 1979},
    {song: "The Imperials - Can You Imagine", year: 1978},
    {song: "Barry Manilow - Who's Been Sleeping In My Bed", year: 1979},
    {song: "Tavares - Break Down For Love", year: 1980},
    {song: "Electric Light Orchestra - Evil Woman", year: 1975},
    {song: "Loggins and Jim Messina - House At Pooh Corner", year: 1970},
    {song: "The Alan Parsons Project - Old And Wise", year: 1982},
    {song: "Electric Light Orchestra - Can't Get It Out Of My Head", year: 1974},
    {song: "The Alan Parsons Project - Silence And I", year: 1982},
    {song: "Poco - Faith In The Families", year: 1974},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},
    {song: "Eddie Johns - More Spell On You", year: 1979},

]