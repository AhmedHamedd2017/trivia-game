import { FC } from "react";
import Chart from "react-apexcharts";

interface Props {
  seriesData: number[];
}

const LineChart: FC<Props> = ({ seriesData }) => {
  return (
    <Chart
      options={{}}
      series={[
        {
          name: "answer",
          data: seriesData,
        },
      ]}
      type="line"
      width="500"
    />
  );
};

export default LineChart;
