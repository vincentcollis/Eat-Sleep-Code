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

export interface BoardRowPopup {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export interface LeetcodeProblem {
        title: string;
        difficulty: "Easy" | "Medium" | "Hard";
        topic_tags: string[];
        id: string;
        title_slug: string;
}

export interface AddLeetcodeProblem {
    problem_id: string;
}