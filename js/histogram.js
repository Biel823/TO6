const drawHistogram = (data) => {

    // T06-1 Step 6.1: Create SVG
    d3.select("#histogram").selectAll("*").remove();

    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto");

    const innerChart = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    // Step 6.2: Generate bins
    const bins = binGenerator(data);

    console.log("Histogram bins:", bins);

    // Step 6.3: Calculate scales
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    // Step 6.4: Draw bars
    innerChart
        .selectAll(".histogram-bar")
        .data(bins)
        .join("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d =>
            Math.max(0, xScale(d.x1) - xScale(d.x0))
        )
        .attr("height", d =>
            innerHeight - yScale(d.length)
        )
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    // Step 6.5: Bottom X-axis
    innerChart
        .append("g")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(d3.axisBottom(xScale));

    svg
        .append("text")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // Step 6.6: Left Y-axis
    innerChart
        .append("g")
        .call(d3.axisLeft(yScale));

    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
};