function Notice() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mt-8 mx-auto w-[90%]">
      <div className="w-full mx-auto  bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2 className="text-2xl font-bold">Important Notice</h2>
          <p className="text-gray-500">{currentDate}</p>
        </div>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
          urna ac nunc tincidunt aliquam. Ut id fermentum velit, non venenatis
          erat. Vivamus et augue ac purus fringilla iaculis non nec lacus.
        </p>
        <p className="text-gray-700 mb-4">
          Sed vehicula quam sit amet bibendum aliquet. Integer dictum sapien ac
          sem commodo, sit amet mattis nunc lacinia. Nam facilisis, velit eu
          malesuada suscipit, orci elit venenatis metus, et sollicitudin quam
          elit vel libero.
        </p>
        <p className="text-gray-700 mb-4">
          Fusce sed nunc vel libero auctor mattis. Fusce tristique ex vel
          vestibulum varius. Donec auctor lectus a nisl semper, eu aliquet elit
          dapibus. Curabitur eleifend massa vel ex fermentum feugiat.
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notice;
