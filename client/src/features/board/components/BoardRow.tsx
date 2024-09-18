import type { RowProps } from '../boardTypes';
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/20/solid';

// Helper function to determine Difficulty column text colors
const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'text-green-500';
        case 'medium':
            return 'text-yellow-500';
        case 'hard':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
};

// Function that renders a BoardRow React component
const BoardRow: React.FC<RowProps> = ({ row }) => {

    return (
        <tr>
            <td className="px-3 py-4 text-sm text-gray-900 "> {
                row.completed ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                ) : (
                    <MinusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> 
                )}
            </td>
            <td className="px-3 py-4 text-sm text-gray-900">{row.problem_name}</td>
            <td className="px-3 py-4 text-sm text-gray-900">{row.type}</td>
            <td className={`px-3 py-4 text-sm ${getDifficultyColor(row.difficulty)}`}>{row.difficulty}</td>
            <td className="px-3 py-4 text-sm text-gray-900">{row.number_of_times_completed}</td>
            <td className="px-3 py-4 text-sm text-gray-500">{new Date(row.created_at).toLocaleDateString()}</td>
            <td className="px-3 py-4 text-sm text-gray-500">{new Date(row.updated_at).toLocaleDateString()}</td>
        </tr>
    );    
};

export default BoardRow;