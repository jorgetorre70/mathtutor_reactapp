interface Props {
  text: string;
}
export const MyMessage = ({ text }: Props) => {
  // return (
  //   <div className="col-start-6 col-end-13 p-3 rounded-lg">
  //     <div className="flex items-center justify-start flex-row-reverse">
  //       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
  //         F
  //       </div>
  //       <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
  //         <div>{text}</div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex items-start justify-end space-x-3 sm:space-x-4">
        {/* Message Content - Responsive width and padding */}
        <div className="flex-1 min-w-0 max-w-[85%] sm:max-w-[75%] flex justify-end">
          <div className="relative bg-indigo-700 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
            <div className="text-sm sm:text-base text-white break-words">
              {text}
            </div>
          </div>
        </div>

        {/* User Avatar - Responsive sizing */}
        <div className="flex-shrink-0">
          <div
            className="flex items-center justify-center bg-indigo-500 rounded-full 
                        w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-medium text-white"
          >
            F
          </div>
        </div>
      </div>
    </div>
  );
};
