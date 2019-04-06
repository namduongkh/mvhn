import mongoose from 'mongoose';

const SampleModel = mongoose.model('SampleModel');

export default class SeedDataCategory {
  static async up() {
    // Do something
  }

  static async down() {
    // Revert do something
  }
}