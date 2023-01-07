import React, { useEffect, useState } from 'react'
import { Card, Dropdown, DropdownButton, Form, InputGroup, Modal, Table } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import env from 'react-dotenv';
export const Section1 = () => {
    // gettrans
    const [data, setData] = useState([]);
    const [trans, settrans] = useState([])
    useEffect(() => {
        const fetch_data = async () => {
            const response = await fetch((env.API_URL + 'gettrans'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });
            const content = await response.json();
            console.log(content);
            setData(content.transactions);
        }
        fetch_data();

    }, [])
    const [select, setselect] = useState('Month')
    const [selectdata, setselectdata] = useState([])
    const handleClick = async (arr) => {
        const response = await fetch((env.API_URL + 'trans'), {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });
        const content = await response.json();
        console.log(content);
        settrans(content.user_info.transactions);
        let data = content.user_info.transactions.filter((item) => {
            if (item[6] === parseInt(arr)) {
                return (item);
            }
            return 0;
        });
        data = data.filter(el => { return el !== 0 });
        console.log(data)
        setselectdata(data)
    }


    return (
        <div className='mx-5'>
            <div class="container">
                <div class="row">
                    <div class="col-8">
                        <div className='w-100 px-1 my-5 mx-auto'>
                            <Card className='w-75'>
                                <Card.Header>Last Transcations</Card.Header>
                                <Card.Body className='w-100'>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <Card className='p-2 w-75 my-1' key={index}>
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="col">
                                                                <div style={{ 'height': '25px', 'width': '25px', 'borderRadius': '6px', 'backgroundColor': 'rgba(255,0,0,0.1)' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className='col'>
                                                                {item[2]}
                                                            </div>
                                                            <div className='col'>
                                                                ₹ {item[3]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        })
                                    }

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div class="col-sm my-5 mx-auto">
                        <Card>
                            <CardHeader>Transactions by Month</CardHeader>
                            <Card.Body>
                                <Dropdown className="d-inline mx-2 py-2">
                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                        {select}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { handleClick("0"); setselect('Jan') }}>Jan</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("1"); setselect('Feb') }}>Feb</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("2"); setselect('Mar') }}>Mar</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("3"); setselect('Apr') }}>Apr</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("4"); setselect('May') }}>May</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("5"); setselect('Jun') }}>Jun</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("6"); setselect('Jul') }}>Jul</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("7"); setselect('Aug') }}>Aug</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("8"); setselect('Sep') }}>Sep</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("9"); setselect('Oct') }}>Oct</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("10"); setselect('Nov') }}>Nov</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleClick("11"); setselect('Dec') }}>Dec</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {selectdata === [] ? <h6 className='px-2 py-1'>No Transactions</h6>:<h6 className='px-2 py-1'>Last Transactions</h6> }
                                {
                                    selectdata.map((item,index)=>{
                                        return (
                                            <Card className='p-2 w-100 my-1' key={index}>
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div style={{ 'height': '25px', 'width': '25px', 'borderRadius': '6px', 'backgroundColor': 'rgba(255,0,0,0.1)' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            {item[2]}
                                                        </div>
                                                        <div className='col'>
                                                            ₹ {item[3]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
