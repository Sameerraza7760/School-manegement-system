interface MessegeProps {
  message: string;
}
const Messages = ({ message }: MessegeProps) => {
  const messageContainerClass = `flex items-start w-full ${"bg-blue-200"} p-3 rounded-lg w-3/4`;

  return (
    <div key={message} className="flex items-start">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src="https://via.placeholder.com/40"
        alt="User"
      />
      <div className={messageContainerClass}>
        <p className={`text-sm ${"text-blue-800"} font-semibold`}>{message}</p>
      </div>
    </div>
  );
};

export default Messages;
