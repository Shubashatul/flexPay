interface LoginProps {
    label: string;
    onClick?: () => void;
    className?: string; // Optional className prop for custom styling
}

export default function LoginIcon({ label, onClick, className }: LoginProps) {
    return (
        <div
            onClick={onClick}
            className={`w-24 h-12 flex justify-center items-center border-2 border-blue-500 rounded-full bg-lightblue cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:border-blue-700 ${className}`}
        >
            <span className="text-blue-500 font-semibold text-sm hover:text-white">
                {label}
            </span>
        </div>
    );
}
    