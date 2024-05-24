import { FC } from "react";
import { H1Elem } from "../shared/styledComponents";
import BaseButton from "../components/buttons/BaseButton";
import { ReducerAction } from "../shared/interfaces";
import { Actions } from "../shared/enums";
import { useQueryClient } from "react-query";

interface Props {
  queryKey: string;
  errorMessage: string;
  dispatch: React.Dispatch<ReducerAction>;
}

const ErrorView: FC<Props> = ({ queryKey, errorMessage, dispatch }) => {
  const queryClient = useQueryClient();

  return (
    <>
      <div>
        <H1Elem>Something went wrong!</H1Elem>
        {errorMessage && <H1Elem>{errorMessage.toString()}</H1Elem>}
      </div>
      <BaseButton
        text="Back to homepage"
        onClick={() => {
          queryClient.resetQueries([queryKey]);
          dispatch({
            type: Actions.START_NEW_GAME,
          });
        }}
      />
    </>
  );
};

export default ErrorView;
