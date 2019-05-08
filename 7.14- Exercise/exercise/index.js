const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then((res) => {
        console.log('Connected do MongoDB...');
    })    
    .catch(err => console.log('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: /backend/i })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
}

async function getCoursesbyPrice() {
    return await Course
        // .find({ 'isPublished': true, 'tags':  { $in: [/backend/i, /frontend/i] }  })
        // alternativa
        .find({ 'isPublished': true })
        .or([{ tags: /frontend/i }, { tags: /backend/i} ])
        .sort ('-price')
        .select('name author price')
}
async function run() {
    // const courses = await getCourses();
    const courses = await getCoursesbyPrice();
    console.log(courses);
}

run();