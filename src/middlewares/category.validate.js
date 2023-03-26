const categorieValidation = async (req, res, next) => {
  const { name } = req.body;
  if (!name) { 
    console.log('categorieValidation if 1');
    return res.status(400).json({ message: '"name" is required' }); 
  }
  return next();
};

module.exports = { 
  categorieValidation,
};
