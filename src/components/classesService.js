const mongoose = require('mongoose');

const url = "mongodb+srv://bao0603:NEgNtiySmDKCoHNG@cluster0.lxy7x.mongodb.net/classroom?retryWrites=true&w=majority";

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(url);
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClassesSchema = new Schema({
    className: { type: String },
});

module.exports = mongoose.model('classes', ClassesSchema);