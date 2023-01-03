
const validatorHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);

    if (error) {
       res.status(400).json({
            status: 'error',
            message: "Invalid login"
        });
        return;
    }
    next();
};

module.exports = validatorHandler;