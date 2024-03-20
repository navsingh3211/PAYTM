export default function ErrorPage(){
  return <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-10 shadow rounded">
      <h1 className="text-red-500 text-center text-3xl font-bold">Some Error has been occured!</h1>
      <p className="text-gray-700 text-center text-lg mt-4">Contact to the admin.</p>
    </div>
  </div>
}

