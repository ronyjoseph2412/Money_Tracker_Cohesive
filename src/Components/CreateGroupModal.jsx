import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import env from 'react-dotenv'

export const CreateGroupModal = () => {
    const [groupname, setgroupname] = useState('')
    const [friends, setFriends] = useState([])
    const [friend, setfriend] = useState('')
    const handleClick = async(e)=>{
        e.preventDefault()
        const response = await fetch((env.API_URL + 'createroom'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                "name":groupname,
                "members":friends
            })
        });
        const content = await response.json();
        console.log(content);
        if(content['message'] === 'Group Sucessfully Created'){
            window.location.href='/groups'
        }
    }
    return (
        <>
            <div className='w-75 mx-4'>
                <div class="mb-2">
                    <label for="formGroupExampleInput" class="form-label">Group Name</label>
                    <input type="text" value={groupname} onChange={(e) => setgroupname(e.target.value)} class="form-control w-25" id="formGroupExampleInput" placeholder="The OG Gang" />
                </div>
                <div class="mb-2">
                    <label for="formGroupExampleInput2" class="form-label">Add Friends</label>
                    <div className='d-flex flex-row '>
                        <div>
                            <input value={friend} onChange={(e) => setfriend(e.target.value)} type="text" class="form-control w-100" id="formGroupExampleInput2" placeholder="Mukesh" />
                        </div>
                        <Button className='mx-1' onClick={() => { setFriends([...friends, friend]); setfriend('') }}>Add</Button>
                    </div>
                </div>
                <div className=''>
                    Group Members :
                    <div className='row w-75'>
                        {
                            friends.map((item) => {
                                return (
                                    <div className='col-6'>
                                        {item}
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div>
                    <Button variant="outline-primary mt-4" onClick={handleClick}>Create Group</Button>
                </div>
            </div>

        </>
    )
}
