import mongoose from 'mongoose';

const SampleModel = mongoose.model('SampleModel');

export default class <%= classname %> {
  static async up() {
    // Do something
  }

  static async down() {
    // Revert do something
  }
}