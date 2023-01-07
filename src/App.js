import NavScrollExample from './Components/Navbar';
import HeaderAndFooterExample from './Components/Card';
import { Section1 } from './Components/Section1';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Groups } from './Components/Groups';
import { CreateGroupModal } from './Components/CreateGroupModal';
import { CreateSplit } from './Components/CreateSplit';
import { Account } from './Components/Account';
import env from 'react-dotenv';
import { useEffect, useState } from 'react';
import { Transactions } from './Components/Transactions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut  } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);
function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch((env.API_URL + 'getdata'), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
      });
      const content = await response.json();
      // console.log(content);
      setData(content.data);
      localStorage.setItem('user',content.data.username)
      localStorage.setItem('id',content.data.number)
    }
    
    fetch_data();


  }, [])
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<div>
          <NavScrollExample />
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <div className='w-100 px-1 my-5 mx-auto'><HeaderAndFooterExample data={data} /></div>
              </div>
              <div class="col-sm">
                <div className='w-50 px-1 my-5 mx-auto' style={{'height':'300px'}}>
                <h6>Expenditure Trends</h6>
                <Doughnut  data={{
                            labels: ['Income', 'Balance', 'Expenditure'],
                            datasets: [
                                {
                                    label: 'Amount in INR',
                                    data: [data['income'], data['balance'], data['expense']],
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
              </div>
            </div>
          </div>
          <Section1/>
        </div>} />
        <Route path='/login' element={<div className='w-100 '><Login/></div>} />
        <Route path='/signup' element={<div className='w-100'><Signup/></div>} />
        <Route path='/groups' element={<div className=''>
          <NavScrollExample />
          <Groups />
        </div>} />
        <Route path='/creategroup' element={<div className=''>
          <NavScrollExample />
          <div className='w-100 py-5'>
          <CreateGroupModal />
          </div>
        </div>} />
        <Route path='/group' element={<div className=''>
          <NavScrollExample />
          <div className='w-100 py-5'>
          <CreateSplit/>
          </div>
        </div>} />
        <Route path='/profile' element={<div className=''>
          <NavScrollExample />
          <div className='w-100'>
          <Account/>
          </div>
        </div>} />
        <Route path='/transactions' element={<div className=''>
          <NavScrollExample />
          <div className='w-100'>
          <Transactions/>
          </div>
        </div>} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
