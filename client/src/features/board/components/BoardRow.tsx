import type { RowProps } from "../boardTypes";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import {
  useChangeCompletedStatusMutation,
  useGetBoardDataQuery,
} from "../BoardContainerApiSlice";

// Helper function to determine Difficulty column text colors
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

// Function that renders a BoardRow React component
const BoardRow: React.FC<RowProps> = ({ row }) => {
  console.log("Board Row: ", row);
  // Get the RTK Query mutation and refetch function
  const [changeCompletedStatus] = useChangeCompletedStatusMutation();

  const { refetch } = useGetBoardDataQuery();

  // Function to handle button click that will change the completion status of a problem
  const handleButtonClick = async () => {
    try {
      await changeCompletedStatus({ problem_id: row.id }).unwrap();

      // Upon successful change, it will call refetch on the user data
      refetch();
    } catch (error) {
      console.error("Error updating the problem row:", error);
    }
  };

  return (
    <tr>
      <td className="px-3 py-4 text-sm text-gray-900 ">
        {" "}
        {row.completed ? (
          <CheckCircleIcon
            className="h-5 w-5 text-green-500"
            aria-hidden="true"
          />
        ) : (
          <MinusCircleIcon
            className="h-5 w-5 text-gray-400 cursor-pointer"
            aria-hidden="true"
            onClick={handleButtonClick}
          />
        )}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">{row.title}</td>
      <td className="px-3 py-4 text-sm text-gray-900">{row.topic_tags[0]}</td>
      <td className={`px-3 py-4 text-sm ${getDifficultyColor(row.difficulty)}`}>
        {row.difficulty}
      </td>
      <td className="px-3 py-4 text-sm text-gray-900">{row.times_completed}</td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {new Date(row.completed_at).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default BoardRow;
