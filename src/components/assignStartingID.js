export default class filterMemory {
  constructor() {
    this.filter = [];
  }

  add(input) {
    this.filter[0] = input;
  }

  // Convert plain JSON object back into a projectCollection instance
  static fromJSON(json) {
    const collection = new filterMemory();
    collection.projects = json.projects || [];
    return collection;
  }
}
