import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import env from 'react-dotenv'
import { useNavigate } from 'react-router-dom'

export const Groups = () => {
    const [data, setdata] = useState([])
    const navigate = useNavigate()
    // const handleClick = () => {
    //     // console.log("Clicked")
    //     navigate('/group')
    // }
    const handleClick1 = () => {
        // console.log("Clicked")
        navigate('/creategroup');
    }
    // getgroups
    useEffect(() => {
        const fetch_data = async () => {
            const response = await fetch((env.API_URL + 'getgroups'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });
            const content = await response.json();
            // console.log(content);
            setdata(content.groups)
        }
        fetch_data()
    }, [])

    return (
        <div className='mx-4 my-3'>
            <div className=''>
                <div className='d-flex flex-row justify-content-between'>
                    <h2 className='font-'>Groups</h2>
                    <div className='pr-4'>
                        <Button variant="outline-primary" onClick={handleClick1}>Create Group</Button>
                    </div>
                </div>
            </div>
            {
                data.map((item) => {
                    return (
                        <Card className='w-75 my-4 mx-2 px-2 pt-2 d-flex flex-row justify-content-between'>
                            <div>
                                <h3>{item}</h3>
                            </div>
                            <div>
                                <Button variant="outline-info" onClick={()=>{localStorage.setItem('groupname',item);navigate('/group')}}>View</Button>
                            </div>
                        </Card>
                    )
                })
            }

        </div>

    )
}
