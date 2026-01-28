import React, { useState } from 'react'

function Index() {

    const [Value, setValue] = useState({ Tasks: '' })
    const [List, setList] = useState([])
    const [Edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [editValue, setEditValue] = useState("")

    function handleAdd() {
        setList([...List, Value])
        setValue({ Tasks: '' })
    }

    function handleDlt(index) {
        const Dlt = List.filter((val, ind) => ind !== index)
        setList(Dlt)
    }

    function handleComplete(index) {
        const Completed = List.filter((val, ind) => ind !== index)
        setList(Completed)
    }

    function handleEdit(index) {
        setEdit(true)
        setEditIndex(index)
        setEditValue(List[index].Tasks)
    }

    function handleConfirm() {
        const updatedList = List.map((item, ind) =>
            ind === editIndex ? { Tasks: editValue } : item
        )

        setList(updatedList)
        setEdit(false)
        setEditIndex(null)
        setEditValue("")
    }

    // useEffect(() => {
    //     const memory = localStorage.getItem('Task')
    //     if (memory !== null) {
    //         setList(JSON.parse(memory))
    //     }
    //     setLoaded(true)
    // }, [])

    // useEffect(() => {
    //     if (loaded === true) {
    //         const data = JSON.stringify(List);
    //         localStorage.setItem('Task', data);
    //     }
    // }, [List, loaded])


    return (
        <div className='mainBg'>
            <main className='To-Do_Container'>

                <div>
                    <h1 className='tXt'>To-Do List</h1>
                </div>

                <section className='Inpt-Btn_Section'>
                    <div>
                        <input
                            className='inpt'
                            value={Value.Tasks}
                            placeholder='Add a new To-Do'
                            onChange={(e) => setValue({ Tasks: e.target.value })}
                        />
                    </div>
                    <div>
                        <button className='bTn' onClick={handleAdd}>Add ✚</button>
                    </div>
                </section>

                <section className="listContainer">

                    <div className='Section'>
                        <div><h1>Tasks</h1></div>
                        <div><h1>Manage</h1></div>
                        <div><h1>Status</h1></div>
                    </div>

                    {List.map((val, ind) => (
                        <div className="listRow" key={ind}>

                            <div className="Col">
                                {Edit && editIndex === ind ? (
                                    <div>
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <button onClick={handleConfirm}>Confirm</button>
                                    </div>
                                ) : (
                                    <h2>{val.Tasks}</h2>
                                )}
                            </div>

                            <div className="Col">
                                <button className="editBtn" onClick={() => handleEdit(ind)}>Edit 📝</button>
                                <button className="dltBtn" onClick={() => handleDlt(ind)}>Delete 🗑</button>
                            </div>

                            <div className="Col">
                                <button className="penBtn">Pending ⏳</button>
                                <button className="comBtn" onClick={() => handleComplete(ind)}>Completed ✅</button>
                            </div>

                        </div>
                    ))}

                </section>

            </main>
        </div>
    )
}

export default Index
