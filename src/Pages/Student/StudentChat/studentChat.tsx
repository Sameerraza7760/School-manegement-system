function StudentChat() {
  return (
    <div className="flex h-auto bg-gray-100">
      {/* Sidebar - List of Chats */}
    
      {/* Main Chat Area */}
      <div className="flex-1 p-4 overflow-y-scrol ">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Chat with Teacher A</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col space-y-4  h-[400px]">
          {/* Messages will go here */}
          <div className="bg-gray-100 p-3 rounded-md max-w-md">
            <span className="text-gray-600 font-semibold">Teacher:</span> Hello!
            How can I help you?
          </div>
          <div className="bg-blue-500 p-3 rounded-md text-white self-end max-w-md">
            <span className="text-gray-200 font-semibold">You:</span> Hi! I have
            a question about the assignment.
          </div>
          {/* Add more messages as needed */}
        </div>

        {/* Chat Input */}
        <div className="mt-4 flex items-center">
          <textarea
            className="flex-1 p-3 border rounded-md focus:outline-none"
            placeholder="Type your message..."
          ></textarea>
          <button className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentChat;
