export default class projectCollection {
  constructor() {
    this.projects = [];
  }

  add(project) {
    this.projects.push(project);
  }

  // Convert plain JSON object back into a projectCollection instance
  static fromJSON(json) {
    const collection = new projectCollection();
    collection.projects = json.projects || [];
    return collection;
  }
}
