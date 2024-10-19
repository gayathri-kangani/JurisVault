// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Dashboard({ account }) {
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/header/${account}`);
//         setUsername(response.data.username);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchUsername();
//   }, [account]);

//   return (
//     <div>
//       <h1>Welcome to the Dashboard</h1>
//       <p>ID: {account}</p>
//       {username && <p>Username: {username}</p>}
//     </div>
//   );
// }

import React from 'react'
import DashboardStatsGrid from '../components/dashcon/DashboardStatsGrid'
import TransactionChart from '../components/dashcon/TransactionChart'
import RecentOrders from '../components/dashcon/RecentOrders'
import BuyerProfilePieChart from '../components/dashcon/BuyerProfilePieChart'
import PopularProducts from '../components/dashcon/PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4 m-4 mb-10">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			{/* <div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div> */}
		</div>
	)
}

