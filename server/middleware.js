const checkAdmin = (req, res, next) => {
    // keeping for scalability purposes, for mock site it is unnecessary middleware
    next();
};

module.exports = { checkAdmin };