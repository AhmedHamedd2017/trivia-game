import { FC } from "react";
import Chart from "react-apexcharts";

interface Props {
  labels: string[];
  series: number[];
}

const PieChart: FC<Props> = ({ labels, series }) => {
  return (
    <Chart
      options={{
        labels: labels,
        colors: ["#00dfac", "#ff2929", "#ffd860"],
      }}
      series={series}
      type="pie"
      width="500"
    />
  );
};

export default PieChart;
