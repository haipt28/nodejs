const db = require("../models");
const Test = db.tests;
const Op = db.Sequelize.Op;
// Create and Save a new test
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const test = {
        name: req.body.name,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    // Save test in the database
    Test.create(test)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "loi cmnr"
            });
        });
};
// Retrieve all tests from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;
    Test.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tests."
            });
        });
};
// Find a single test with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Test.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving test with id=" + id
            });
        });
};
// Update a test by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Test.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "test was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update test with id=${id}. Maybe test was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating test with id=" + id
            });
        });
};
// Delete a test with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Test.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "test was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete test with id=${id}. Maybe test was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete test with id=" + id
            });
        });
};
// Delete all tests from the database.
exports.deleteAll = (req, res) => {
    Test.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} tests were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tests."
            });
        });
};
// Find all published tests