'use client';

import { Button, DatePicker, Input, AutoComplete } from 'antd';
import React, { useState } from 'react';
import { IoNavigate } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { stations } from './stationData';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPopup } from '@/redux/features/applicationSlice';

const SearchContainer = () => {
    const [fromOptions, setFromStationOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);
    const [fromStation, setFromStation] = useState("");
    const [toStation, setToStation] = useState("");
    const [date, setDate] = useState(null);
    const [seats, setSeats] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSearch = (value, setOptions) => {
        const filtered = stations
            .filter(
                (station) =>
                    station.name.toLowerCase().includes(value.toLowerCase()) ||
                    station.code.toLowerCase().includes(value.toLowerCase())
            )
            .map((station) => ({ value: `${station.name} (${station.code})` }));
        setOptions(filtered); // filter the options based on the search value
    };

    const swapLocations = () =>{
        if(fromStation === "" || toStation === "") return;
        const temp = fromStation ;
        setFromStation(toStation);
        setToStation(temp); 
    }

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day'); // disable past dates
    };

    const handleSubmit = () =>{
        if(!user){
            toast.error("Please login to book ticket");
            dispatch(setShowPopup({type: "loginPopup", size: "sm" }))
            return;
        } // dont allow if user is not logged in
        if(fromStation==="" || toStation === "" || !date || !seats || seats == 0){
            const emptyField = fromStation === ""? "From station" : toStation === "" ? "To station" : !date?  "Date": "Seats";
            toast.error(`Don't leave ${emptyField} empty`)
            return;
        } // dont allow if any field is empty
        if(fromStation === toStation){
            toast.error("From and To station can't be same");
            return;
        } // dont allow if from and to station are same
        if(seats > 7){
            toast.error("You can't book more than 7 seats at a time");
            return;
        } // dont allow if seats are more than 7
        try{
            setLoading(true);
            fetch("/api/tickets/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    requiredSeats: seats,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success(data.message + "Booked Seats: " + data.bookedSeatNumbers);
                        setFromStation("");
                        setToStation("");
                        setDate(null);
                        setSeats(null); // reset the form
                        dispatch(setShowPopup({type: "bookingConfirmationPopup", size: "sm", data: data.bookedSeatNumbers}))
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }catch(err){
            toast.error(err.message);
        }
    }
    const handlePnrEnquiry = () => {
        dispatch(setShowPopup({type: "pnrEnquiryPopup", size: "sm"})) // open pnr enquiry popup
    }

    // search conatiner rendered on landing page

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
                    <DatePicker value={date} size='large' disabledDate={disablePastDates} placeholder="Journey Date" onChange={(date) => setDate(date)}/>
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
                    <Input value={seats} onChange={(e) => setSeats(e.target.value)} style={{width: "30%"}} size='large' placeholder='Seats' />
                </div>
            </div>
            <div className='search-footer'>
                <Button loading={loading} onClick={handleSubmit} size='large' type='primary'>Book</Button>
                <Button onClick={handlePnrEnquiry} size='large' type='default'>PNR Enquiry</Button>
            </div>
        </div>
    );
};

export default SearchContainer;
