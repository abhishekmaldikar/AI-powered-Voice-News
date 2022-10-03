import React, { useEffect, useState } from 'react'
import { getNews } from '../Service/getNews'
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function NewsData() {

    const [newsData, setNewsData] = useState([]);
    const alanKey = `6952a769111adb363f6feabcd8d9737b2e956eca572e1d8b807a3e2338fdd0dc/stage`
    const [selectOption, setSelectOption] = useState('');
    const getAllNews = async () => {
        let data = await getNews(selectOption);
        setNewsData(data.data.articles);

    }

    const selectCategory = (event) => {
        setSelectOption(event.target.value);
    }

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: (commandData) => {
                setSelectOption(commandData.data)
            }
        });
    }, []);

    useEffect(() => {
        getAllNews();
    }, [selectOption])

    const theme = createTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };





    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar >
                        <Toolbar>
                            <IconButton
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />


                            </IconButton>

                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Voice News
                            </Typography>

                            <Typography variant="h7" component="div" sx={{ margin: theme.spacing(1) }}>
                                Choose:
                            </Typography>



                            <select
                                className='select-box'
                                name="category"
                                id="category"
                                onChange={selectCategory}
                                value={selectOption}
                            >
                                <option value="general">General</option>
                                <option value="health">Health</option>
                                <option value="business">Business</option>
                                <option value="sports">Sports</option>
                            </select>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <div className='main'>





                <div className='select'>
                </div>

                <div className='grid-main'>
                    {newsData.map((news) => {
                        return (
                            <div className='grid-child'>

                                <img className='news-image'
                                    src={news?.urlToImage}

                                />
                                <p className='news-title'>{news?.title}</p>
                                <p className='news-content'>{news?.content}</p>

                                <div className='space-between'>
                                    <p className='news-author'> Author: {news?.author ? news?.author : 'Author name not avaible'}</p>
                                    <p className='news-date'>Date: {moment(news?.publishedAt).format('LL')}</p>
                                </div>

                                <a href={news?.url} target='_blank'>Read More....</a>

                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
