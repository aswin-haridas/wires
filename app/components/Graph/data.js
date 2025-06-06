const data = {
  nodes: [
    { id: "Alice", group: "self" },
    { id: "Bob", group: "friend" },
    { id: "Carol", group: "sister" },
    { id: "Dave", group: "father" },
  ],
  links: [
    { source: "Alice", target: "Bob", relationship: "colleague" },
    { source: "Alice", target: "Carol", relationship: "friend" },
    { source: "Alice", target: "Dave", relationship: "acquaintance" },
  ],
};

export default data;
