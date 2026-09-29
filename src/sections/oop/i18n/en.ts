/* en.ts — English dictionary for the OOP-in-Python section.
   SOURCE OF TRUTH for the `Dict` type: hi.ts must match this shape exactly. */

export interface Card {
  id: string;
  icon: string;
  title: string;
  oneLiner: string;
  definition: string;
  note: string;
  code: string;
  output: string;
  realLife: string;
}

export interface Dict {
  code: string; label: string; short: string; htmlLang: string;
  site: { title: string; desc: string; foot: string };
  ui: {
    backHome: string; heroA: string; heroEm: string; heroSub: string;
    introTitle: string; classObjectTitle: string; classObjectDef: string;
    definitionLabel: string; implementationLabel: string; exampleLabel: string;
    outputLabel: string; runBtn: string; runningLabel: string; runAgainBtn: string;
    resultLabel: string; errorLabel: string; loadingLabel: string; realLifeLabel: string;
    cardsTitle: string; cardsSub: string; recapTitle: string;
    recapConcept: string; recapMatlab: string; recapExample: string;
    pyodideNote: string;
  };
  classObject: { code: string; output: string };
  cards: Card[];
  recap: { concept: string; matlab: string; example: string }[];
  pet: { name: string; greeting: string; tips: string[]; runOk: string; runErr: string };
}

