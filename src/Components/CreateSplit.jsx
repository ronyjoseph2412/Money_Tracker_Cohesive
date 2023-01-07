import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown, DropdownButton, Form, InputGroup, Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import env from 'react-dotenv';
import { ViewGroup } from './ViewGroup';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
export const CreateSplit = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const [groupmembers, setGroupmembers] = useState([]);
    const [trans, settrans] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());
    const [description, setdescription] = useState('')
    const [amount, setamount] = useState(0)
    const [selected, setselected] = useState('')
    const [members, setmembers] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch((env.API_URL + 'split'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                "group_name": localStorage.getItem('groupname'),
                "expense": String(amount),
                "expense_data": [trans.length, localStorage.getItem('user'), members, selected, parseFloat(amount), description, startDate.getDate(), startDate.getMonth(), startDate.getFullYear()]
            })
        })
        const content = await response.json();
        console.log(content);
        if(content['message'] === 'Expense Added'){
            window.location.reload()
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch((env.API_URL + 'getgroupdata'), {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "group_name": localStorage.getItem('groupname')
                })
            })
            const content = await response.json();
            // console.log(content);
            setData(content)
            setGroupmembers(content.group_members)
            settrans(content.group_transcations)

        }
        fetchData()
    }, [])

    return (
        <>

            <div className='d-flex flex-column w-75 px-4'>
                <h2>{localStorage.getItem('groupname')}</h2>
                <div className='container'>
                    <div>
                        <h4>Group Expenditure</h4>
                        <div className='row'>
                            <div className='col-4 text-center'>
                                <Card>
                                    <Card.Header><h5>Expenses</h5></Card.Header>
                                    <Card.Body>
                                        ₹ {data.group_expense}
                                    </Card.Body>
                                </Card>
                            </div>
                            {/* <div className='col-4 text-center'>
                                <Card>
                                    <Card.Header><h5>Money Owed by You</h5></Card.Header>
                                    <Card.Body>
                                        Rs 2500
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='col-4 text-center'>
                                <Card>
                                    <Card.Header><h5>Money owed to you</h5></Card.Header>
                                    <Card.Body>
                                        Rs 2500
                                    </Card.Body>
                                </Card>
                            </div> */}
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h4>Group Members</h4>
                        <div className='row w-75'>
                            {
                                groupmembers.map((item) => {
                                    return (
                                        <div className='col-4'>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Button variant="outline-danger" onClick={handleShow}>
                            Add an Expense
                        </Button>
                    </div>
                    <Card className='w-75 mt-4'>
                        <Card.Header>All Transcations</Card.Header>
                        <Card.Body className='w-100'>

                            {
                                trans.map((item) => {
                                    return (
                                        <Card className='p-2 w-100 mt-2'>
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
                                                        {item[3]}
                                                    </div>
                                                    <div className='col'>
                                                        ₹ {item[4]}
                                                    </div>
                                                    <div className='col d-flex flex-row w-100'>
                                                        <ViewGroup item={item} />
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-2">
                        <label for="formGroupExampleInput" class="form-label">Amount</label>
                        <input type="text" class="form-control w-75" id="formGroupExampleInput" placeholder="Enter the Amount" value={amount} onChange={(e) => { setamount(e.target.value) }} />
                    </div>
                    <div class="mb-2">
                        <label for="formGroupExampleInput" class="form-label">Description</label>
                        <InputGroup className="mb-3">
                            <Form.Control aria-label="Text input with dropdown button" value={description} onChange={(e) => { setdescription(e.target.value) }} />

                            <DropdownButton
                                variant="outline-secondary"
                                title="Category"
                                id="input-group-dropdown-2"
                                align="end"
                            >
                                <Dropdown.Item onClick={() => { setselected('Food') }}>Food</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselected('Taxi') }}>Taxi</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselected('Groceries') }}>Groceries</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselected('Dining') }}>Dining</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselected('Weekend Getaway') }}>Weekend Getaway</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => { setselected('Other') }}>Other</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </div>
                    <label for="formGroupExampleInput" class="form-label">Members involved in Split</label>
                    <div className='row'>
                        {
                            groupmembers.map((item) => {
                                if(item === localStorage.getItem('user')){
                                    return (   
                                    <div className='col-6 mt-2 d-flex flex-row justify-content-between'>
                                        {item}
                                        <div className='' style={{ 'height': '25px', 'width': '25px', cursor: 'pointer' }} onClick={() => { setmembers([...members, [item, true]]) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>)
                                }
                                else{
                                    return (   
                                        <div className='col-6 mt-2 d-flex flex-row justify-content-between'>
                                            {item}
                                            <div className='' style={{ 'height': '25px', 'width': '25px', cursor: 'pointer' }} onClick={() => { setmembers([...members, [item, false]]) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>)
                                }
                                
                            })
                        }

                    </div>
                    <div className='mb-2 mt-3'>
                        <label for="formGroupExampleInput" class="form-label">Date</label>
                        <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Expense
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
