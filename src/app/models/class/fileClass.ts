export class fileClass {
  id : number;
  name: string;
  url: string;
  file: File;

  constructor() {
    this.id = 0;
    this.name = "";
    this.url = "";
    this.file = new File([],'');
  }
}
