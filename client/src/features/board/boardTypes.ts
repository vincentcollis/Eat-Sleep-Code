export interface Row {
    user_id: number;
    problem_name: string;
    completed: boolean;
    updated_at: Date;
    number_of_times_completed: number;
    created_at: Date;
    difficulty: "Easy" | "Medium" | "Hard";
    type: string;
}

export interface BoardState {
    rows: Row[];
}

export interface RowProps {
    row: Row;
}