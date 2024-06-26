import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const myAPIKey = MY_API_KEY;
const posterURL = "https://image.tmdb.org/t/p/w500/";
const tmdbURL = "https://api.themoviedb.org/3/movie/";
const maxID = 1307936;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/random", async (req, res) => {
    let movieNum = Math.ceil(Math.random() * maxID);
    try {
        const result = await axios.get(tmdbURL + movieNum + "?api_key=" + myAPIKey);
        console.log(result.data);
        const title = result.data.title;
        const language = result.data.spoken_languages[0]['english_name'];
        const desc = result.data.overview;
        let poster = '';
        if (result.data.poster_path === null){
            poster = "/images/Empty404.png";
        }
        else {
            poster = posterURL + result.data.poster_path;
        }
        res.render("random.ejs", {
            title: title,
            language: language,
            desc: desc,
            poster: poster
        });
    }
    catch (error) {
        console.log("Error discovered");
        console.log(error);
        res.render("random.ejs", {
            title: '',
            language: '',
            desc: 'Empty returns, please reload and try again',
            poster: "/images/Empty404.png"
        })
    }
    
})

app.get("/my-top-10", async (req, res) => {

    const leoResult = await axios.get(tmdbURL + "949229?api_key=" + myAPIKey);
    const interstellarResult = await axios.get(tmdbURL + "157336?api_key=" + myAPIKey);
    const shawshankResult = await axios.get(tmdbURL + "278?api_key=" + myAPIKey);
    const ghilliResult = await axios.get(tmdbURL + "63647?api_key=" + myAPIKey);
    const thuppakkiResult = await axios.get(tmdbURL + "143010?api_key=" + myAPIKey);
    const varisuResult = await axios.get(tmdbURL + "835017?api_key=" + myAPIKey);
    const batmanResult = await axios.get(tmdbURL + "272?api_key=" + myAPIKey);
    const darkKnightResult = await axios.get(tmdbURL + "155?api_key=" + myAPIKey);
    const darkKnightRisesResult = await axios.get(tmdbURL + "49026?api_key=" + myAPIKey);
    const godfatherResult = await axios.get(tmdbURL + "238?api_key=" + myAPIKey);

    let movieTitles = [varisuResult.data.title, godfatherResult.data.title, ghilliResult.data.title, thuppakkiResult.data.title, darkKnightRisesResult.data.title, batmanResult.data.title, shawshankResult.data.title, interstellarResult.data.title, darkKnightResult.data.title, leoResult.data.title];
    let movieLanguages = [varisuResult.data.spoken_languages[0]['english_name'], godfatherResult.data.spoken_languages[0]['english_name'], ghilliResult.data.spoken_languages[0]['english_name'], thuppakkiResult.data.spoken_languages[0]['english_name'], darkKnightRisesResult.data.spoken_languages[0]['english_name'], batmanResult.data.spoken_languages[0]['english_name'], shawshankResult.data.spoken_languages[0]['english_name'], interstellarResult.data.spoken_languages[0]['english_name'], darkKnightResult.data.spoken_languages[0]['english_name'], leoResult.data.spoken_languages[0]['english_name']];
    let movieDescription = [varisuResult.data.overview, godfatherResult.data.overview, ghilliResult.data.overview, thuppakkiResult.data.overview, darkKnightRisesResult.data.overview, batmanResult.data.overview, shawshankResult.data.overview, interstellarResult.data.overview, darkKnightResult.data.overview, leoResult.data.overview];
    let moviePoster = [varisuResult.data.poster_path, godfatherResult.data.poster_path, ghilliResult.data.poster_path, thuppakkiResult.data.poster_path, darkKnightRisesResult.data.poster_path, batmanResult.data.poster_path, shawshankResult.data.poster_path, interstellarResult.data.poster_path, darkKnightResult.data.poster_path, leoResult.data.poster_path];
    
    res.render("top10.ejs", {
        movieTitles: movieTitles,
        movieLanguages: movieLanguages,
        movieDescription: movieDescription,
        moviePoster: moviePoster,
        posterURL: posterURL
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

