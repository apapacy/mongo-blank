'use strict';
import {Core, Model, Instance, Collection, Index, Property, ObjectID} from 'iridium';
export namespace M {
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

@Index({ name: 1 })
@Collection('houses')
export class House extends Instance<HouseDocument, House> implements HouseDocument {
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
    Houses = new Model<HouseDocument, House>(this, House);
}

var myDb = new MyDatabase({host: 'localhost', database: 'houses_test' });

myDb.connect().then(async () =>
  {
    for (var i =0; i <100000; i++)
    await myDb.Houses.insert({
        name: 'My House-' + i,
        cars: [{
            make: 'Audi',
            model: 'A4',
            colour: { r: 0, g: 0, b: 0 }
        }]
  })
},err => console.log(err))
    .then(() => myDb.Houses.get())
    .then((house) => {
        house.addCar('Audi', 'S4', { r: 255, g: 255, b: 255 });
        return house.save();
    },err => console.log(err))
    .then(() => myDb.close(),err => console.log(err))

}