export const en: Dict = {
  code: 'en',
  label: 'English',
  short: 'EN',
  htmlLang: 'en',

  site: {
    title: 'OOP in Python — with Bittu',
    desc: 'Four cards, four pillars. Open one, read the idea, then run the real code yourself.',
    foot: 'Every "Run" button on this page executes real Python in your browser — nothing is pre-recorded.',
  },

  ui: {
    backHome: '← all sections',
    heroA: 'Object-Oriented Programming,',
    heroEm: 'one card at a time',
    heroSub: 'OOP is a way of writing code that models real-world things as Classes and Objects. A Class is a blueprint — like a blank admission form. An Object is what you get once that form is filled in for one actual person: Rahul, Priya, whoever. Everything below builds on that one idea.',
    introTitle: 'Class & Object',
    classObjectTitle: 'The blueprint and the actual thing',
    classObjectDef: 'A Class is a design — it says what every object of this kind will have (fields) and what it can do (methods). An Object is one real instance made from that design. One class, many objects: every Student uses the same blueprint, but Rahul and Priya carry their own name, age and marks.',
    definitionLabel: 'Definition',
    implementationLabel: 'How it works',
    exampleLabel: 'Example',
    outputLabel: 'Output',
    runBtn: '▶ Run this code',
    runningLabel: 'Running…',
    runAgainBtn: '↻ Run again',
    resultLabel: 'Your output',
    errorLabel: 'Python raised an error',
    loadingLabel: 'Starting the Python engine (first run only, ~2 MB)…',
    realLifeLabel: 'Real-life example',
    cardsTitle: 'The four pillars',
    cardsSub: 'Click a card to open it — full definition, how it works, a runnable example, and a "Real-life example" for the recap.',
    recapTitle: 'Quick recap',
    recapConcept: 'Concept', recapMatlab: 'In plain words', recapExample: 'Real-life example',
    pyodideNote: 'Powered by Pyodide — a real CPython interpreter compiled to WebAssembly. Your code runs on your machine, not on a server.',
  },

  classObject: {
    code: `class Student:
    def __init__(self, name, age, marks):
        self.name = name
        self.age = age
        self.marks = marks

    def show_details(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Marks: {self.marks}")
        print("-" * 20)

# Making objects
s1 = Student("Rahul", 20, 85)
s2 = Student("Priya", 19, 92)

s1.show_details()
s2.show_details()`,
    output: `Name: Rahul
Age: 20
Marks: 85
--------------------
Name: Priya
Age: 19
Marks: 92
--------------------`,
  },

  cards: [
    {
      id: 'encapsulation',
      icon: '🔒',
      title: 'Encapsulation',
      oneLiner: 'Bundle data with its methods, and hide what should not be touched from outside.',
      definition: 'Encapsulation means packing data and the methods that work on that data into one unit — the class — and marking sensitive data private so it cannot be changed carelessly from outside the class.',
      note: 'In Python, a name prefixed with two underscores (like __balance) gets "name-mangled" so it is not directly reachable as obj.__balance from outside the class. The class instead exposes controlled methods — deposit(), withdraw(), get_balance() — that validate every change before it happens. That validation is the entire point: the class decides what counts as a legal balance, not the caller.',
      code: `class BankAccount:
    def __init__(self, name, balance):
        self.name = name
        self.__balance = balance          # Private variable

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"₹{amount} deposited")
        else:
            print("Invalid amount")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"₹{amount} withdrawn")
        else:
            print("Insufficient balance or invalid amount")

    def get_balance(self):
        return self.__balance

acc = BankAccount("Amit", 5000)
acc.deposit(2000)
acc.withdraw(1500)
print("Current Balance:", acc.get_balance())

# print(acc.__balance)   # Would raise AttributeError — it is private`,
      output: `₹2000 deposited
₹1500 withdrawn
Current Balance: 5500`,
      realLife: 'A bank balance is private — you can deposit or withdraw through the counter, but you cannot reach into the vault yourself.',
    },
    {
      id: 'inheritance',
      icon: '🧬',
      title: 'Inheritance',
      oneLiner: 'One class picks up the properties and methods of another, then adds its own.',
      definition: 'Inheritance lets a class (the child) reuse the fields and methods of another class (the parent), instead of rewriting them. The child can also add new behaviour or override what it inherited.',
      note: 'class Car(Vehicle) makes Car a child of Vehicle. super().__init__(...) calls the parent\'s constructor first, so brand and model get set up exactly once, in one place. Car and Bike then each add their own field (seats, cc) and their own show_info() — the shared start() method never needs to be written twice.',
      code: `class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def start(self):
        print(f"{self.brand} {self.model} has started")

class Car(Vehicle):          # Inheritance
    def __init__(self, brand, model, seats):
        super().__init__(brand, model)   # Call the parent's constructor
        self.seats = seats

    def show_info(self):
        print(f"Car: {self.brand} {self.model}, Seats: {self.seats}")

class Bike(Vehicle):
    def __init__(self, brand, model, cc):
        super().__init__(brand, model)
        self.cc = cc

    def show_info(self):
        print(f"Bike: {self.brand} {self.model}, CC: {self.cc}")

c1 = Car("Toyota", "Innova", 7)
b1 = Bike("Royal Enfield", "Classic 350", 350)

c1.start()
c1.show_info()

b1.start()
b1.show_info()`,
      output: `Toyota Innova has started
Car: Toyota Innova, Seats: 7
Royal Enfield Classic 350 has started
Bike: Royal Enfield Classic 350, CC: 350`,
      realLife: 'A Car is a Vehicle — it gets "start the engine" for free, and only adds what makes it specifically a car.',
    },
    {
      id: 'polymorphism',
      icon: '🎭',
      title: 'Polymorphism',
      oneLiner: 'Same method name, different behaviour depending on which class the object belongs to.',
      definition: 'Polymorphism ("many forms") means the same method call can behave differently depending on the actual object it is called on — even though the calling code never checks which class it is.',
      note: 'Dog, Cat and Cow each override speak() from Animal with their own version. The for-loop below never asks "is this a Dog or a Cat?" — it just calls animal.speak() on whatever is in the list, and the correct version runs automatically. That is what lets you add a new animal class later without touching this loop at all.',
      code: `class Animal:
    def speak(self):
        print("The animal makes a sound")

class Dog(Animal):
    def speak(self):
        print("Dog -> Woof Woof")

class Cat(Animal):
    def speak(self):
        print("Cat -> Meow Meow")

class Cow(Animal):
    def speak(self):
        print("Cow -> Moo Moo")

# Polymorphism in action
animals = [Dog(), Cat(), Cow()]

for animal in animals:
    animal.speak()`,
      output: `Dog -> Woof Woof
Cat -> Meow Meow
Cow -> Moo Moo`,
      realLife: 'Every animal "speaks", but a dog barks and a cow moos — same word, different result, and you never had to ask which animal it was first.',
    },
    {
      id: 'abstraction',
      icon: '🎯',
      title: 'Abstraction',
      oneLiner: 'Hide the unnecessary detail. Show only what the user of the class actually needs.',
      definition: 'Abstraction means exposing only the essential operations of something, and hiding how those operations are actually implemented. The caller knows what a shape can do (area, perimeter) without needing to know how each shape computes it.',
      note: 'Shape is declared with ABC and @abstractmethod, so it can never be instantiated directly — Shape() would fail on purpose. It only defines the contract: every subclass MUST implement area() and perimeter(). Rectangle and Circle each fill in that contract their own way, and the caller treats both identically.',
      code: `from abc import ABC, abstractmethod

class Shape(ABC):                    # Abstract class
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width

    def perimeter(self):
        return 2 * (self.length + self.width)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius

    def perimeter(self):
        return 2 * 3.14 * self.radius

r = Rectangle(10, 5)
c = Circle(7)

print("Rectangle Area:", r.area())
print("Rectangle Perimeter:", r.perimeter())
print("Circle Area:", c.area())
print("Circle Perimeter:", c.perimeter())`,
      output: `Rectangle Area: 50
Rectangle Perimeter: 30
Circle Area: 153.86
Circle Perimeter: 43.96`,
      realLife: 'You press the accelerator, not the fuel-injection sequence — the pedal is the abstraction, the engine hides the detail.',
    },
  ],

  recap: [
    { concept: 'Class & Object', matlab: 'A blueprint, and the real thing made from it', example: 'A student form, and Rahul' },
    { concept: 'Encapsulation', matlab: 'Protect the data', example: 'A bank balance kept private' },
    { concept: 'Inheritance', matlab: 'Reuse another class\'s properties', example: 'A Car is a Vehicle' },
    { concept: 'Polymorphism', matlab: 'Same method, different behaviour', example: 'Different animals speak differently' },
    { concept: 'Abstraction', matlab: 'Hide the detail', example: 'A Shape → just ask for its area' },
  ],

  pet: {
    name: 'Classy — tap me to explain this concept',
    greeting: 'Hi, I am Classy. Open a card and I will explain what it means. Press Run and I will tell you what happened.',
    tips: [
      'A Class is a blueprint. An Object is the real thing made from it — nothing runs until you make one.',
      'If a variable starts with __, it is private by convention — Python just renames it so a plain obj.__x cannot reach it by accident.',
      'super().__init__(...) is how a child class asks its parent to set itself up first, before adding its own bits.',
      'Polymorphism means the caller never checks the type — it just calls the method and trusts the right version runs.',
      'An abstract class cannot be built directly. It exists only to force every subclass to keep its promise.',
    ],
    runOk: 'That ran clean — the output above is exactly what your machine produced, not a canned transcript.',
    runErr: 'Python raised an error — read the last line of the traceback first, that is usually where the real reason is.',
  },
};
