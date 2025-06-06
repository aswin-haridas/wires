"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ForceDirectedTree = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get dimensions of container
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      };

      // Initial size
      updateDimensions();

      // Listen for resize events
      window.addEventListener("resize", updateDimensions);

      // Cleanup
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    // Clear the SVG before redrawing
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = dimensions.width;
    const height = dimensions.height;

    // Create a container group for all elements (for zoom handling)
    const container = svg.append("g");

    // Set up the force simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3.forceLink(data.links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create SVG elements for links and nodes
    const link = container
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);

    // Add relationship labels to links
    const linkLabels = container
      .append("g")
      .selectAll("text")
      .data(data.links)
      .join("text")
      .attr("font-size", "8px")
      .attr("fill", "#666")
      .attr("text-anchor", "middle")
      .attr("dy", -5)
      .text((d) => d.relationship || "");

    const node = container
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 6)
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("fill", (d) => (d.group === "self" ? "#000" : "#fff"))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => {
        event.stopPropagation(); // Prevent click from propagating to SVG
        setSelectedNode(d);
      });

    // Add node labels
    const labels = container
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "10px")
      .attr("fill", "#333")
      .text((d) => d.id)
      .attr("transform", "translate(0,15)");

    // Setup zoom behavior
    const zoomHandler = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    // Apply zoom behavior to SVG
    svg.call(zoomHandler).on("click", () => {
      // Clear selection when clicking on empty space
      setSelectedNode(null);
    });

    // Update node, link, and label positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkLabels
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup on unmount
    return () => simulation.stop();
  }, [data, dimensions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="cursor-grab block"
      ></svg>

      {/* Floating action button to add a new node */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      {selectedNode && (
        <div className="absolute right-4 top-4 bg-white border border-gray-200 rounded-lg shadow-md p-4 max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{selectedNode.id}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="text-sm space-y-1">
            {selectedNode.group && (
              <div>
                <span className="font-medium">Group:</span> {selectedNode.group}
              </div>
            )}
            {Object.entries(selectedNode)
              .filter(
                ([key]) =>
                  ![
                    "id",
                    "group",
                    "x",
                    "y",
                    "vx",
                    "vy",
                    "fx",
                    "fy",
                    "index",
                  ].includes(key)
              )
              .map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium">{key}:</span>{" "}
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </div>
              ))}
          </div>
          {selectedNode !== data.nodes[0] && (
            <button
              className="mt-3 w-full py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add Connection
            </button>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="absolute inset-0 z-50">
          {/* Use the AddNodeModal component here */}
        </div>
      )}
    </div>
  );
};

export default ForceDirectedTree;
