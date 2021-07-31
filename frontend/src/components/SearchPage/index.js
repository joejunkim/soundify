import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import './SearchPage.css'

function SearchPage() {
    return (
        <div id='search__container'>
            <NavigationSide />
            <div id='search__content'>
                <NavigationTop />
                HELLO THERE SEARCH PAGE
            </div>
        </div>
    )
}

export default SearchPage;
