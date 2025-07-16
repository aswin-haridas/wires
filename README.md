# Wires - Social Network Visualization

A beautiful, interactive social network graph visualization built with React, D3.js, and Tailwind CSS.

## Features

### Visual Design

- **Notion-like minimal design** with light gray background and soft shadows
- **Circular nodes** with the first letter of each person's name
- **Color-coded relationships**:
  - 🔵 Blue = Friend
  - 🔴 Red = Family
  - 🟢 Green = Acquaintance

### Network Structure

- **2-layer depth visualization**:
  - Layer 0: You (center, dark circle)
  - Layer 1: Direct connections (light gray circles)
  - Layer 2: Friends-of-friends (slightly darker gray circles)

### Interactivity

- **Click any node** to see a minimal card with:
  - Full name
  - Relationship type
  - Network depth
- **Drag nodes** to reposition them
- **Legend** showing relationship types and network depth

### Technical Stack

- **React** with TypeScript
- **D3.js** for force-directed graph simulation
- **Tailwind CSS** for styling
- **Vite** for development and building

### Privacy

- **Local only** - all data is stored in static JSON files
- No external API calls or data transmission

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Customization

### Adding People

Edit `src/components/Graph/data.ts` to add new nodes and relationships:

```typescript
const data: GraphData = {
  nodes: [
    { id: "person_id", name: "Person Name", depth: 1 },
    // ...
  ],
  links: [
    { source: "person1", target: "person2", relationship: "friend" },
    // ...
  ],
};
```

### Relationship Types

Available relationship types:

- `friend`
- `family`
- `acquaintance`

### Depth Levels

- `depth: 0` - You (center node)
- `depth: 1` - Direct connections
- `depth: 2` - Friends-of-friends

## Project Structure

```
src/
├── components/
│   ├── Graph/
│   │   ├── SocialNetworkGraph.tsx  # Main graph component
│   │   ├── NodeCard.tsx           # Node detail card
│   │   ├── Legend.tsx             # Graph legend
│   │   └── data.ts                # Graph data
│   └── ui/
│       └── Header.tsx             # App header
├── types/
│   └── index.ts                   # TypeScript definitions
└── App.tsx                        # Main app component
```

## Development

The project uses:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
