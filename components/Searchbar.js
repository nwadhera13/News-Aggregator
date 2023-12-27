'use client'
import '@styles/globals.css';
import { useEffect, useState } from 'react';
import Feed from './Feed';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='

const apikey='LvRfmccF5NXS8tMl2OuOmPW5TDvr0480';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const newsDesk = [
    "Adventure Sports",
    'Arts & Leisure',
    'Arts',
    'Automobiles',
    'Blogs',
    'Books',
    'Booming',
    'Business Day',
    'Business',
    'Cars',
    'Circuits',
    'Classifieds',
    'Connecticut',
    'Crosswords & Games',
    'Culture',
    'DealBook',
    'Dining',
    'Editorial',
    'Education',
    'Energy',
    'Entrepreneurs',
    'Environment',
    'Escapes',
    'Fashion & Style',
    'Fashion',
    'Favorites',
    'Financial',
    'Flight',
    'Food',
    'Foreign',
    'Generations',
    'Giving',
    'Global Home',
    'Health & Fitness',
    'Health',
    'Home & Garden',
    'Home',
    'Jobs',
    'Key',
    'Letters',
    'Long Island',
    'Magazine',
    'Market Place',
    'Media',
    "Men's Health",
    'Metro',
    'Metropolitan',
    'Movies',
    'Museums',
    'National',
    'Nesting',
    'Obits',
    'Obituaries',
    'Obituary',
    'OpEd',
    'Opinion',
    'Outlook',
    'Personal Investing',
    'Personal Tech',
    'Play',
    'Politics',
    'Regionals',
    'Retail',
    'Retirement',
    'Science',
    'Small Business',
    'Society',
    'Sports',
    'Style',
    'Sunday Business',
    'Sunday Review',
    'Sunday Styles',
    'T Magazine',
    'T Style',
    'Technology',
    'Teens',
    'Television',
    'The Arts',
    'The Business of Green',
    'The City Desk',
    'The City',
    'The Marathon',
    'The Millennium',
    'The Natural World',
    'The Upshot',
    'The Weekend',
    'The Year in Pictures',
    'Theater',
    'Then & Now',
    'Thursday Styles',
    'Times Topics',
    'Travel',
    'U.S.',
    'Universal',
    'Upshot',
    'UrbanEye',
    'Vacation',
    'Washington',
    'Wealth',
    'Weather',
    'Week in Review',
    'Week',
    'Weekend',
    'Westchester',
    'Wireless Living',
    "Women's Health",
    'Working',
    'Workplace',
    'World',
    'Your Money',
]
const Searchbar = () => {
    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState([]);
    const [textField, setTextField] = useState('');
    const [feed, setFeed] = useState([]);
    const [searched, setSearched] = useState([]);
    const [sort, setSort] = useState('');
    const [sorted, setSorted] = useState('');
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [page, setPage] = useState(0);
    const [hits, setHits] = useState(0);
    const [error, setError] = useState(false);
    const handleChange = (event) => {
      setSort((event.target.value) || '');
    };
    const handleFilterChange = (event) => {
        setFilter((event.target.value) || '');
      };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    };

    const addKeyword = (keyword) =>{
        const newWords=[...words, keyword];
        if(keyword!="")
        setWords(newWords);

        setTextField('');
    }
    const removeKeyword = (keyword) =>{
        const index = words.indexOf(keyword);
        const newWords=[...words];
        newWords.splice(index, 1);
        setWords(newWords);
    }
    const SearchKeyWords = async()=>{
        setPage(0);
        setLoading(true);
        let query='';
        words.map((word)=>{
            query=query+word.toString()+" AND ";
        })
        if(textField!=""){
            addKeyword(textField);
            query=query+textField+" AND ";
            setTextField('');
        }
        let filterText = "";
        filter.map((name)=>{
            filterText=filterText+',"'+name+'"';
        })
        const fetchURL = filter.length>0 ? `${url}${query}&sort=${sort}&fq=news_desk:(${filterText})&page=${page}&api-key=${apikey}`:`${url}${query}&sort=${sort}&page=${page}&api-key=${apikey}`;
        const response = await fetch(fetchURL);
        const data = await response.json();
        try{
            setFeed(data.response.docs);
            setHits(Math.ceil(data.response.meta.hits));
        }
        catch{
            setError(true);
            console.log("error");
            
        }
        setSearched(words);
        setFiltered(filter);
        setFilter([]);
        setSorted(sort);
        setSort('');
        setWords([]);
        setLoading(false);
    }
    const changePage = async ()=>{
        setLoading(true);
        let query='';
        searched.map((word)=>{
            query=query+word.toString()+" AND ";
        })
        let filterText = "";
        filtered.map((name)=>{
            filterText=filterText+',"'+name+'"';
        })
        const fetchURL = filtered.length>0 ? `${url}${query}&sort=${sorted}&fq=news_desk:(${filterText})&page=${page}&api-key=${apikey}`:`${url}${query}&sort=${sorted}&page=${page}&api-key=${apikey}`;
        const response = await fetch(fetchURL);
        const data = await response.json();
        try{
            setFeed(data.response.docs);
            
            setHits(Math.ceil(data.response.meta.hits));
        }
        catch{
            setError(true);
            console.log("error");
            
        }
        setFilter([]);
        setSort('');
        setWords([]);
        setLoading(false);
    }
    useEffect(()=>{
        changePage();
    }, [page])
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
    <div>
        <div className='search'>
            
        <Container maxWidth='md'>
            <header>
        <h1 className='header' style={{textAlign:'center', fontFamily:"Lobster", fontSize:50}}>
        New York Times
      </h1>
      <h1 className='header' style={{textAlign:'center', fontFamily:"Monospace", fontSize:20}}>
        AGGREGATOR
      </h1>
      </header>
        <Paper 
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter Keyword"
        value={textField}
        onChange={(e)=>setTextField(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter")
                addKeyword(textField);
            }}
        
      />
      <Button
            disabled={false}
            size="large"
            variant="elevated"
            onClick={()=>addKeyword(textField)}
            >
                Add Keyword
                </Button>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button onClick={handleClickOpen}>Sort/Filter</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Sort and Filter
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                Sort By
              <InputLabel ></InputLabel>
              <Select
                native
                defaultValue={"none"}
                value={sort}
                onChange={handleChange}
                // input={<OutlinedInput label="SortBy" id="demo-dialog-native" />}
              >
                <option value={""}>Relevance</option>
                <option value={"oldest"}>Oldest</option>
                <option value={"newest"}>Newest</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }}>
                Filters
        <InputLabel></InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={filter}
          onChange={handleFilterChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {newsDesk.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {!loading ? 
      <Button color="success" variant="outlined" startIcon={<SearchIcon />} onClick={()=>SearchKeyWords()}>
        
        </Button>
        :<Button color="success" variant="outlined" startIcon={<SearchIcon />} onClick={()=>SearchKeyWords()} disabled>
        Searching
        </Button>}
    </Paper>            
                {loading ? <LinearProgress color="success" />: null}
            <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
    {words.map((word)=>(
            <div>
            {/* {word} */}
                <Chip label={word} size="small" onDelete={()=>removeKeyword(word)} />
            </div>
        )
        )}
        </Stack><br/>
        {searched.length>0 ?
        <Paper 
      sx={{ p: '2px 4px',  alignItems: 'center' , paddingLeft:2, paddingBottom:2}}
    >
      
      <h4>Searched Keywords:&nbsp; </h4>
      <Stack direction="row" spacing={0.5} size="small" useFlexGap flexWrap="wrap">
      {searched.map((search)=>(
          <Chip label={search} variant="outlined" />
          ))}
          </Stack>
          <h4>Sorted By:&nbsp; 
          {sorted!=""?  sorted==="oldest"?<h5>Oldest</h5>:<h5>Newest</h5>:<h5>Relevance</h5>}</h4>
          <h4>Filters:&nbsp; </h4>
          {filtered.length>0?  
            <Stack direction="row" spacing={0.5} size="small" useFlexGap flexWrap="wrap">
            {filtered.map((search)=>(
                <Chip label={search} variant="outlined" />
                ))}
                </Stack>
          
          :<h5>NONE</h5>}
    </Paper>   :null 
        }
        
        </Container>
        
        </div>

        <br/>
        <Container maxWidth='md'>
    <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item><ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
        {page>0?
      <Button
        color='success'
        onClick={()=>{
            setPage(page-1);
        }}
      >Prev</Button>:
      <Button disabled>Prev</Button>
      }
      {page+1<Math.ceil(hits/10)?
      <Button 
      color='success'
      onClick={()=>{
            setPage(page+1);
        }}>Next</Button>:
        <Button disabled>Next</Button>
    }
    </ButtonGroup></Item>
            
            <Item><Typography>Page {page+1} of {Math.ceil(hits/10)}</Typography></Item>          
            
          </Stack>
        </Box>
    </Container><br/>
        {!error?<>
    <div className='feed'>
    <Feed articles={feed}/>
    </div>
    <br/>

    <Container maxWidth='md'>
    <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Item><ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
        {page>0?
      <Button
        color='success'
        onClick={()=>{
            setPage(page-1);
        }}
      >Prev</Button>:
      <Button disabled>Prev</Button>
      }
      {page+1<Math.ceil(hits/10)?
      <Button 
      color='success'
      onClick={()=>{
            setPage(page+1);
        }}>Next</Button>:
        <Button disabled>Next</Button>
    }
    </ButtonGroup></Item>
            
            <Item><Typography>Page {page+1} of {Math.ceil(hits/10)}</Typography></Item>          
            
          </Stack>
        </Box>
    </Container>
    </>
    :
    <h1 style={{textAlign:"center"}}>Too Many Requests per Second! <br/>Kindly reload the page. Sorry for the Inconvenience.</h1>
    }
    <br/>
    </div>
    </ThemeProvider>
  )
}

export default Searchbar;
