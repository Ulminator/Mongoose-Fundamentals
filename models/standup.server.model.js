var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
    function(val) {
        return (val.length>0 && val.toLocaleLowerCase() != 'none')
    },
    'Select a valid member name.'];

var requiredStringValidator = [
    function(val) {
        var testVal = val.trim(); //Stops having only spaces as input
        return (testVal.length > 0);
    },
    '{PATH} cannot be empty'];

var standupSchema = new Schema({
    memberName: {
        type: String,
        required: true,
        validate: memberNameValidator },
    project: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    workYesterday: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    workToday: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    impediment: {
        type: String,
        required: true,
    default: 'none' },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standup', standupSchema);

//customerSchema = new Schema({...})
//Customer = mongoose.model('Customer', customerSchema)
//customerSchema.add({...})
//DiscountedCust = mongoose.model(..., customerSchema)