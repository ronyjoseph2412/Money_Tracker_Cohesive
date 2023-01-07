import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, ModalBody } from 'react-bootstrap'
import env from 'react-dotenv';

export const ViewGroup = ({ item }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePay = (arr) => {
        const pay = async () => {
            const response = await fetch((env.API_URL + 'add'), {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body:JSON.stringify({
                    "expense":arr[4] / (arr[2].length),
                    "expense_data":[
                        localStorage.getItem('groupname'),
                        parseInt(localStorage.getItem('id'))+1,
                        arr[3],
                        arr[4] / (arr[2].length),
                        arr[5],
                        arr[6],
                        arr[7],
                        arr[8]
                    ]
                })
            });
            const content = await response.json();
            if(content['message'] === 'Expense Added'){
                window.location.reload()
            }
        }
        for (let i = 0; i < arr[2].length; i++) {
            if (arr[2][i][0] === localStorage.getItem('user')) {
                if (arr[2][i][1] === true) {
                    console.log(arr[2][i])
                    window.alert('Already Paid')
                }
                else {
                    pay()
                }
            }
        }
    }
    return (
        <>
            <div className=''>
                <Button variant='danger mx-2' onClick={handleShow} size="sm">View</Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modify Transactions</Modal.Title>
                </Modal.Header>
                {
                    localStorage.getItem('user') === item[1] ? <Modal.Body>
                        <h5>Split by :- {item[1]}</h5>
                        <h6>Total Amount :- ₹ {item[4]}</h6>
                        <h6>Amount to be Paid per Head :- ₹ {item[4] / (item[2].length)}</h6>
                        <h6>Category :- {item[3]}</h6>
                        <h6>Description :- {item[5]}</h6>
                        <h6>Date :- {item[6]}/{item[7] + 1}/{item[8]}</h6>
                        <div className='row'>
                            {
                                item[2].map((item, index) => {
                                    return (
                                        <div className='col-6 my-1' key={index}>
                                            <Card>
                                                <Card.Body>
                                                    <div className='d-flex flex-row justify-content-between'>
                                                        <div>{item[0]}</div>
                                                        <div><BootstrapSwitchButton
                                                            checked={item[1]}
                                                            onlabel='Paid'
                                                            offlabel='Unpaid'
                                                            width={75}
                                                            size='sm'
                                                            style={{ 'fontSize': '10px' }}
                                                            onstyle='success'
                                                            offstyle='danger'
                                                            onChange={() => { item[1] = !(item[1]) }}
                                                        /></div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })
                            }


                        </div>

                    </Modal.Body> : <Modal.Body>
                        <h5>Split by :- {item[1]}</h5>
                        <h6>Total Amount :- ₹ {item[4]}</h6>
                        <h6>Amount to be Paid per Head :- ₹ {item[4] / (item[2].length)}</h6>
                        <h6>Category :- {item[3]}</h6>
                        <h6>Description :- {item[5]}</h6>
                        <h6>Date :- {item[6]}/{parseInt(item[7]) + 1}/{item[8]}</h6>
                        {/* {!(item[2]) ? <Button variant="outline-success" onClick={handlePay}>Pay Now</Button> : <div><Button variant="success" disabled>Paid</Button></div>} */}
                        <Button variant="outline-success" onClick={() => handlePay(item)}>Pay Now</Button>
                    </Modal.Body>
                }
                <Modal.Footer>
                    <Button variant="secondary" size='sm' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" size='sm'>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
