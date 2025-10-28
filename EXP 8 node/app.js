const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Form Page
app.get('/', (req, res) => {
  res.send(`
    <h2>Student Information Form</h2>
    <form action="/submit" method="POST">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" required><br>

      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email" required><br>

      <label for="course">Course:</label><br>
      <input type="text" id="course" name="course" required><br>

      <label for="year">Year:</label><br>
      <input type="text" id="year" name="year" required><br><br>

      <input type="submit" value="Submit">
    </form>
  `);
});

// Form submission
app.post('/submit', (req, res) => {
  const { name, email, course, year } = req.body;

  processStudentData(name, email, course, year, (err, result) => {
    if (err) {
      return res.status(500).send('An error occurred. Please try again.');
    }

    res.send(`
      <h2>Thank you, ${result.name}!</h2>
      <p>Your information has been received:</p>
      <ul>
        <li><strong>Email:</strong> ${result.email}</li>
        <li><strong>Course:</strong> ${result.course}</li>
        <li><strong>Year:</strong> ${result.year}</li>
      </ul>
      <a href="/">Go Back</a>
    `);
  });
});

// Simulate processing
function processStudentData(name, email, course, year, callback) {
  console.log("Processing student data...");
  setTimeout(() => {
    if (!name || !email || !course || !year) {
      callback(new Error('Invalid form data'));
    } else {
      callback(null, { name, email, course, year });
    }
  }, 2000);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
