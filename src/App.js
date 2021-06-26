import React, {useEffect, useState} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
const alanKey = "1f0a6146e9d24178677b2132171dd5312e956eca572e1d8b807a3e2338fdd0dc/stage";


function App() {

    const classes = useStyles();
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number }) => {
                if (command === 'newHeadlines') {
                    
                    setActiveArticle(-1);
                    setNewsArticles(articles);
                    
                  

                } else if (command === 'highlight')
                {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === "open")

                {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if (article) {
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening..')
                    }
                }
            }
       }) 
    },[])


    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://banner2.cleanpng.com/20190625/att/kisspng-newscaster-journalist-clip-art-television-17-news-anchor-male-caucasian-news-1-25x1148-5d129daf8ae2b8.7746925415615011035689.jpg" className={classes.alanLogo} alt = "News Reader"/>
            </div>
            <NewsCards articles = {newsArticles} activeArticle = {activeArticle}></NewsCards>

        </div>
    )
}

export default App
