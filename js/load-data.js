
// Load CSV file with row conversion
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {

    // Log processed data
    console.log("TV dataset:", data);
    console.log("Total TV records:", data.length);

    // T06-1: Draw histogram
    drawHistogram(data);

    // T06-1: Create filter buttons
    populateFilters(data);

    // T06-2: Draw scatterplot
    drawScatterplot(data);

    // T06-2 Step 3: Create tooltip
    createTooltip();

    // T06-2 Step 3: Enable mouse events
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});