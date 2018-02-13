const router = require('express').Router()
const moment = require('moment')

router.get('/', (req, res) => {
    const time = moment()

    res.json({
        time: time.format(),
        day: time.format('DD'),
        month: time.format('MM'),
        year: time.format('YYYY'),
        hour: time.format('hh'),
        minute: time.format('mm'),
        second: time.format('ss'),
        timezone: time.format('ZZ'),
        unixtime: time.format('X'),
        timestamp: time.format('x')
    })
})

module.exports = router
