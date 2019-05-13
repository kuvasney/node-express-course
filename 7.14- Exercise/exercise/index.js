const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then((res) => {
        console.log('Connected do MongoDB...');
    })    
    .catch(err => console.log('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        // validate: function(v) {
        //     return new Promise(function(resolve, reject) {
        //         setTimeout(function() {
        //             resolve(false);
        //         }, 5);
        //     });
        // },
        validate: {
            validator: function(v) {
                return new Promise(function(resolve, reject) {
                    resolve(v && v.length > 0)
                })
            },
            message: 'Um curso precisa ter pelo menos 1 tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { 
        type: Number,
        required: function () {
            return this.isPublished
        }
    }
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: /backend/i })
        .sort({ name: 1 })
        .select({ name: 1, author: 1, isPublished: 1 })
}

async function createCourse() {
    const course = new Course({
        // name: "Curso manero de metaleiro2",
        author: "Kuva",
        tags: [],
        isPublished: true,
        price: 1.5
    })

    try {
        const result = await course.save()
        console.log(result)
    }
    catch (exception) {
        for (field in exception.errors) {
            console.log(exception.errors[field].message)
        }
    }

    // const result = await course.save();
    // console.log('Curso criado', result)
};

async function getCoursesbyPrice() {
    return await Course
        // .find({ 'isPublished': true, 'tags':  { $in: [/backend/i, /frontend/i] }  })
        // alternativa
        .find({ 'isPublished': true })
        .or([{ tags: /frontend/i }, { tags: /backend/i }])
        .sort('-price')
        .select('name author price')
}

async function getCoursesbyPriceandName() {
    return await Course
        // .find({ 'isPublished': true, 'tags':  { $in: [/backend/i, /frontend/i] }  })
        // alternativa
        .find({ 'isPublished': true })
        .or([
            { price:{ $gte: 15 } },
            { name: /.*by*./i } 
        ])
        .sort('-price')
        .select('name author price')
}

async function updateCourseQuery (id) {
    const course = await Course.findById(id)

    if (!course) {
        console.log('Curso inexistente')
        return
    };
    course.isPublished = true;
    course.author = 'Rafael K M';

    const result = await course.save();
    console.log(result);
}

async function updateCourseUpdate (id) {
    const result = await Course.update({_id: id}, {
        $set: {
            author: "Kuva",
            isPublished: true
        }
    })
    console.log(result);
}


async function deleteCourse (id) {
    const course = await Course.findByIdAndDelete(id)

    console.log(course);
}

async function run() {
    const courses = await getCourses();
    // const courses = await getCoursesbyPriceandName();
    console.log(courses);
}



createCourse();
// run();