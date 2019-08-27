import React from 'react';
import * as d3 from "d3";
import * as netUtils from './NetUtils'
export function NNViewer(net){
    if(!net){
        return;
    }

    // calculate number of nodes in each layer
    let netWithSizes = netUtils.calcNetSize(net);

    // construct layers


    // calculate node locations

    // create links

    // draw nodes

    // draw links
    console.log(net)
    return <h1>  </h1>
}
