const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[Product]
  }).then(tag => res.json(tag))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include:[Product]
  }).then(tag => res.json(tag))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(
    req.body
  ).then(tag => res.json(tag))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    req.body,{
      where: {
        id: req.params.id
      }
    }
  ).then(tag => res.json(tag))
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where:{
        id:req.params.id
      }
    })
      res.status(200)
    }catch (err) {
      res.status(500).json(err)
    }
});

module.exports = router;
