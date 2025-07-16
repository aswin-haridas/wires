import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import NodeCard from "./NodeCard";
import Legend from "./Legend";
import type { GraphData, Node, Link } from "../../types";

interface SocialNetworkGraphProps {
  data: GraphData;
}

const SocialNetworkGraph: React.FC<SocialNetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedRelationship, setSelectedRelationship] = useState<
    string | undefined
  >();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Get dimensions of container
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: containerRef.current!.clientWidth,
          height: containerRef.current!.clientHeight,
        });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height || !svgRef.current) return;

    // Clear the SVG before redrawing
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const width = dimensions.width;
    const height = dimensions.height;

    // Create a container group for all elements
    const container = svg.append("g");

    // Define color mapping for relationships
    const relationshipColors = {
      friend: "#3b82f6", // blue
      family: "#ef4444", // red
      acquaintance: "#10b981", // green
    };

    // Set up the force simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id((d) => (d as Node).id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(25));

    // Create links
    const link = container
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", (d: Link) => relationshipColors[d.relationship])
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create nodes
    const node = container
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<Element, Node>()
          .on("start", dragstarted)
          .on("drag", dragged)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .on("end", dragended) as any
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);

        // Find the relationship to this node from "you"
        const relationshipToYou = data.links.find((link) => {
          const sourceId =
            typeof link.source === "string"
              ? link.source
              : (link.source as Node).id;
          const targetId =
            typeof link.target === "string"
              ? link.target
              : (link.target as Node).id;
          return (
            (sourceId === "you" && targetId === d.id) ||
            (targetId === "you" && sourceId === d.id)
          );
        });

        setSelectedRelationship(relationshipToYou?.relationship);
      });

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", (d: Node) => (d.depth === 0 ? 24 : 20))
      .attr("fill", (d: Node) => {
        if (d.depth === 0) return "#1f2937"; // Dark gray for self
        if (d.depth === 1) return "#f9fafb"; // Light gray for direct connections
        return "#f3f4f6"; // Slightly darker gray for depth 2
      })
      .attr("stroke", (d: Node) => {
        if (d.depth === 0) return "#374151";
        return "#d1d5db";
      })
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))");

    // Add text labels (first letter of name)
    node
      .append("text")
      .text((d: Node) => d.name.charAt(0).toUpperCase())
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", (d: Node) => (d.depth === 0 ? "14px" : "12px"))
      .attr("font-weight", "bold")
      .attr("fill", (d: Node) => (d.depth === 0 ? "#ffffff" : "#374151"))
      .style("pointer-events", "none")
      .style("user-select", "none");

    // Add name labels below nodes
    node
      .append("text")
      .text((d: Node) => d.name.split(" ")[0]) // First name only
      .attr("text-anchor", "middle")
      .attr("dy", "35px")
      .attr("font-size", "11px")
      .attr("fill", "#6b7280")
      .style("pointer-events", "none")
      .style("user-select", "none");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: Link) => (d.source as Node).x!)
        .attr("y1", (d: Link) => (d.source as Node).y!)
        .attr("x2", (d: Link) => (d.target as Node).x!)
        .attr("y2", (d: Link) => (d.target as Node).y!);

      node.attr("transform", (d: Node) => `translate(${d.x},${d.y})`);
    });

    // Drag handlers
    function dragstarted(event: d3.D3DragEvent<Element, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<Element, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<Element, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Click outside to deselect
    svg.on("click", () => {
      setSelectedNode(null);
      setSelectedRelationship(undefined);
    });
  }, [data, dimensions]);

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        />
      </div>

      <Legend />

      <NodeCard
        node={selectedNode}
        relationship={selectedRelationship}
        onClose={() => {
          setSelectedNode(null);
          setSelectedRelationship(undefined);
        }}
      />
    </div>
  );
};

export default SocialNetworkGraph;
