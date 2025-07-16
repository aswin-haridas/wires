import type { GraphData } from "../../types";

const data: GraphData = {
  nodes: [
    // Self (depth 0)
    { id: "you", name: "You", depth: 0 },

    // Direct friends (depth 1)
    { id: "alice", name: "Alice Johnson", depth: 1 },
    { id: "bob", name: "Bob Smith", depth: 1 },
    { id: "carol", name: "Carol Davis", depth: 1 },
    { id: "dave", name: "Dave Wilson", depth: 1 },
    { id: "mom", name: "Mom", depth: 1 },
    { id: "sister", name: "Sarah", depth: 1 },

    // Friends of friends (depth 2)
    { id: "emma", name: "Emma Brown", depth: 2 },
    { id: "frank", name: "Frank Miller", depth: 2 },
    { id: "grace", name: "Grace Taylor", depth: 2 },
    { id: "henry", name: "Henry Clark", depth: 2 },
    { id: "ivy", name: "Ivy Anderson", depth: 2 },
    { id: "jack", name: "Jack Thompson", depth: 2 },
  ],
  links: [
    // Your direct connections
    { source: "you", target: "alice", relationship: "friend" },
    { source: "you", target: "bob", relationship: "friend" },
    { source: "you", target: "carol", relationship: "acquaintance" },
    { source: "you", target: "dave", relationship: "friend" },
    { source: "you", target: "mom", relationship: "family" },
    { source: "you", target: "sister", relationship: "family" },

    // Alice's connections (depth 2)
    { source: "alice", target: "emma", relationship: "friend" },
    { source: "alice", target: "frank", relationship: "acquaintance" },

    // Bob's connections (depth 2)
    { source: "bob", target: "grace", relationship: "friend" },
    { source: "bob", target: "henry", relationship: "friend" },

    // Carol's connections (depth 2)
    { source: "carol", target: "ivy", relationship: "acquaintance" },

    // Dave's connections (depth 2)
    { source: "dave", target: "jack", relationship: "friend" },

    // Some interconnections between depth 2 nodes
    { source: "emma", target: "grace", relationship: "friend" },
    { source: "frank", target: "henry", relationship: "acquaintance" },
  ],
};

export default data;
