import { FC } from "react";
import Chart from "react-apexcharts";
import { decodeHtmlText } from "../../utils/helpers";

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
          categories: categories.map((category) => decodeHtmlText(category)),
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Answers";
            },
          },
        },
        colors: ["#ff2929", "#00dfac"],
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
