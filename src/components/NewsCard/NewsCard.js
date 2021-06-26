import React , {useState, useEffect, createRef} from 'react'
import { Card, CardActions , CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import useStyles from './styles.js'

import classNames from 'classnames';



const NewsCard = ({article : {description, publishedAt, source, title, url , urlToImage} , i, activeArticle}) => {
    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);
    
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
    

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()))
    }, []);

    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle])
        {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs])

   


    
    return (


        


        <Card ref={elRefs[i]} className = {classNames(classes.card, activeArticle === i ? classes.activeCard : null )}>
            
            <CardActionArea href={url} target = "_blank">
                <CardMedia className={ classes.media} image={ urlToImage || "data:image/jpeg;base64,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 "}/>
                <div className={ classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{ (new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{ source.name}</Typography>
                </div>

                <Typography className = {classes.title} gutterBottom variant="h5">{ title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions className={ classes.cardActions}>
                <Button size="small" color = "primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary" >{ i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
