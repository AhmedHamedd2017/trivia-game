import { FC } from "react";
import Chart from "react-apexcharts";

interface Props {
  seriesData: number[];
}

const LineChart: FC<Props> = ({ seriesData }) => {
  return (
    <Chart
      options={{
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " sec";
            },
          },
        },
      }}
      series={[
        {
          name: "Time",
          data: seriesData,
        },
      ]}
      type="line"
    />
  );
};

export default LineChart;
