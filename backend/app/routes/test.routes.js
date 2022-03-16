module.exports = app => {
    const tests = require("../controllers/test.controllers.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", tests.create);
    // Retrieve all tests
    router.get("/", tests.findAll);
    // Retrieve all published tests
    // router.get("/published", tests.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", tests.findOne);
    // Update a Tutorial with id
    router.put("/:id", tests.update);
    // Delete a Tutorial with id
    router.delete("/:id", tests.delete);
    // Delete all tests
    router.delete("/", tests.deleteAll);
    app.use('/api/test', router);
};