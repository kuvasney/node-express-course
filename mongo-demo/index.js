const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected do MongoDB...'))
    .catch(err => console.log('Could not connect to mongoDB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished:  Boolean
});

const Course = mongoose.model('Courses', courseSchema);

async function createCourse () {
    const course = new Course({
        name: 'VueJs',
        author: 'Ninguem',
        tags: ['vue', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
};

async function getCourses() {
    const courses = await Course
        .find({ author: 'Ninguem' })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses)
}

// createCourse();
getCourses();