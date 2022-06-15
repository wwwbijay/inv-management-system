const express = require('express')
const router = express.Router()
const PasalItems = require('../model/pasal-items')
const verify = require('./verifyToken')

// Getting all
router.get('/', verify,  async (req, res) => {
  try {
    const pasal_items = await PasalItems.find()
    res.json(pasal_items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', verify,  getPasalItem, (req, res) => {
  res.json(res.pasal_item)
})

// Creating one
router.post('/create',verify, async (req, res) => {
  const pasal_item = new PasalItems({
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    type: req.body.type,
    inStock: req.body.Instock,
    stockCount: req.body.stockCount,
  })
  try {
    const newPasalItem = await pasal_item.save()
    res.status(200).json({message: 'Item Added Successfully.', data: newPasalItem })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.put('/update/:id',verify, getPasalItem, async (req, res) => {
  console.log(res.pasal_item);
  if (req.body.name != null) {
    res.pasal_item.name = req.body.name
  }
  if (req.body.price != null) {
    res.pasal_item.price = req.body.price
  }
  if (req.body.desc != null) {
    res.pasal_item.desc = req.body.desc
  }
  if (req.body.type != null) {
    res.pasal_item.type = req.body.type
  }
  if (req.body.inStock != null) {
    res.pasal_item.inStock = req.body.inStock
  }
  if (req.body.type != null) {
    res.pasal_item.stockCount = req.body.stockCount
  }

  try {
    const updatedItem = await res.pasal_item.save()
    res.json({message: 'Item Updated Successfully.', data: updatedItem })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/delete/:id',verify, getPasalItem, async (req, res) => {
  try {
    await res.pasal_item.remove()
    res.json({ message: 'Deleted Item' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPasalItem(req, res, next) {
  let pasal_item
  try {
    pasal_item = await PasalItems.findById(req.params.id)
    if (pasal_item == null) {
      return res.status(404).json({ message: 'Cannot find Items' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.pasal_item = pasal_item
  next()
}

module.exports = router