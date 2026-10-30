
const drawScatterplot = (data) => {

    // T06-2 Step 2.2: Set dimensions and margins
    d3.select("#scatterplot").selectAll("*").remove();

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto");

    // Create inner chart group
    innerChartS = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );

    // T06-2 Step 2.3: X and Y scales
    const xScaleS = d3.scaleLinear()
        .domain(d3.extent(data, d => d.star))
        .range([0, innerWidth]);

    const yScaleS = d3.scaleLinear()
        .domain(d3.extent(data, d => d.screenSize))
        .range([innerHeight, 0]);

    // T06-2 Step 2.4: Colours for screen technologies
    const uniqueTechs = [
        ...new Set(data.map(d => d.screenTech))
    ];

    colorScale
        .domain(uniqueTechs)
        .range(d3.schemeCategory10);

    // T06-2 Step 2.5: Draw circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.screenSize))
        .attr("r", 3)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.6);

    // T06-2 Step 2.6: Bottom X-axis
    innerChartS
        .append("g")
        .attr(
            "transform",
            `translate(0, ${innerHeight})`
        )
        .call(d3.axisBottom(xScaleS));

    svg
        .append("text")
        .text("Star Rating")
        .attr("x", width / 2)
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label");

    // Left Y-axis
    innerChartS
        .append("g")
        .call(d3.axisLeft(yScaleS));

    svg
        .append("text")
        .text("Screen Size (inches)")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label");

    // T06-2 Step 2.7: Legend
    const legend = svg.append("g")
        .attr(
            "transform",
            `translate(${width - margin.right - 110}, ${margin.top})`
        );

    const legendItems = legend
        .selectAll(".legend-item")
        .data(uniqueTechs)
        .join("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) =>
            `translate(0, ${i * 25})`
        );

    legendItems
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 6)
        .attr("fill", d => colorScale(d));

    legendItems
        .append("text")
        .attr("x", 12)
        .attr("y", 4)
        .text(d => d)
        .attr("font-size", "12px")
        .attr("fill", "#5a3e2b");
};