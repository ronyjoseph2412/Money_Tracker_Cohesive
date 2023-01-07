import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown, DropdownButton, Form, InputGroup, Modal, Table } from 'react-bootstrap'
import env from 'react-dotenv';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2'
import DatePicker from "react-datepicker";
ChartJS.register(ArcElement, Tooltip, Legend);
export const Transactions = () => {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [friends, setFriends] = useState([]);
    const [food, setFood] = useState([]);
    const [taxi, setTaxi] = useState([]);
    const [Groceries, setGroceries] = useState([]);
    const [dining, setDining] = useState([]);
    const [weekend, setWeekend] = useState([]);
    const [other, setOther] = useState([]);
    // const [costs, setCosts] = useState({'Food':0,'Taxi':0,'Groceries':0,'Dining':0,'Weekend':0,'Other':0});
    const [foodcost, setFoodCost] = useState(0);
    const [taxicost, setTaxiCost] = useState(0);
    const [grocerycost, setGroceryCost] = useState(0);
    const [diningcost, setDiningCost] = useState(0);
    const [weekendcost, setWeekendCost] = useState(0);
    const [othercost, setOtherCost] = useState(0);
    const [selected, setselected] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [description, setdescription] = useState('')
    const [amount, setamount] = useState(0)
    const [id, setid] = useState(0)
    useEffect(() => {
        const fetch2 = async () => {
            const response = await fetch((env.API_URL + 'trans'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });
            const content = await response.json();
            // console.log(content);
            setUser(content.user_info);
            setFriends(content.user_info.transactions);
            setid(content.user_info.transactions.length)
            let x = 0;
            let y = 0;
            let temp_food = content.user_info.transactions.filter((item) => {

                if (item[2] === 'Food') {
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;
            });
            setFoodCost(x)
            // setCosts({...costs,'Food':x})
            temp_food = temp_food.filter(el => { return el !== 0 });
            let temp_taxi = content.user_info.transactions.filter((item) => {

                if (item[2] === 'Taxi') {
                    y = y + parseFloat(item[3])
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;
            });
            // setCosts({...costs,'Taxi':y})
            setTaxiCost(y)
            y = 0
            temp_taxi = temp_taxi.filter(el => { return el !== 0 });
            let temp_grocery = content.user_info.transactions.filter((item) => {

                if (item[2] === 'Groceries') {
                    y = y + parseFloat(item[3])
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;
            });
            setGroceryCost(y)
            // setCosts({...costs,'Groceries':y})
            y = 0
            temp_grocery = temp_grocery.filter(el => { return el !== 0 });
            let temp_dining = content.user_info.transactions.filter((item) => {

                if (item[2] === 'Dining') {
                    y = y + parseFloat(item[3])
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;
            });
            // setCosts({...costs,'Dining':y})
            setDiningCost(y)
            y = 0
            temp_dining = temp_dining.filter(el => { return el !== 0 });
            let temp_weekend = content.user_info.transactions.filter((item) => {
                if (item[2] === 'Weekend Getaway') {
                    y = y + parseFloat(item[3])
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;
            });
            // setCosts({...costs,'Weekend Getaway':y})
            setWeekendCost(y)
            y = 0
            temp_weekend = temp_weekend.filter(el => { return el !== 0 });
            let temp_other = content.user_info.transactions.filter((item) => {

                if (item[2] === 'Other') {
                    y = y + parseFloat(item[3])
                    x = x + parseFloat(item[3])
                    return (item);
                }
                return 0;

            });
            // setCosts({...costs,'Other':y})
            setOtherCost(y)
            y = 0
            temp_other = temp_other.filter(el => { return el !== 0 });
            // setCosts({...costs,'Total':x})
            setFood(temp_food);
            setTaxi(temp_taxi);
            setGroceries(temp_grocery);
            setDining(temp_dining);
            setWeekend(temp_weekend);
            setOther(temp_other);

        }
        fetch2();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch((env.API_URL + 'add'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                "expense": String(amount),
                // ["Self",3,"Taxi","550","Ola","04","01","2023"]
                "expense_data": ["Self", id + 1, selected, String(amount), description, startDate.getDate(), startDate.getMonth(), startDate.getFullYear()]
            })
        })
        const content = await response.json();
        // console.log(content);
        if (content['message'] === 'Expense Added') {
            window.location.reload();
        }
    }
    const [selectfood, setselectfood] = useState('Select Category')
    const [selecttrans, setselecttrans] = useState([])
    const deleteTrans = async (expense_data,expense) => {
        const response = await fetch((env.API_URL + 'delete'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                "expense":String(expense),
                "expense_data": expense_data
            })
        })
        const content = await response.json();
        // console.log(content);
        if (content['message'] === 'Expense Deleted') {
            window.location.reload();
        }
    }
    return (
        <>
            <div className='my-4 mx-4'>
                <div className='d-flex flex-row justify-content-between w-100'>
                    <div>
                        <h4>Expenditure Analysis</h4>
                    </div>
                    <div>
                        <Button className='btn btn-info' size='sm' onClick={handleShow}>Add Self Expense</Button>
                    </div>
                </div>
                <div className='d-flex flex-row content-justify-center mt-5'>
                    <div className='w-50 mt-2 mx-auto' style={{ 'height': '440px' }}>
                        <Pie data={{
                            labels: ['Food', 'Taxi', 'Groceries', 'Dining', 'Weekend Getaway', 'Other'],
                            datasets: [
                                {
                                    label: 'Expense',
                                    data: [foodcost, taxicost, grocerycost, diningcost, weekendcost, othercost],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }} />
                    </div>
                    <div className='w-25'>
                        <h6>Analytics</h6>
                        <Card className='w-50 mb-2'>
                            <Card.Header className='text-center'><h5>Expenses</h5></Card.Header>
                            <Card.Body className='text-center'>
                                <h6>₹ {foodcost + taxicost + grocerycost + diningcost + weekendcost + othercost}</h6>
                            </Card.Body>
                        </Card>
                        <Table className='' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Category</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Food</td>
                                    <td>{foodcost}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Taxi</td>
                                    <td>{taxicost}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Grocery</td>
                                    <td>{grocerycost}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Dining</td>
                                    <td>{diningcost}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Weekend Getaway</td>
                                    <td>{weekendcost}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Other</td>
                                    <td>{othercost}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className='mt-4'>
                    <h4>Categorical Expenses</h4>
                    <Card className='w-50 px-2 pt-2'>
                        <Dropdown className="d-inline mx-2 py-2">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                                {selectfood}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { setselectfood('Food'); setselecttrans(food) }}>Food</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselectfood('Taxi'); setselecttrans(taxi) }}>Taxi</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselectfood('Groceries'); setselecttrans(Groceries) }}>Groceries</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselectfood('Dining'); setselecttrans(dining) }}>Dining</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselectfood('Weekend Getaway'); setselecttrans(weekend) }}>Weekend Getaway</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setselectfood('Other'); setselecttrans(other) }}>Other</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <Card.Header></Card.Header> */}
                        <div className='px-2'>
                            {selecttrans.length === 0 ? <div>No Transactions</div> : <div>Last Transactions</div>}
                            {
                                selecttrans.map((item, index) => {
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
                                                        ₹ {item[3]}
                                                    </div>
                                                    <div className='col'>
                                                        {item[4]}
                                                    </div>
                                                    <div className='col'>
                                                        {item[5]}/{parseInt(item[6]) + 1}/{item[7]}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
                <Card className='w-75 mt-4'>
                    <Card.Header><h4>All Transcations</h4></Card.Header>
                    <Card.Body className='w-100'>
                        {
                            friends.map((item, index) => {
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
                                                <div className='col'>
                                                    {item[4]}
                                                </div>
                                                <div className='col'>
                                                    {item[5]}/{parseInt(item[6]) + 1}/{item[7]}
                                                </div>
                                                <div className='col'>
                                                    <Button variant="danger" onClick={() => { deleteTrans(item[1],item[3]) }}>Delete</Button>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
