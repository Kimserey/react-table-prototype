import { observable, action, decorate } from "mobx";
import TreeNode from "primereact/components/treenode/TreeNode";

export class AppState {
  data: { root: TreeNode } = {
    root: {
      key: "0",
      data: {
        name: "Applications",
        edit: false,
        monday: "10",
        tuesday: "10",
        wednesday: "10",
        thursday: "10",
        friday: "10",
        tags: ["night", "morning"]
      },
      children: [
        {
          key: "0-0",
          data: {
            name: "Program Files",
            edit: false,
            monday: "10",
            tuesday: "10",
            wednesday: "10",
            thursday: "10",
            friday: "10",
            tags: ["evening", "afternoon"]
          },
          children: []
        },
        {
          key: "0-1",
          data: {
            name: "Project",
            edit: false,
            monday: "10",
            tuesday: "10",
            wednesday: "10",
            thursday: "10",
            friday: "10",
            tags: ["morning", "morning"]
          },
          children: []
        },
        {
          key: "0-2",
          data: {
            name: "Users",
            edit: false,
            monday: "10",
            tuesday: "10",
            wednesday: "10",
            thursday: "10",
            friday: "10",
            tags: ["evening", "afternoon"]
          },
          children: []
        }
      ]
    }
  };

  enterEditMode(key: string) {
    const update = (node: TreeNode): TreeNode => {
      return {
        ...node,
        data: {
          ...node.data,
          edit: node.key == key
        },
        children:
          node.children.map(update)
      }
    };

    this.data = {
      root: update(this.data.root)
    };
  }
}

decorate(AppState, {
  data: observable,
  enterEditMode: action.bound
});