export interface IEmployee {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    skills: string[];
    activeMachine: number;
}

export class Employee implements IEmployee{
    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;
    public skills: string[];
    public activeMachine: number;
    constructor(
        id: number,
        name: string,
        surname: string,
        email: string,
        password: string,
        skills: string[],
        activeMachine: number
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.skills = skills;
        this.activeMachine = activeMachine;
    }
    getSkills(): string {
        return this.skills.join(', ');
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }
    setName(name: string): void {
        this.name = name;
    }
    setSurname(surname: string): void {
        this.surname = surname;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    setPassword(password: string): void {
        this.password = password;
    }
    setSkills(skills: string[]): void {
        this.skills = skills;
    }
    setActiveMachine(activeMachine: number): void {
        this.activeMachine = activeMachine;
    }
    setID(id: number): void {
        this.id = id;
    }
}
