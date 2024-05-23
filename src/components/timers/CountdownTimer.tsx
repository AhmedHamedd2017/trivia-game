import { useEffect, FC } from "react";
import styled from "styled-components";
import { getFormattedCountdown } from "../../utils/helpers";

interface Props {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const TimerElem = styled.p`
  color: white;
  font-size: 20px;
`;

const CountdownTimer: FC<Props> = ({ time, setTime }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]);

  return <TimerElem>{`Time left: ${getFormattedCountdown(time)}`}</TimerElem>;
};

export default CountdownTimer;
