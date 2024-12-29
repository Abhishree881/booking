'use client';

import { Button, DatePicker, Input, AutoComplete } from 'antd';
import React, { useState } from 'react';
import { IoNavigate } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { stations } from './stationData';
import moment from 'moment';

const SearchContainer = () => {
    const [fromOptions, setFromStationOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [date, setDate] = useState(null);

    const handleSearch = (value, setOptions) => {
        const filtered = stations
            .filter(
                (station) =>
                    station.name.toLowerCase().includes(value.toLowerCase()) ||
                    station.code.toLowerCase().includes(value.toLowerCase())
            )
            .map((station) => ({ value: `${station.name} (${station.code})` }));
        setOptions(filtered);
    };

    const swapLocations = () =>{
        if(fromStation === "" || toStation === "") return;
        const temp = fromStation ;
        setFromStation(toStation);
        setToStation(temp);
    }

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    };

    return (
        <div className='search-container'>
            <div className='search-header'>BOOK TICKET</div>
            <div className='search-input'>
                <div className='first-row'>
                    <AutoComplete
                        className='first-row-input'
                        value={fromStation}
                        size='large'
                        options={fromOptions}
                        onSearch={(value) => handleSearch(value, setFromStationOptions)}
                        placeholder='From'
                        prefix={<IoNavigate />}
                        onChange={(value) => setFromStation(value)}
                    />
                    <DatePicker size='large' disabledDate={disablePastDates} placeholder="Journey Date" onChange={(date) => setDate(date)}/>
                </div>
                <div className='swap-row'>
                    <div onClick={swapLocations} className='swap-icon'>
                        <MdOutlineSwapVert />
                    </div>
                </div>
                <div className='second-row'>
                    <AutoComplete
                        className='second-row-input'
                        value={toStation}
                        size='large'
                        options={toOptions}
                        onSearch={(value) => handleSearch(value, setToOptions)}
                        placeholder='To'
                        prefix={<MdLocationOn />}
                        onChange={(value) => setToStation(value)}
                    />
                </div>
            </div>
            <div className='search-footer'>
                <Button size='large' type='primary'>Search</Button>
                <Button size='large' type='default'>PNR Enquiry</Button>
            </div>
        </div>
    );
};

export default SearchContainer;
