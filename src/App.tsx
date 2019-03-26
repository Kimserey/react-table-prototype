import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { TreeTable } from 'primereact/treetable';
import TreeNode from 'primereact/components/treenode/TreeNode';
import ReactJson from 'react-json-view';
import { observer } from "mobx-react";
import './App.css';
import { AppState } from './AppState';

const App = observer(
  class App extends Component<{ store: AppState }> {
    badgeList = (badges: string[]) => {
      return badges.map(badge => (<span className="badge badge-pill badge-light ml-1">{badge}</span>));
    };

    columnName = (node: TreeNode) => {
      if (!node.data.edit) {
        return (
          <React.Fragment>
            <span>{node.data.name} {this.badgeList(node.data.tags)}</span>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <span>{node.data.name} {this.badgeList(node.data.tags)}</span>
          <div style={{ height: "80px" }}></div>
        </React.Fragment>
      );
    };

    columnBody = (
      field: string,
      node: TreeNode,
      action?: { label: string, onClick: () => void }
    ) => {
      if (!node.data.edit) {
        return (<div className="text-center bg-light">{node.data[field]}</div>);
      }

      return (
        <div style={{ height: "100px" }} className="d-flex flex-column">
          <InputText
            value={node.data[field]}
            className="mb-auto"
            onChange={(e) => console.log(e)} />

          {
            !!action &&
            <Button
              className="d-block"
              label={action.label}
              onClick={action.onClick} />
          }
        </div>
      );
    };

    rowClassName(node: TreeNode) {
      return { "border border-primary bg-light": node.data.edit };
    }

    onSelectionChange = (e: { originalEvent: Event, value: any }) => {
      this.props.store.enterEditMode(e.value);
    };

    render() {
      return (
        <React.Fragment>

          <TreeTable
            metaKeySelection={false}
            value={[this.props.store.data.root]}
            selectionMode="single"
            onSelectionChange={this.onSelectionChange}
            rowClassName={this.rowClassName}
            tableStyle={{ border: "none" }}>
            <Column
              body={this.columnName}
              className="border-right-0"
              field="name"
              header="Name"
              expander></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("monday", node)}
              field="monday"
              style={{ width: "100px" }}
              className="border-left-0 border-right-0"
              header="Mon"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("tuesday", node)}
              field="tuesday"
              style={{ width: "100px" }}
              className="border-left-0 border-right-0"
              header="Tues"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("wednesday", node)}
              field="wednesday"
              style={{ width: "100px" }}
              className="border-left-0 border-right-0"
              header="Wed"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("thursday", node, { label: 'Cancel', onClick: () => { console.log('cancel') } })}
              field="thursday"
              style={{ width: "100px" }}
              className="border-left-0 border-right-0"
              header="Thurs"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("friday", node, { label: 'Save', onClick: () => { console.log('save') } })}
              field="Friday"
              style={{ width: "100px" }}
              className="border-left-0"
              header="Fri"></Column>
          </TreeTable>

          <br />

          <ReactJson src={this.props.store.data.root} theme="monokai" />

        </React.Fragment>
      );
    }
  }
);

export default App;