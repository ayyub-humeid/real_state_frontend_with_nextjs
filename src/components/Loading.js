export const Loading = ({message}) => {
return (
<div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-surface text-on-surface-variant font-body-md">
                <span className="material-symbols-outlined animate-spin text-[32px] text-primary">sync</span>
                <span className="ml-2">{message}...</span>
            </div>
);
}