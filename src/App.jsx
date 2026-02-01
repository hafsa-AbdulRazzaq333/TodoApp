import { useState, useEffect } from "react";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BsFillSaveFill } from "react-icons/bs";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const API_URL = "http://127.0.0.1:5000/todos";

  // Load todos from backend on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    if (!todo.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setTodo("");
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (e, id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    if (!t) return;
    setTodo(t.todo);

    // Optional: remove temporarily from UI
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const todoItem = todos.find((item) => item.id === parseInt(id));
    if (!todoItem) return;

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: todoItem.todo,
        isCompleted: !todoItem.isCompleted,
      }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <div className="bg-[#f8faf9] min-h-screen font-sans">
        <Navbar />

        <div className="flex justify-center items-start p-6 sm:p-10">
          <div className="w-full max-w-4xl rounded-xl bg-[#ffffff] text-gray-800 shadow-lg border border-[#d1e7e4] p-6 sm:p-10 min-h-[75vh]">
            <h1 className="text-center font-extrabold font-serif text-2xl sm:text-3xl md:text-4xl text-[#2a9d8f] mb-6 tracking-wide">
              Manage Your Tasks Easily
            </h1>

            <div className="addTodo mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter your task..."
                className="flex-1 p-3 rounded-full text-gray-700 border border-[#a8d5ce] focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] hover:border-[#2a9d8f] transition-all duration-300 w-full sm:w-[93%] shadow-sm"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="bg-[#2a9d8f] hover:bg-[#21867a] disabled:bg-gray-300 p-3 font-semibold cursor-pointer rounded-full text-white sm:mx-3 w-full sm:w-auto flex justify-center items-center shadow-md transition-all duration-300"
              >
                <BsFillSaveFill className="text-lg" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input
                onChange={toggleFinished}
                type="checkbox"
                className="accent-[#2a9d8f] w-5 h-5"
                checked={showFinished}
              />
              <span className="text-gray-700 text-sm sm:text-base">
                Show Finished
              </span>
            </div>

            <h2 className="text-lg font-bold mb-3 text-[#2a9d8f] border-b border-gray-200 pb-1">
              Your Todos
            </h2>

            <div className="todos space-y-3">
              {todos.length === 0 && (
                <div className="m-5 text-gray-500 text-center italic">
                  No Todos to display
                </div>
              )}

              {todos.map(
                (item) =>
                  (showFinished || !item.isCompleted) && (
                    <div
                      key={item.id}
                      className="todo flex flex-col sm:flex-row sm:justify-between p-4 bg-[#f9fdfc] rounded-lg shadow-sm items-start sm:items-center gap-3 border border-[#d1e7e4] hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-3 items-center w-full">
                        <input
                          name={item.id}
                          onChange={handleCheckbox}
                          type="checkbox"
                          className="accent-[#2a9d8f] w-5 h-5"
                          checked={item.isCompleted}
                        />
                        <div
                          className={`break-words text-sm sm:text-base ${
                            item.isCompleted
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }`}
                        >
                          {item.todo}
                        </div>
                      </div>

                      <div className="btns flex gap-2 items-center self-end sm:self-center">
                        <button
                          onClick={(e) => handleEdit(e, item.id)}
                          className="bg-[#22c55e] hover:bg-[#16a34a] p-2 py-1 font-bold cursor-pointer rounded-md text-white"
                        >
                          <MdEditSquare />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          className="bg-[#e4c31c] hover:bg-[#d7c013] p-2 py-1 font-bold cursor-pointer rounded-md text-white"
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
