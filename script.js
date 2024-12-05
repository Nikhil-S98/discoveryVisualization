// ---------Samples per song----------

// Data
const songTitles = ["One More Time", "Aerodynamic", "Digital Love", "Harder, Better, Faster, Stronger", "Crescendolls", "Nightvision", "Superheroes", "High Life", "Something About Us", "Voyager", "Veridis Quo", "Short Circuit", "Face to Face", "Too Long"];
const sampleCounts = [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 20, 3];

// Chart dimensions; SPS for samplesPerSong
const widthSPS = 1300;
const heightSPS = 500;
const marginSPS = { top: 20, right: 20, bottom: 50, left: 170 };

// Create an SVG container
const svgSPS = d3
  .select("#samplesPerSong")
  .append("svg")
  .attr("width", widthSPS + marginSPS.left + marginSPS.right)
  .attr("height", heightSPS + marginSPS.top + marginSPS.bottom)
  .append("g")
  .attr("transform", "translate(" + marginSPS.left + "," + marginSPS.top + ")")

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
const widthSC = 800;
const heightSC = 800;
const marginSC = 50;

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
    .range(["rgb(68, 31, 255)", "rgb(255, 77, 0)"]);

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
  .attr("fill", d => colorSC(d.data.category)) // Use the color scale
  .attr("stroke", "black") // Add white stroke for better contrast
  .style("stroke-width", "0px")


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
    {song: "Rockie Robbins - Nothing Like Love", year: 1981},
    {song: "Dan Fogelberg and Tim Weisberg - Twins Theme", year: 1978},
    {song: "Deborah Washington - The Letter", year: 1978},
    {song: "Dan Fogelberg and Tim Weisberg - Tell Me To My Face", year: 1978},
    {song: "Herbie Mann - Jisco Dazz", year: 1979},
    {song: "The Doobie Brothers - South City Midnight Lady", year: 1973},
    {song: "Boz Scaggs - You Got Some Imagination", year: 1980},
    {song: "Carrie Lucas - Sometimes A Love Goes Wrong", year: 1979},
    {song: "Loggins and Jim Messina - Be Free", year: 1974},
    {song: "Dan Fogelberg and Tim Weisberg - Lahaina Luna", year: 1978},
    {song: "The Doobie Brothers - It Keeps You Runnin'", year: 1976},
    {song: "Steppenwolf - Everbody's Next One", year: 1968},
    {song: "Firefall - Body And Soul", year: 1982},
    {song: "Dave Mason - All Along The Watchtower", year: 1974},
    {song: "Rose Royce - First Come, First Serve", year: 1978},
    {song: "Maze ft. Frankie Beverly - Running Away", year: 1981},
    {song: "Third World - One Cold Vibe (Couldn't Stop Dis Ya Boogie)", year: 1978}
]

// Dimensions
const widthSD = 900;
const heightSD = 600;
const marginSD = { top: 20, right: 20, bottom: 80, left: 300 };

// Append SVG
const svgSD = d3.select('#sampleDates')
    .append("svg")
    .attr("width", widthSD + marginSD.left + marginSD.right)
    .attr("height", heightSD + marginSD.top + marginSD.bottom)
    .append("g")
    .attr("transform", `translate(${marginSD.left}, ${marginSD.top})`);

// Scales
const xScaleSD = d3.scaleLinear()
    .domain(d3.extent(scatterData, d => d.year))
    .range([0, widthSD])
    .nice();

const yScaleSD = d3
    .scaleBand()
    .domain(scatterData.map(d => d.song)) // Unique song titles
    .range([0, heightSD])
    .padding(0.1);

// add x-axis
svgSD.append("g")
    .attr("transform", `translate(0, ${heightSD})`)
    .call(d3.axisBottom(xScaleSD).tickFormat(d3.format("d")))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

// Add y-axis
svgSD.append("g")
    .call(d3.axisLeft(yScaleSD))
    .selectAll("text")
    .style("font-size", "10px");

// add points
svgSD.selectAll("circle")
    .data(scatterData)
    .enter()
    .append("circle")
    .attr("cx", d => xScaleSD(d.year)) // Position based on year
    .attr("cy", d => yScaleSD(d.song) + yScaleSD.bandwidth() / 2) // Position based on song
    .attr("r", 6) // Point size
    .attr("fill", "#3498db");

