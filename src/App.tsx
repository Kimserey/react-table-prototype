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
    
    columnBody = (
      field: string,
      node: TreeNode,
      action?: { label: string, onClick: () => void }
    ) => {
      if (!!node.data.edit) {
        return (
          <div>
            <InputText 
              value={node.data[field]} 
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
      }

      return (<div>{node.data[field]}</div>);
    };

    onSelectionChange = (e: { originalEvent: Event, value: any }) => {
      this.props.store.enterEditMode(e.value);
    };

    render() {
      return (
        <React.Fragment>

          <TreeTable metaKeySelection={false} value={[this.props.store.data.root]} selectionMode="single" onSelectionChange={this.onSelectionChange}>
            <Column field="name" header="Name" expander></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("monday", node)}
              field="monday"
              header="Mon"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("tuesday", node, { label: 'Cancel', onClick: () => { console.log('cancel') } })}
              field="tuesday"
              header="Tues"></Column>
            <Column
              body={(node: TreeNode) => this.columnBody("wednesday", node, { label: 'Save', onClick: () => { console.log('save') } })}
              field="wednesday"
              header="Wed"></Column>
          </TreeTable>

          <br />
          <hr />
          <br />

          <ReactJson src={this.props.store.data.root} theme="monokai" />

        </React.Fragment>
      );
    }
  }
);

export default App;