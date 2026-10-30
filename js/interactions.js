
// T06-1 Step 7.3: Create filter buttons
const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d =>
            `filter ${d.isActive ? "active" : ""}`
        )
        .text(d => d.label)
        .on("click", (event, d) => {

            if (!d.isActive) {

                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });

                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter =>
                        filter.id === d.id
                    );

                updateHistogram(d.id, data);
            }
        });
};


// T06-1 Step 7.4: Update histogram
const updateHistogram = (filterId, data) => {

    const filteredData = filterId === "all"
        ? data
        : data.filter(d => d.screenTech === filterId);

    console.log("Selected filter:", filterId);
    console.log("Filtered TV records:", filteredData.length);

    if (filteredData.length === 0) {
        d3.select("#histogram").selectAll("*").remove();

        d3.select("#histogram")
            .append("p")
            .text("No TV records found for this screen technology.");

        return;
    }

    drawHistogram(filteredData);
};


// T06-2 Step 3.2: Create tooltip
const createTooltip = () => {

    // Append hidden tooltip group
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .attr("pointer-events", "none")
        .attr("transform", "translate(0, 500)");

    // Step 3.3: Tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#ffffff")
        .attr("stroke", "#5a3e2b")
        .attr("stroke-width", 1);

    // Step 3.4: Tooltip text
    tooltip
        .append("text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#5a3e2b");
};


// T06-2 Steps 3.5–3.7: Mouse interactions
const handleMouseEvents = () => {

    const tooltip = innerChartS.select(".tooltip");

    // Select scatterplot circles
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {

            // Display TV screen size
            tooltip
                .select("text")
                .text(`${d.screenSize} inches`);

            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            // Keep tooltip inside the chart horizontally
            const tooltipX = Math.max(
                0,
                Math.min(
                    innerWidth - tooltipWidth,
                    cx - tooltipWidth / 2
                )
            );

            // Show above the point where possible
            const tooltipY = cy >= tooltipHeight + 10
                ? cy - tooltipHeight - 10
                : cy + 10;

            tooltip
                .interrupt()
                .attr(
                    "transform",
                    `translate(${tooltipX}, ${tooltipY})`
                )
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        .on("mouseleave", () => {

            tooltip
                .interrupt()
                .transition()
                .duration(200)
                .style("opacity", 0)
                .on("end", () => {
                    tooltip.attr(
                        "transform",
                        "translate(0, 500)"
                    );
                });
        });
};