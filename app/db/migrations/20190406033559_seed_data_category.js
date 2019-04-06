import mongoose from 'mongoose';

const Property = mongoose.model('Property');

export default class SeedDataCategory {
  static async up() {
    // Do something
    try {
      this.data().forEach(async (record) => {
        await new Property(record).save();
      })
    } catch (error) {
      console.log(error);
    }
  }

  static async down() {
    // Revert do something
    try {
      this.data().forEach(async (record) => {
        let property = await Property.findOne(record);
        await property.remove();
      })
    } catch (error) {
      console.log(error);
    }
  }

  static data() {
    return [
      {
        name: 'Điện thoại',
        type: 'category'
      },
      {
        name: 'Máy ảnh',
        type: 'category'
      },
      {
        name: 'Thiết bị điện tử',
        type: 'category'
      },
      {
        name: 'Du lịch',
        type: 'category'
      },
    ]
  }
}