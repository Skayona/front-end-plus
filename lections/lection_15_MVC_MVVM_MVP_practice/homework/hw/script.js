function TreeItem(name) {
  this.name = name;
  this.child = [];

  this.add = (item) => {
    this.child = [...this.child, item];
  }

}

let parent = new TreeItem('Parent');
let child = new TreeItem('Child');
let first = new TreeItem('First');

parent.add(first);
first.add(child);

console.log(parent);