"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CHART_CONFIG = {
  margin: { top: 20, right: 20, bottom: 30, left: 60 },
  tickFontSize: 14,
  tooltipFontSize: 14,
  titleClassName: "text-lg font-semibold mb-2",
  barFill: "steelblue",
  tickFormatSpec: ",d",
  tooltipNumberFormatSpec: ".0f",
};

const ExoplanetHistogram = ({
  data = [],
  width = 800,
  height = 400,
  bins = 10,
  title,
  tickFormatSpec,
  tooltipNumberFormatSpec,
  labels,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    d3.select(container).selectAll("*").remove();
    if (!data || data.length === 0) return;

    const { margin } = CHART_CONFIG;
    const isCategorical = Array.isArray(labels) && labels.length > 0;
    const extraBottom = isCategorical ? 70 : 0;
    const effectiveMargin = { ...margin, bottom: margin.bottom + extraBottom };

    const resolvedTickFormat =
      typeof tickFormatSpec === "function"
        ? tickFormatSpec
        : d3.format(tickFormatSpec ?? CHART_CONFIG.tickFormatSpec);

    const resolvedTooltipFormat =
      typeof tooltipNumberFormatSpec === "function"
        ? tooltipNumberFormatSpec
        : d3.format(tooltipNumberFormatSpec ?? CHART_CONFIG.tooltipNumberFormatSpec);

    const measuredWidth = container.clientWidth || width;
    const innerWidth = measuredWidth - effectiveMargin.left - effectiveMargin.right;
    const innerHeight = height - effectiveMargin.top - effectiveMargin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewBox", `0 0 ${measuredWidth} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const group = svg
      .append("g")
      .attr("transform", `translate(${effectiveMargin.left},${effectiveMargin.top})`);

    // Tooltip (shared)
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

    if (isCategorical) {
      // --- categorical branch ---
      const counts = new Map(labels.map((l) => [l, 0]));
      data.forEach((d) => {
        let key = typeof d === "number" ? labels[Math.floor(d)] : String(d);
        if (key && counts.has(key)) counts.set(key, counts.get(key) + 1);
      });
      const binsData = labels.map((label) => ({
        label,
        count: counts.get(label) || 0,
      }));

      const x = d3.scaleBand().domain(labels).range([0, innerWidth]).padding(0.1);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(binsData, (b) => b.count) || 1])
        .range([innerHeight, 0]);

      const bars = group
        .selectAll(".bar")
        .data(binsData)
        .join("g")
        .attr("class", "bar");

      bars
        .append("rect")
        .attr("x", (d) => x(d.label))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => innerHeight - y(d.count))
        .attr("fill", CHART_CONFIG.barFill);

      const xAxis = group
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .call((s) =>
          s
            .selectAll("text")
            .attr("font-size", CHART_CONFIG.tickFontSize)
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-25)")
        );

      group
        .append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(resolvedTickFormat))
        .call((s) => s.selectAll("text").attr("font-size", CHART_CONFIG.tickFontSize));

      // hover on bars
      bars
        .on("mousemove", (event, d) => {
          const [mx, my] = d3.pointer(event);
          tooltip
            .style("left", `${mx + margin.left + 10}px`)
            .style("top", `${my + margin.top - 10}px`)
            .style("display", "block")
            .text(`${d.label}: ${resolvedTickFormat(d.count)}`);
        })
        .on("mouseleave", () => tooltip.style("display", "none"));

      // hover on x-axis labels
      xAxis
        .selectAll("text")
        .on("mousemove", (event, label) => {
          const count = binsData.find((b) => b.label === label)?.count ?? 0;
          const [mx, my] = d3.pointer(event, container);
          tooltip
            .style("left", `${mx + margin.left + 10}px`)
            .style("top", `${my + margin.top - 10}px`)
            .style("display", "block")
            .text(`${label}: ${resolvedTickFormat(count)}`);
        })
        .on("mouseleave", () => tooltip.style("display", "none"));
    } else {
      // --- numeric branch ---
      const x = d3.scaleLinear().domain(d3.extent(data)).nice().range([0, innerWidth]);
      const histogram = d3.bin().domain(x.domain()).thresholds(bins);
      const binsData = histogram(data);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(binsData, (b) => b.length) || 1])
        .range([innerHeight, 0]);

      const bar = group.selectAll(".bar").data(binsData).join("g").attr("class", "bar");

      bar
        .append("rect")
        .attr("x", (bin) => x(bin.x0) + 1)
        .attr("y", (bin) => y(bin.length))
        .attr("width", (bin) => Math.max(0, x(bin.x1) - x(bin.x0) - 1))
        .attr("height", (bin) => innerHeight - y(bin.length))
        .attr("fill", CHART_CONFIG.barFill);

      const xAxis = group
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(Math.min(bins, 10)).tickFormat(resolvedTickFormat))
        .call((s) => s.selectAll("text").attr("font-size", CHART_CONFIG.tickFontSize));

      group
        .append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(resolvedTickFormat))
        .call((s) => s.selectAll("text").attr("font-size", CHART_CONFIG.tickFontSize));

      // hover on bars
      bar
        .on("mousemove", (event, bin) => {
          const [mx, my] = d3.pointer(event);
          tooltip
            .style("left", `${mx + margin.left + 10}px`)
            .style("top", `${my + margin.top - 10}px`)
            .style("display", "block")
            .text(
              `${resolvedTooltipFormat(bin.x0)} – ${resolvedTooltipFormat(
                bin.x1
              )}: ${resolvedTickFormat(bin.length)}`
            );
        })
        .on("mouseleave", () => tooltip.style("display", "none"));

      // hover on x-axis labels
      xAxis
        .selectAll("text")
        .on("mousemove", (event, tickValue) => {
          const bin = binsData.find((b) => b.x0 <= tickValue && tickValue < b.x1);
          if (!bin) return;
          const [mx, my] = d3.pointer(event, container);
          tooltip
            .style("left", `${mx + margin.left + 10}px`)
            .style("top", `${my + margin.top - 10}px`)
            .style("display", "block")
            .text(
              `${resolvedTooltipFormat(bin.x0)} – ${resolvedTooltipFormat(
                bin.x1
              )}: ${resolvedTickFormat(bin.length)}`
            );
        })
        .on("mouseleave", () => tooltip.style("display", "none"));
    }

    return () => d3.select(container).selectAll("*").remove();
  }, [data, width, height, bins, tickFormatSpec, tooltipNumberFormatSpec, labels]);

  return (
    <div>
      <h2 className={CHART_CONFIG.titleClassName}>{title}</h2>
      <div ref={ref} />
    </div>
  );
};

export default ExoplanetHistogram;
