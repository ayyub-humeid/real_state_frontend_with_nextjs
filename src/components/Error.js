export const Error = ({message}) => {
    return (
          <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-surface text-error font-body-md">
                <span className="material-symbols-outlined text-[32px]">error</span>
                <span className="ml-2">Failed to load {message}. Please try again.</span>
            </div>
    )
}