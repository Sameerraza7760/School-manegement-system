import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042"];
const PieChartAttendence = ({
  presentPercentage,
  absentPercentage,
}: {
  presentPercentage: number;
  absentPercentage: number;
}) => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={[
          { name: "Present", value: presentPercentage },
          { name: "Absent", value: absentPercentage },
        ]}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {[...Array(2)].map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        <Label
          value={`Present: ${presentPercentage.toFixed(2)}%`}
          position="center"
          fill="#333"
          fontSize={16}
        />
        <Label
          value={`Absent: ${absentPercentage.toFixed(2)}%`}
          position="center"
          fill="#333"
          fontSize={16}
          dy={20} // Adjust the vertical position
        />
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartAttendence;
