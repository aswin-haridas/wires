import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  name: string;
  depth: number; // 0 = self, 1 = direct friends, 2 = friends of friends
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  relationship: "friend" | "family" | "acquaintance";
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface NodeCardProps {
  node: Node | null;
  relationship?: string;
  onClose: () => void;
}
