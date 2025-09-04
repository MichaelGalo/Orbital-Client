"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// Editable chart variables
const CHART_CONFIG = {
    margin: { top: 20, right: 20, bottom: 30, left: 40 },
    tickFontSize: 14, // px for axis tick labels
    tooltipFontSize: 14, // px for tooltip text
    titleClassName: "text-lg font-semibold mb-2", // Tailwind class for title
    barFill: "steelblue", // bar color
};

const ExoplanetHistogram = ({ data = [], width = 800, height = 400, bins = 10, title }) => {
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        if (!data || data.length === 0) {
            return;
        }

        const margin = CHART_CONFIG.margin;

        // measure available width from the container so the chart can be responsive
        const measuredWidth = container.clientWidth || width;
        const innerWidth = measuredWidth - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3
            .select(container)
            .append("svg")
            // let the SVG scale to the container width while keeping the viewBox for correct drawing
            .attr("width", "100%")
            .attr("height", height)
            .attr("viewBox", `0 0 ${measuredWidth} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        const group = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // x scale
        const x = d3.scaleLinear().domain(d3.extent(data)).nice().range([0, innerWidth]);

        // bin the data
        const histogram = d3
            .bin()
            .domain(x.domain())
            .thresholds(bins);

        const binsData = histogram(data);

        // y scale
        const y = d3.scaleLinear().domain([0, d3.max(binsData, (bin) => bin.length) || 1]).range([innerHeight, 0]);

        // bars
        const bar = group.selectAll(".bar").data(binsData).join("g").attr("class", "bar");

        bar
            .append("rect")
            .attr("x", (bin) => x(bin.x0) + 1)
            .attr("y", (bin) => y(bin.length))
            .attr("width", (bin) => Math.max(0, x(bin.x1) - x(bin.x0) - 1))
            .attr("height", (bin) => innerHeight - y(bin.length))
            .attr("fill", CHART_CONFIG.barFill);

        // x axis
        group
            .append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x).ticks(Math.min(bins, 10)))
            .call((selection) => selection.selectAll("text").attr("font-size", CHART_CONFIG.tickFontSize));

        // y axis
        group.append("g").call(d3.axisLeft(y).ticks(5)).call((selection) => selection.selectAll("text").attr("font-size", CHART_CONFIG.tickFontSize));

        const tooltip = d3
            .select(container)
            .style("position", "relative")
            .append("div")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("background", "rgba(0,0,0,0.7)")
            .style("color", "#fff")
            .style("padding", "6px 8px")
            .style("border-radius", "4px")
            .style("font-size", `${CHART_CONFIG.tooltipFontSize}px`)
            .style("display", "none");

        bar
            .on("mousemove", (event, bin) => {
                const [mx, my] = d3.pointer(event);
                tooltip
                    .style("left", `${mx + margin.left + 10}px`)
                    .style("top", `${my + margin.top - 10}px`)
                    .style("display", "block")
                    .text(`${bin.x0.toFixed(2)} – ${bin.x1.toFixed(2)}: ${bin.length}`);
            })
            .on("mouseleave", () => tooltip.style("display", "none"));

        return () => {
            d3.select(container).selectAll("*").remove();
        };
    }, [data, width, height, bins]);

    return (
        <div>
            <h2 className={CHART_CONFIG.titleClassName}>{title}</h2>
            <div ref={ref} />
        </div>
    );
};

export default ExoplanetHistogram;