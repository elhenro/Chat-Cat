// simple express server that exposes natural text sentiment analysis endpoint for the client
const express = require('express')
const cors = require('cors')
const natural = require('natural')

;(async () => {
    const app = express()
    const port = 3001
    app.use(cors())

    app.post('/sentiment', (req, res) => {
        // get post body text
        let text = ''
        req.on('data', chunk => {
            text += chunk.toString()
        })
        req.on('end', () => {
            const sentiment = Math.round(analyzeSentiment(text) * 100) / 100
            console.log(`${sentiment} >>> '${text}'`)
            res.send({ sentiment })
        })
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

    function analyzeSentiment(text) {
        // use natural text sentiment analysis
        const SentimentAnalyzer = new natural.SentimentAnalyzer(
            "English",
            natural.PorterStemmer,
            "afinn"
            )
        const sentiment = SentimentAnalyzer.getSentiment(text?.split(' ')) 
        return sentiment 
    }
})()