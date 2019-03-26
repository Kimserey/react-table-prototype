import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import TreeNode from 'primereact/components/treenode/TreeNode';
import { Column } from "primereact/column";
import './App.css';

interface Week {

}

class App extends Component {

  columnBody = (node: TreeNode, action?: { label: string, onClick: () => void }) => {
    return <h1>{x.data.name}</h1>;
  };

  render() {
    return (
      <TreeTable value={data}>
        <Column field="name" header="Name" expander></Column>
        <Column field="monday" header="Mon"></Column>
        <Column field="tuesday" header="Tues"></Column>
        <Column body={(node: TreeNode) => this.columnBody(node)} field="wednesday" header="Wed"></Column>
      </TreeTable>
    );
  }
}

export default App;

const data: TreeNode[] = [
  {
    key: "0",
    data: {
      name: "Applications",
      monday: "10",
      tuesday: "10",
      wednesday: "10"
    },
    children: [
      {
        key: "0-0",
        data: {
          name: "Program Files",
          monday: "10",
          tuesday: "10",
          wednesday: "10"
        },
        children: []
      }
    ]
  }
];