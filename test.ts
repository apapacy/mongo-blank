interface Person {
    firstName: string;
    lastName: number;
}

function greeter(person: Person) {
  console.log("Hello, " + person.firstName + " " + person.lastName);
    return "Hello, " + person.firstName + " " + person.lastName;
}

var user = { firstName: "Jane", lastName: 16 };

greeter(user);
