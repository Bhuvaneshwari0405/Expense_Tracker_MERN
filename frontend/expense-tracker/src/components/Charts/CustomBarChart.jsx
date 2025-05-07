import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
const CustomBarChart = ({ data }) => {
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };
    

    return (
        <div className="bg-white mt-6 ">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} >
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{fontSize:12, fill:"#555"}} />
                    <YAxis tick={{fontSize:12, fill:"#555"}} stroke="none"  />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{ r: 8 , fill:"yellow"}} activeStyle={{ fill: "green" }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export default CustomBarChart;