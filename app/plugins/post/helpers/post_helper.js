export default {
  async tags() {
    const Property = mongoose.model('Property');
    return await Property.find({ type: 'tag' }).sort('-createdAt').lean();
  }
}