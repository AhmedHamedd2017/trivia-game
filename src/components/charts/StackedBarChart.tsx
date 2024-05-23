import { FC } from "react";
import Chart from "react-apexcharts";

interface Props {
  categories: string[];
  negativeValues: number[];
  positiveValues: number[];
}
const StackedBarChart: FC<Props> = ({
  categories,
  negativeValues,
  positiveValues,
}) => {
  return (
    <Chart
      options={{
        chart: {
          stacked: true,
        },
        xaxis: {
          categories: categories,
        },
      }}
      series={[
        {
          name: "Negative",
          data: negativeValues,
        },
        {
          name: "Positive",
          data: positiveValues,
        },
      ]}
      type="bar"
      width="500"
    />
  );
};

export default StackedBarChart;
