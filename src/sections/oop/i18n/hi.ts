/* hi.ts — Hinglish (romanized, code-mixed) dictionary for the OOP-in-Python
   section. Must match en.ts's `Dict` shape exactly. */

import type { Dict } from './en';

export const hi: Dict = {
  code: 'hi',
  label: 'Hinglish',
  short: 'HI',
  htmlLang: 'hi',

  site: {
    title: 'OOP in Python — Bittu ke saath',
    desc: 'Chaar cards, chaar pillars. Ek kholo, idea padho, phir asli code khud chalake dekho.',
    foot: 'Is page ke har "Run" button pe real Python chalta hai aapke browser mein — kuch bhi pre-recorded nahi hai.',
  },

  ui: {
    backHome: '← saare sections',
    heroA: 'Object-Oriented Programming,',
    heroEm: 'ek card ek baar mein',
    heroSub: 'OOP ek programming style hai jisme hum real-world cheezon ko Class aur Object ke through represent karte hain. Class ek blueprint hai — jaise Student ka khaali form. Object us blueprint se bana actual cheez hai — jaise Rahul, ya Priya. Neeche sab kuch isi ek idea pe based hai.',
    introTitle: 'Class & Object',
    classObjectTitle: 'Blueprint aur asli cheez',
    classObjectDef: 'Class ek design hai — yeh batata hai ki is type ke har object ke paas kya hoga (fields) aur woh kya kar sakta hai (methods). Object us design se bana ek real instance hai. Ek class, kai objects: har Student same blueprint use karta hai, par Rahul aur Priya apna-apna naam, age aur marks carry karte hain.',
    definitionLabel: 'Definition',
    implementationLabel: 'Kaise kaam karta hai',
    exampleLabel: 'Example',
    outputLabel: 'Output',
    runBtn: '▶ Yeh code chalao',
    runningLabel: 'Chal raha hai…',
    runAgainBtn: '↻ Phir se chalao',
    resultLabel: 'Aapka output',
    errorLabel: 'Python ne error diya',
    loadingLabel: 'Python engine start ho raha hai (sirf pehli baar, ~2 MB)…',
    realLifeLabel: 'Real-life example',
    cardsTitle: 'Chaar pillars',
    cardsSub: 'Card kholne ke liye click karo — pura definition, kaise kaam karta hai, ek runnable example, aur recap ke liye ek "Real-life example".',
    recapTitle: 'Quick recap',
    recapConcept: 'Concept', recapMatlab: 'Simple matlab', recapExample: 'Real life example',
    pyodideNote: 'Pyodide se chalta hai — ek real CPython interpreter jo WebAssembly mein compile hua hai. Aapka code aapke hi machine pe chalta hai, kisi server pe nahi.',
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

# Objects banana
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
      oneLiner: 'Data aur uske methods ko ek saath band karna, aur bahar se chhedne layak cheezein hide karna.',
      definition: 'Encapsulation ka matlab hai data aur us data pe kaam karne wale methods ko ek unit — class — mein pack karna, aur sensitive data ko private mark karna taaki woh class ke bahar se carelessly change na ho sake.',
      note: 'Python mein, do underscores wala naam (jaise __balance) "name-mangled" ho jaata hai, isliye woh class ke bahar se seedha obj.__balance jaise reach nahi hota. Class iske bajaye controlled methods deta hai — deposit(), withdraw(), get_balance() — jo har change ko hone se pehle validate karte hain. Yehi poora point hai: legal balance kya hai, yeh class decide karti hai, caller nahi.',
      code: `class BankAccount:
    def __init__(self, name, balance):
        self.name = name
        self.__balance = balance          # Private variable

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"₹{amount} deposit ho gaya")
        else:
            print("Invalid amount")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"₹{amount} withdraw ho gaya")
        else:
            print("Insufficient balance ya invalid amount")

    def get_balance(self):
        return self.__balance

acc = BankAccount("Amit", 5000)
acc.deposit(2000)
acc.withdraw(1500)
print("Current Balance:", acc.get_balance())

# print(acc.__balance)   # Error aayega — private hai`,
      output: `₹2000 deposit ho gaya
₹1500 withdraw ho gaya
Current Balance: 5500`,
      realLife: 'Bank balance private hota hai — counter se deposit ya withdraw kar sakte ho, par vault mein khud haath nahi daal sakte.',
    },
    {
      id: 'inheritance',
      icon: '🧬',
      title: 'Inheritance',
      oneLiner: 'Ek class doosri class ki properties aur methods utha leti hai, phir apna kuch add karti hai.',
      definition: 'Inheritance se ek class (child) doosri class (parent) ke fields aur methods reuse kar leti hai, dobara likhna nahi padta. Child apna naya behavior bhi add kar sakta hai, ya jo inherit hua use override bhi kar sakta hai.',
      note: 'class Car(Vehicle) likhne se Car, Vehicle ka child ban jaata hai. super().__init__(...) pehle parent ka constructor call karta hai, isliye brand aur model sirf ek jagah, ek hi baar set hote hain. Car aur Bike apna-apna field (seats, cc) aur apna show_info() add karte hain — shared start() method dobara likhna hi nahi padta.',
      code: `class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def start(self):
        print(f"{self.brand} {self.model} start ho gaya")

class Car(Vehicle):          # Inheritance
    def __init__(self, brand, model, seats):
        super().__init__(brand, model)   # Parent constructor call
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
      output: `Toyota Innova start ho gaya
Car: Toyota Innova, Seats: 7
Royal Enfield Classic 350 start ho gaya
Bike: Royal Enfield Classic 350, CC: 350`,
      realLife: 'Car bhi ek Vehicle hai — "engine start karo" use free mein milta hai, sirf woh add karta hai jo use khaas car banata hai.',
    },
    {
      id: 'polymorphism',
      icon: '🎭',
      title: 'Polymorphism',
      oneLiner: 'Method ka naam same, par behavior class ke hisaab se alag-alag.',
      definition: 'Polymorphism ("kai roop") ka matlab hai same method call alag-alag object pe alag behave kar sakta hai — jabki calling code kabhi check hi nahi karta ki class kaunsi hai.',
      note: 'Dog, Cat aur Cow, Animal ke speak() ko apne-apne version se override karte hain. Neeche wala for-loop kabhi nahi poochta "yeh Dog hai ya Cat?" — woh bas list mein jo bhi hai uspe animal.speak() call karta hai, aur sahi version khud-ba-khud chal jaata hai. Isi wajah se baad mein koi nayi animal class add kar sakte ho, bina is loop ko chhue.',
      code: `class Animal:
    def speak(self):
        print("Animal bolta hai")

class Dog(Animal):
    def speak(self):
        print("Dog -> Bhau Bhau")

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
      output: `Dog -> Bhau Bhau
Cat -> Meow Meow
Cow -> Moo Moo`,
      realLife: 'Har jaanwar "bolta" hai, par kutta bhaunkta hai aur gaay ambhaati hai — same word, alag result, aur pehle yeh poochna hi nahi pada ki kaunsa jaanwar hai.',
    },
    {
      id: 'abstraction',
      icon: '🎯',
      title: 'Abstraction',
      oneLiner: 'Unnecessary detail hide karo. Sirf woh dikhao jo class use karne wale ko chahiye.',
      definition: 'Abstraction ka matlab hai kisi cheez ke sirf zaroori operations dikhana, aur woh operations actually kaise implement hote hain use hide karna. Caller ko pata hai ek shape kya kar sakta hai (area, perimeter), bina yeh jaane ki har shape use kaise calculate karti hai.',
      note: 'Shape ko ABC aur @abstractmethod se declare kiya gaya hai, isliye ise kabhi seedha instantiate nahi kar sakte — Shape() jaan-bujhkar fail hoga. Yeh sirf contract define karta hai: har subclass ko area() aur perimeter() implement karna HI padega. Rectangle aur Circle apne-apne tareeke se yeh contract fill karte hain, aur caller dono ko same tarah treat karta hai.',
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
      realLife: 'Tum accelerator dabate ho, fuel-injection sequence nahi — pedal hi abstraction hai, engine detail ko hide karta hai.',
    },
  ],

  recap: [
    { concept: 'Class & Object', matlab: 'Blueprint, aur usse bana asli cheez', example: 'Student form, aur Rahul' },
    { concept: 'Encapsulation', matlab: 'Data ko protect karna', example: 'Bank balance private rakhna' },
    { concept: 'Inheritance', matlab: 'Doosri class ki properties reuse karna', example: 'Car is a Vehicle' },
    { concept: 'Polymorphism', matlab: 'Same method, alag behavior', example: 'Alag-alag jaanwar alag bolte hain' },
    { concept: 'Abstraction', matlab: 'Detail hide karna', example: 'Shape → bas uska area maango' },
  ],

  pet: {
    name: 'Classy — mujhe tap karo, main yeh concept samjha dunga',
    greeting: 'Hi, main Classy hoon. Koi card kholo, main uska matlab samjha dunga. Run dabao, main batunga kya hua.',
    tips: [
      'Class ek blueprint hai. Object us se bana asli cheez hai — jab tak object na banao, kuch chalta hi nahi.',
      'Agar variable __ se shuru hota hai, to woh convention se private hai — Python bas uska naam badal deta hai taaki obj.__x seedha na pahunch sake.',
      'super().__init__(...) ka matlab hai child class apne parent se pehle khud ko set up karwa leti hai, phir apna kuch add karti hai.',
      'Polymorphism ka matlab hai caller kabhi type check nahi karta — bas method call karta hai aur trust karta hai ki sahi version chalega.',
      'Abstract class seedha nahi bana sakte. Yeh sirf isliye hai taaki har subclass apna promise nibhaaye.',
    ],
    runOk: 'Yeh clean chal gaya — upar wala output aapke apne machine ne banaya hai, koi canned transcript nahi hai.',
    runErr: 'Python ne error diya — pehle traceback ki last line padho, asli wajah aksar wahin milti hai.',
  },
};
