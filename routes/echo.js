const router = require('express').Router()

router.get('/', (req, res) => res.json(req.query))
router.delete('/', (req, res) => res.json(req.query))
router.put('/', (req, res) => res.json(req.body))
router.post('/', (req, res) => res.json(req.body))
router.patch('/', (req, res) => res.json(req.body))

module.exports = router
