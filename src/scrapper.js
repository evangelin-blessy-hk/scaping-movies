const express = require('express')
const puppeteer = require('puppeteer')
const app = express()
const fs = require('fs')
// const cors = require('cors')
const port = process.env.PORT || 3500
// const http = require('http')
const url = 'https://www.netflix.com/in/browse/genre/34399'

// app.use(cors())
let movies = []

const fetchData = async () => {
    try {
        const browser = await puppeteer.launch()
        let page = await browser.newPage()
        await page.goto(url)

        const movieData = await page.evaluate(() => {
            const moviePods = Array.from(document.querySelectorAll('li.nm-content-horizontal-row-item'))
            const data = moviePods.map((movie, i=1) => ({
                index: i + 1,
                title: movie.querySelector('.nm-collections-title-name').textContent,
                imgsrc: movie.querySelector('.nm-collections-title-img').getAttribute('src'),
                linkref: movie.querySelector('.nm-collections-link').getAttribute('href')
            }))
            return data
        })
        await browser.close()
        // console.log(movieData)

        // store the fetched data into a file
        fs.writeFile('movies.json', JSON.stringify(movieData), (err) => {
            if (err) {
                throw err
                return
            }
            console.log('Writing complete!')
        })
    } catch (err) {
        console.log(err)
    }
}

fetchData()


app.listen(port, () => console.log(`Server running on port ${port}.`))
