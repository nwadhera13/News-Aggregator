import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Backdrop from '@mui/material/Backdrop';
import Fullarticle from './Fullarticle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from "date-fns/fp";
import Chip from '@mui/material/Chip';
import Slide from '@mui/material/Slide';

import IconButton from '@mui/material/IconButton';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const Feed = ({articles}) => {
    const [currArticle, setCurrArticle] = useState(null);
    const [open, setOpen] = useState(false);

  const handleClickOpen = (article) => {
    setOpen(true);
    setCurrArticle(article);
    console.log(currArticle);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
                <main sx={{
                    backgroundColor: '#202020',
                    py: 8,
                    transition: 'background-color 0.3s',
                  }}>
                  <Container maxWidth="">
                    <Grid container spacing={2}>
                      {articles.map((article, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              backgroundColor: '#333',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#555',
                                transform: 'scale(1.05)',
                              },
                              transition: 'background-color 0.3s, transform 0.3s',
                              cursor: 'pointer',
                            }}
                            onClick={()=>handleClickOpen(article)}
                          >
                            <CardMedia
                              component="div"
                              sx={{
                                // 16:9
                                pt: '56.25%',
                              }}
                              image={article.multimedia.length>0 ? 'https://nytimes.com/'+article.multimedia[0].url : 'https://via.placeholder.com/400x200'}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography gutterBottom variant="h5" component="h2">
                                {article.headline.main || 'Title'}
                              </Typography>
                              <Typography>
                                {article.abstract ||
                                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button color="success"size="small" onClick={() => window.open(article.web_url, '_blank')}>
                                Open Link
                              </Button>
                              <Chip label={article.news_desk} variant="outlined" />
                              <Typography>
                                {article.pub_date.slice(0,10)}
                              </Typography>
                            </CardActions>
                          </Card>
                        
                        </Grid>
                      ))}
                      <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        scroll='paper'
                        TransitionComponent={Transition}
                    >
                        
                        <AppBar position='sticky' sx={{ position: 'relative' }} color='success'>
                        <Toolbar>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {currArticle!=null ? currArticle.headline.main:"TITLE"}
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                            </Button>
                        </Toolbar>
                        </AppBar>
                        <div className='main'>
          <div className='gradient' />
        </div>
                        <Fullarticle article={currArticle}/>
                        
                    </Dialog>
                    </Grid>
                  </Container>
                </main>
    </div>
  )
}

export default Feed;
