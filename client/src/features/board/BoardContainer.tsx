import BoardRow from "./components/BoardRow";
// import { useGetBoardDataQuery } from './BoardContainerApiSlice';
import type { Row } from "./boardTypes";
import { useEffect } from "react";
import getAuthToken from "../../utils/serverComms";

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
            Keep track of all your leetcode problems!
          </p>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Problem
          </button>
        </div>
      </div>
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
