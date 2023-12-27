import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Fullarticle = ({article}) => {
    
  return (
    <div>
    
        <br/>
        <Container maxWidth='md'>
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
            },
        }}
        >
        <CardMedia
            component="div"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image={article.multimedia.length>0 ? 'https://nytimes.com/'+article.multimedia[0].url : 'https://via.placeholder.com/400x200'}
        />
        </Card><br/>
            <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item><h1>{article.headline.print_headline!=null?article.headline.print_headline:article.headline.main}</h1>{article.byline.original}</Item>
            {article.snippet!="" || article.abstract!=""?
            <Item><p style={{fontSize:20}}>{article.snippet!=""?article.snippet:article.abstract}</p></Item>:
            null
            }

            {article.lead_paragraph!=""?
            <><Item><p style={{fontSize:20}}>{article.lead_paragraph}</p></Item></>:
            null
            }
            <Item><Button color="success"size="small" onClick={() => window.open(article.web_url, '_blank')}>
                                Read More
                              </Button></Item>
          </Stack>
        </Box><br/>
        </Container>
    </div>
  )
}

export default Fullarticle;
