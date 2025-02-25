interface TransactionIconProps {
    className?: string;
}

export function TransactionIcon({ className }: TransactionIconProps) {
    return (
        <div className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded-md ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM12 11H8V13H12V16L16 12L12 8V11Z"></path>
            </svg>
            <span className="text-white">Activity</span>
        </div>
    );
}
