import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import styles from '../styles/Global.module.css';

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
  const containerRef = useRef(null);

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
    <div ref={containerRef} className={styles.graphContainer}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel="name"
        linkLabel="type"
        width={containerRef.current ? containerRef.current.clientWidth : window.innerWidth}
        height={containerRef.current ? containerRef.current.clientHeight : window.innerHeight}
      />
    </div>
  );
};

export default GraphVisualization;
