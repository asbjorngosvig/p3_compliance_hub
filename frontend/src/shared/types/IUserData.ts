{/*public User(Long id, String name, String email, String password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
}*/}


export interface IUserData {
    id: number;
    name: string;
    email: string;
    role: "ADMIN"| "EMPLOYEE";
}