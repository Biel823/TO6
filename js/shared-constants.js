// T06-1 Step 5: Dimensions and margins
const margin = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 70
};

const width = 800;
const height = 400;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Chart colours
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// T06-1: Histogram scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// T06-1 Step 6.2: Bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(20);

// T06-1 Step 7.2: Filter options
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// T06-2 Step 1.4: Scatterplot colour scale
const colorScale = d3.scaleOrdinal();

// T06-2: Shared scatterplot group
let innerChartS;

// T06-2 Step 3.3: Tooltip dimensions
const tooltipWidth = 110;
const tooltipHeight = 35;