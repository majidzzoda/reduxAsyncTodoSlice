import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AddData, DeleteData, EditData, GetData } from "./reducers/todoSlice";
const App = () => {
  const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
  const editIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-orange-400  ">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
  const searchIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
  const addIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  </svg>
  const [editName, setEditName] = useState("");
  const [addName, setAddName] = useState("");
  const [idX, setIdX] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.todo);
  const [search, setSearch] = useState("");
  const filteredData = data.filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase()));
  useEffect(() => {
    dispatch(GetData())
  }, [dispatch])
  if (loading) {
    return <h1 className="flex text-center items-center justify-center mt-[300px] font-black text-blue-500 text-[50px]">Loading...</h1>
  }
  if (error) {
    return <h1 className="flex text-center items-center justify-center mt-[300px] font-black text-[50px]">Error</h1>
  }
  function showEdit(e) {
    setEditModal(true);
    setIdX(e.id);
    setEditName(e.name);
  }
  function saveEdit() {
    dispatch(EditData({ id: idX, name: editName }));
    setEditModal(false);
  }
  function saveAdd() {
    dispatch(AddData({ name: addName }));
    setAddModal(false);
  }
  return (
    <div>
      {addModal && (
        <div className="flex items-center justify-center fixed z-50 inset-0 backdrop-blur-[10px]">
          <form className="flex bg-[whitesmoke] p-[25px] rounded-[12px] border border-gray-300 flex-col gap-[10px]" action="" onSubmit={saveAdd}>
            <h1 className="font-bold text-center">Add Modal</h1>
            <input className="bg-white py-[5px] px-[10px] rounded-[5px] cursor-pointer outline-none border-2 border-gray-100 focus:border-2 focus:border-blue-500 transition-all duration-500" type="text" value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="Name" />
            <div className="flex gap-[10px] w-full">
              <button className="py-[5px] w-full px-[10px] rounded-[5px] cursor-pointer text-white bg-red-500" type="submit" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="py-[5px] w-full px-[10px] rounded-[5px] cursor-pointer text-white bg-blue-500" onClick={saveAdd} type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
      {editModal && (
        <div className="flex items-center justify-center fixed z-50 inset-0 backdrop-blur-[10px]">
          <form className="flex bg-[whitesmoke] p-[25px] rounded-[12px] border border-gray-300 flex-col gap-[10px]" action="" onSubmit={saveEdit}>
            <h1 className="font-bold text-center">Edit Modal</h1>
            <input className="bg-white py-[5px] px-[10px] rounded-[5px] cursor-pointer outline-none border-2 border-gray-100 focus:border-2 focus:border-blue-500 transition-all duration-500" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <div className="flex gap-[10px] w-full">
              <button className="py-[5px] w-full px-[10px] rounded-[5px] cursor-pointer text-white bg-red-500" type="submit" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="py-[5px] w-full px-[10px] rounded-[5px] cursor-pointer text-white bg-orange-500" type="submit" onClick={saveEdit}>Edit</button>
            </div>
          </form>
        </div>
      )
      }
      <div className="bg-white shadow-md p-[25px] rounded-[15px] flex flex-col mt-[100px] w-[90%] lg:w-[30%] m-auto">
        <button onClick={() => setAddModal((prev) => !prev)}>{addIcon}</button>
        <h1 className="text-center font-bold">Users:{filteredData.length}</h1>
        <div className="flex py-[12px] items-center">
          <button className="absolute pl-[15px]">{searchIcon}</button>
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white w-full p-[10px] pl-[45px] rounded-[10px] cursor-pointer outline-none border-2 border-gray-100 focus:border-2 focus:border-blue-500 transition-all duration-500" type="text" placeholder="Search" />
        </div>
        <div className="flex gap-[10px] h-[330px] overflow-scroll rounded-[10px] w-full m-auto items-center flex-col">
          {
            data
              .filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase()))
              .map((e) => {
                return (
                  <div key={e.id} className="flex items-center shadow-2xs rounded-[10px] justify-between p-[15px] bg-[whitesmoke] w-full">
                    <h1 className="font-bold text-blue-500">{e.name}</h1>
                    <div className="flex p-[5px] rounded-[5px] shadow-md gap-[20px]">
                      <button onClick={() => dispatch(DeleteData(e.id))}>{deleteIcon}</button>
                      <button onClick={() => showEdit(e)}>{editIcon}</button>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </div >
  )
}

export default App