svgSD.append("text")
    .attr("x", -heightSD / 2)
    .attr("y", -marginSD.left + 20)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Sampled Song");

// ---------Face to Face Chart----------
  
// data for "Face to Face" Samples
const faceToFaceData = [
    { sample: "Electric Light Orchestra - Evil Woman", year: 1975 },
    { sample: "Loggins and Jim Messina - House At Pooh Corner", year: 1970 },
    { sample: "The Alan Parsons Project - Old And Wise", year: 1982 },
    { sample: "Electric Light Orchestra - Can't Get It Out Of My Head", year: 1974 },
    { sample: "The Alan Parsons Project - Silence And I", year: 1982 },
    { sample: "Poco - Faith In The Families", year: 1974 },
    { sample: "Rockie Robbins - Nothing Like Love", year: 1981 },
    { sample: "Dan Fogelberg and Tim Weisberg - Twins Theme", year: 1978 },
    { sample: "Deborah Washington - The Letter", year: 1978 },
    { sample: "Dan Fogelberg and Tim Weisberg - Tell Me To My Face", year: 1978 },
    { sample: "Herbie Mann - Jisco Dazz", year: 1979 },
    { sample: "The Doobie Brothers - South City Midnight Lady", year: 1973 },
    { sample: "Boz Scaggs - You Got Some Imagination", year: 1980 },
    { sample: "Carrie Lucas - Sometimes A Love Goes Wrong", year: 1979 },
    { sample: "Loggins and Jim Messina - Be Free", year: 1974 },
    { sample: "Dan Fogelberg and Tim Weisberg - Lahaina Luna", year: 1978 },
    { sample: "The Doobie Brothers - It Keeps You Runnin'", year: 1976 },
    { sample: "Steppenwolf - Everbody's Next One", year: 1968 },
    { sample: "Firefall - Body And Soul", year: 1982 },
    { sample: "Dave Mason - All Along The Watchtower", year: 1974 }
];

// dimensions
const widthFTF = 600;
const heightFTF = 600;
const radiusFTF = Math.min(widthFTF, heightFTF) / 2 - 50;

// append SVG
const svgFTF = d3
    .select("#faceToFaceChart")
    .append("svg")
    .attr("width", widthFTF)
    .attr("height", heightFTF)
    .append("g")
    .attr("transform", `translate(${widthFTF / 2}, ${heightFTF / 2})`);

// create color scale for samples
const colorFTF = d3.scaleOrdinal(d3.schemeCategory10);

// add central node for "Face to Face"
svgFTF
    .append("circle")
    .attr("r", 50)
    .attr("fill", "#3498db");

// add label for central node
svgFTF
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", 5)
    .style("font-size", "14px")
    .style("fill", "white")
    .text("Face to Face");

// create tooltip container
const tooltip = d3.select("#faceToFaceChart")
    .append("div")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("padding", "5px 10px")
    .style("border-radius", "5px")
    .style("box-shadow", "0 2px 5px rgba(0,0,0,0.3)")
    .style("font-size", "12px")
    .style("color", "#333")
    .style("pointer-events", "none")
    .style("opacity", 0); // Hidden initially

// draw nodes and links
const angleStep = (2 * Math.PI) / faceToFaceData.length;

faceToFaceData.forEach((d, i) => {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radiusFTF;
    const y = Math.sin(angle) * radiusFTF;

    // draw lines from center to sample nodes
    svgFTF
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1);

    // draw sample nodes
    svgFTF
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 10)
        .attr("fill", colorFTF(d.sample))
        .on("mouseover", function (event) {
            tooltip
                .style("opacity", 1)
                .html(`${d.sample}<br><span style="font-size:10px;">Year: ${d.year}</span>`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 20}px`);
            d3.select(this).attr("stroke", "#000").attr("stroke-width", 2); // Highlight node
        })
        .on("mousemove", function (event) {
            tooltip
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", function () {
            tooltip.style("opacity", 0); // Hide tooltip
            d3.select(this).attr("stroke", "none"); // Remove highlight
        });
});