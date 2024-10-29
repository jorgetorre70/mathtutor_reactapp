import { FaRobot } from "react-icons/fa6";
import { IconContext } from "react-icons";

interface Props {
  message: string;
}

export const GptproblemsolverMessage = ({ message }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <IconContext.Provider
          value={{
            color: "#3E9FBD",
            size: "4em",
          }}
        >
          <div>
            <FaRobot />
          </div>
        </IconContext.Provider>
        {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div> */}
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
