import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		Pending: 4000,
		Completed: 2400
	},
	{
		name: 'Feb',
		Pending: 3000,
		Completed: 1398
	},
	{
		name: 'Mar',
		Pending: 2000,
		Completed: 9800
	},
	{
		name: 'Apr',
		Pending: 2780,
		Completed: 3908
	},
	{
		name: 'May',
		Pending: 1890,
		Completed: 4800
	},
	{
		name: 'Jun',
		Pending: 2390,
		Completed: 3800
	},
	{
		name: 'July',
		Pending: 3490,
		Completed: 4300
	},
	{
		name: 'Aug',
		Pending: 2000,
		Completed: 9800
	},
	{
		name: 'Sep',
		Pending: 2780,
		Completed: 3908
	},
	{
		name: 'Oct',
		Pending: 1890,
		Completed: 4800
	},
	{
		name: 'Nov',
		Pending: 2390,
		Completed: 3800
	},
	{
		name: 'Dec',
		Pending: 3490,
		Completed: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Transactions</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Pending" fill="#0ea5e9" />
						<Bar dataKey="Completed" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
