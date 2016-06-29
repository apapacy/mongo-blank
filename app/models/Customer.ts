import {Model, Instance, Collection, Index, Property, ObjectID, Core}  from 'iridium';

interface Colour {
  r: number;
  g: number;
  b: number;
}

interface Car {
  make: string;
  model: string;
  colour: Colour;
}

interface HouseDocument {
  _id?: string;
  name: string;

  cars?: Car[];
}

class Dummy{}


@Index({ name: 1 })
@Collection('houses')
class House extends Instance<HouseDocument, House> implements HouseDocument {
  @ObjectID _id: string;
  @Property(/^.+$/)
  name: string;

  @Property([{
    make: String,
    model: String,
    colour: {
      r: Number,
      g: Number,
      b: Number
    }
  }])
  cars: Car[];

  static onCreating(doc: HouseDocument) {
    doc.cars = doc.cars || [];
  }

  addCar(make: string, model: string, colour: Colour) {
    this.cars.push({
      make: make,
      model: model,
      colour: colour
    });
  }

  get numberOfCars() {
    return this.cars.length;
  }
}

class MyDatabase extends Core {
  Houses: Model<HouseDocument, House> = new Model<HouseDocument, House>(this, House);
}

try {
var myDb = new MyDatabase({ database: 'houses_test' });

myDb.connect().then(async function(){
  for (var i:number=Number(0); i<1000000;i++) await myDb.Houses.insert({
    name: 'My House-' + i.toString(),
    cars: [{
      make: 'Audi',
      model: 'A4',
      colour: { r: 0, g: 0, b: 0 }
    }]
})})
  .then(() => myDb.Houses.get(),err=>console.log(err))
  .then((house) => {
  house.addCar('Audi', 'S4', { r: 255, g: 255, b: 255 });
  return house.save();
})
  .then(() => myDb.close());

} catch(ex) {
console.log(ex)
}
