export class userClass {
  id : number;
  username: string;
  email: string;
  password: string;
  roles: [];

  constructor() {
    this.id = 0;
    this.username = "";
    this.email = "";
    this.password = "";
    this.roles = [];
  }
}
