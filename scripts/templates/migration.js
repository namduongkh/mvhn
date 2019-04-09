import mongoose from 'mongoose';

const SampleModel = mongoose.model('SampleModel');

export default class <%= classname %> {
  async up() {
    // Do something
  }

  async down() {
    // Revert do something
  }
}