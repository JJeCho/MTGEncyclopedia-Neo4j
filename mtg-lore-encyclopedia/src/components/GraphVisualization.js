import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ForceGraph3D from 'react-force-graph-3d';

const GET_GRAPH_DATA = gql`
  query GetGraphData {
    nodes {
      id
      label
    }
    links {
      source
      target
      type
    }
  }
`;

const GraphVisualization = () => {
  const { loading, error, data } = useQuery(GET_GRAPH_DATA);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (data) {
      const nodes = data.nodes.map(node => ({
        id: node.id,
        name: node.label,
      }));

      const links = data.links.map(link => ({
        source: link.source,
        target: link.target,
        type: link.type,
      }));

      setGraphData({ nodes, links });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ForceGraph3D
      graphData={graphData}
      nodeAutoColorBy="group"
      nodeLabel="name"
      linkLabel="type"
    />
  );
};

export default GraphVisualization;
