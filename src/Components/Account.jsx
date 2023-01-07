import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import env from 'react-dotenv';

export const Account = () => {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [friends, setFriends] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const fetch2 = async () => {
            const response = await fetch((env.API_URL + 'getuser'), {
              method: 'GET',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
              },
            });
            const content = await response.json();
            console.log(content);
            setUser(content.user_info);
            setFriends(content.user_info.friends);
          }
          fetch2();
    }, [])
    const [email,setemail] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch((env.API_URL + 'addfriend'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
                },
            body: JSON.stringify({
                "friend": email,
            })
        });
        const data = await response.json();
        console.log(data);
        if(data){
            handleClose();
            window.location.reload();
        }
    }
    return (
        <div class="container py-5">
            <div class="row gutters">
                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mb-2 text-primary">Personal Details</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="fullName">Full Name</label>
                                        <input disabled value={user.first_name + ' ' + user.last_name} type="text" class="form-control" id="fullName" placeholder="Enter full name" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="eMail">Email</label>
                                        <input disabled value={user.email} type="email" class="form-control" id="eMail" placeholder="Enter email ID" />
                                    </div>
                                </div>
                                {/* <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="phone">Phone</label>
                                        <input disabled value={user.} type="text" class="form-control" id="phone" placeholder="Enter phone number" />
                                    </div>
                                </div> */}
                                {/* <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="website">Website URL</label>
                                        <input disabled type="url" class="form-control" id="website" placeholder="Website url" />
                                    </div>
                                </div> */}
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-3 mb-2 text-primary">Financials</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="Street">Income</label>
                                        <input  value={user.income} type="name" class="form-control" id="Street" placeholder="Enter Income" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="ciTy">Profession</label>
                                        <input  value={user.profession} type="name" class="form-control" id="ciTy" placeholder="Enter Here" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="sTate">Expenditure Limit</label>
                                        <input  value={user.expense} type="text" class="form-control" id="sTate" placeholder="Enter Here" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="zIp">Savings</label>
                                        <input  value={user.savings} type="text" class="form-control" id="zIp" placeholder="Enter here" />
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters my-2">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right">
                                        <button type="button" id="submit" name="submit" class="btn btn-secondary ">Cancel</button>
                                        <button type="button" id="submit" name="submit" class="btn btn-primary mx-2">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='d-flex flex-column my-3'>
                <h4 class="mb-2 text-primary">My Friends</h4>
                <div className='d-flex flex-row justify-content-between'>
                    <div>
                        <h6 class="mb-2 text-success">{friends.length} Friends</h6>
                    </div>
                    <div>
                        <Button className='btn btn-info' size='sm' onClick={handleShow}>Add Friend</Button>
                    </div>
                </div>

                <div className='row w-25'>
                    {
                        friends.map((friend, index) => {
                            return (
                                <div className='col-4' key={index}>
                                    {friend}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Friend</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-group">
                        <label for="fullName">Email</label>
                        <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="text" class="form-control" id="fullName" placeholder="Enter Email" />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
