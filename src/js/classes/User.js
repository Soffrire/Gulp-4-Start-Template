export default class User {
	constructor(name, age) {
		this.name = name
		this.age = age
	}

	get userData() {
		return `User: name is ${this.name}, age is ${this.age}`
	}

	set userData(value) {
		this.name = value
	}
}
