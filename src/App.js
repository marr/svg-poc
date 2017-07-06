import React, { Component } from 'react';
import * as d3 from 'd3';

import './App.css';

const { innerWidth, innerHeight } = window;

function zoomed(d) {
  d3.select('g').attr('transform', d3.event.transform);
}

const zoom = d3.zoom()
  //.translateExtent([[0, 0], [innerWidth, innerHeight]])
  //.extent([[0, 0], [innerWidth, innerHeight]])
  .on('zoom', zoomed);

function clicked(d) {
  const { target } = d3.event;
  const { x, y, width, height } = target.getBBox();
  const testScale = Math.max(width, height);
  const widthScale = innerWidth / testScale;
  const heightScale = innerHeight / testScale;
  const scale = Math.min(widthScale, heightScale);
  const tx = -(x + width / 2) * scale + (innerWidth / 2);
  const ty = -(y + height / 2) * scale + (innerHeight / 2);
  d3.select('svg')
    .transition().call(zoom.transform, function() {
      return d3.zoomIdentity
        .translate(tx, ty)
        .scale(scale)
    });
}

const ref = node => {
  d3.select(node).call(zoom);
  d3.select('g').on('click', clicked);
};

class App extends Component {
  render() {
    return (
      <div>
        <svg ref={ref} viewBox={`0 0 ${innerWidth} ${innerHeight}`} xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="50%" cy="50%" r={50} />
            <rect x="60%" y="50%" width={80} height={80} />
          </g>
        </svg>
        <div id="cross" />
      </div>
    );
  }
}

export default App;
