import { useState } from "react";
import BoardRow from "./components/BoardRow";
import AddBoardRowPopup from "./components/AddBoardRowPopup";
import {
  useGetAllProblemsQuery,
  useAddBoardRowMutation,
} from "./BoardContainerApiSlice";
import type { Row, LeetcodeProblem } from "./boardTypes";
import type React from "react";
// useGetBoardDataQuery,

// *** Mock Data ***
const currentDate = new Date();
const rows: Row[] = [
  {
    user_id: 0,
    problem_name: "Q0",
    completed: false,
    updated_at: currentDate,
    created_at: currentDate,
    number_of_times_completed: 0,
    difficulty: "Easy",
    type: "Algorithm",
  },
  {
    user_id: 2,
    problem_name: "Q2",
    completed: true,
    updated_at: currentDate,
    created_at: currentDate,
    number_of_times_completed: 2,
    difficulty: "Easy",
    type: "Algorithm",
  },
  {
    user_id: 3,
    problem_name: "Q3",
    completed: true,
    updated_at: currentDate,
    created_at: currentDate,
    number_of_times_completed: 3,
    difficulty: "Medium",
    type: "Algorithm",
  },
  {
    user_id: 4,
    problem_name: "Q4",
    completed: true,
    updated_at: currentDate,
    created_at: currentDate,
    number_of_times_completed: 4,
    difficulty: "Hard",
    type: "Algorithm",
  },
  {
    user_id: 5,
    problem_name: "Q5",
    completed: true,
    updated_at: currentDate,
    created_at: currentDate,
    number_of_times_completed: 5,
    difficulty: "Medium",
    type: "Algorithm",
  },
];

// Renders a TailwindCSS table that contains BoardRow components
export default function BoardContainer() {
  // Pulls all problems from RTK Query
  const { data: problems } = useGetAllProblemsQuery();

  // Local state to track popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Function to toggle popup visibility
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Local state to track the selected leetcode problem from dropdown
  const [selectedProblem, setSelectedProblem] = useState("");

  // Updates selected leetcode problem state inside form
  const handleProblemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProblem(e.target.value);
  };

  // RTK Query POST request for new leetcode question entries
  const [addBoardRow] = useAddBoardRowMutation();

  // Function that will post new leetcode problem entry for user
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Find the selected problem in the list of problems by title
    const problem = problems?.find(
      (p: LeetcodeProblem) => p.title === selectedProblem,
    );

    // If the problem does not exist, alert the user
    if (!problem) {
      alert("Please select a valid problem.");
      return;
    }

    // Attemps to send post request
    try {
      await addBoardRow({
        problem_id: problem.id,
      }).unwrap();

      // Close the popup after successful submission
      togglePopup();
    } catch (error) {
      // Catches errors while posting
      console.error("Error adding new problem:", error);
    }
  };

  // const { data: rows, error, isLoading } = useGetBoardDataQuery();

  // if (isLoading) {
  //     return <div>Loading...</div>
  // }

  // if (error) {
  //     return <div className="text-red-500">Error fetching data</div>;
  // }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-4x1">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            My Board
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Keep track of all the leetcode problem's you've done!
          </p>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={togglePopup}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            New Entry
          </button>
        </div>
      </div>

      <AddBoardRowPopup isOpen={isPopupOpen} onClose={togglePopup}>
        <h2 className="text-lg font-semibold mb-4">
          Select a Problem from LeetCode
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Problem Name
            </label>
            <select
              name="problem_name"
              value={selectedProblem}
              onChange={handleProblemSelect}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              style={{ maxHeight: "150px", overflowY: "auto" }}
            >
              <option value="" disabled>
                Select a problem
              </option>
              {problems?.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add Problem
            </button>
          </div>
        </form>
      </AddBoardRowPopup>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Passed
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Problem
                    <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Difficulty
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    # of Completions
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date Added
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Updated
                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {rows?.map((row) => (
                  <BoardRow key={row.problem_name} row={row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
