import React, { useEffect, useState } from 'react'

function Index() {

  const [Value, setValue] = useState({
    Tasks: '',
    Complete: false,
    Pending: false
  })

  const [List, setList] = useState([])
  const [Edit, setEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState('')
  // const [Pending, setPending] = useState(false)
  // const [storedData, setstoredData] = useState()
  const [Data, setData] = useState(false)

  // const [Visible, setVisible] = useState(false)
  // const [Lists, setLists] = useState([])
  // const [Tasks, setTasks] = [{
  //   Name: Value
  // }]

  // console.log(Value);

  // useEffect(() => {
  //   console.log(inpValue);

  // }, [])

  // localStorage.clear()

  useEffect(() => {
    const Memory = localStorage.getItem('Data')
    if (Memory !== null) {
      setList(JSON.parse(Memory))
      // setList(('Memory', JSON.parse('Data')))
    }
    setData(true)
  }, [])


  useEffect(() => {
    if (Data === true) {
      localStorage.setItem('Data', JSON.stringify(List))
    }
  }, [List, Data])


  function handleAdd(e) {
    e.preventDefault()
    // setList(List.push(Value))
    setList([...List, Value])

    // const storedVal = val.map((val) => {
    //   return val
    // })
    // console.log(storedVal);
    // setLists(storedVal)
  }

  function handleEdit(index) {
    setEditIndex(index)
    setEditText(List[index].Tasks)
    setEdit(true)

  }

  function handleConfirm(index) {
    // setEditIndex(index)
    // setEditText(List[index].Tasks)
    // setEdit(false)

    setEdit(true)
    const confirm = List.map((val, ind) => {
      if (ind === editIndex) {
        return {
          ...val,
          Tasks: editText
        }
      } else {
        return val
      }
    })
    setList(confirm)
    setEdit(false)
    setEditIndex(null)
    setEditText('')
  }

  function handleDlt(index) {
    const dlt = List.filter((val, ind) => ind !== index)
    setList(dlt)
  }

  function handleComplete(index) {

    const Completed = List.map((val, ind) => {
      if (ind === index) {
        return {
          // val.Complete: true,
          ...val,
          Complete: true,
          Pending: false
        }
      } else {
        return val
      }

    })
    setList(Completed)
  }

  function handlePending(index) {
    const Pending = List.map((val, ind) => {
      if (index === ind) {
        return {
          ...val,
          Pending: true
        }
      } else {
        return val
      }
    })
    setList(Pending)
  }

  return (

    <div className='mainBg'>
      <main className='To-Do_Container'>
        <div>
          <h1 className='tXt'>To-Do List</h1>
        </div>

        <section className='Inpt-Btn_Section'>
          <form onSubmit={handleAdd}>
            <label htmlFor=""></label>
            <input className='inpt' name='Tasks' type="text" placeholder='Add a new To-Do' onChange={(e) => setValue({ ...Value, [e.target.name]: e.target.value })} />
            <button className='bTn' type='submit'>Add ✚</button>
          </form>
        </section>

        <section className="listContainer">

          <div className='Section'>
            <div><h1>Tasks</h1></div>
            <div><h1>Manage</h1></div>
            <div><h1>Status</h1></div>
          </div>

          {List.map((val, ind) => (
            <div className="listRow">

              {Edit === true && editIndex === ind &&
                <div className="Col">
                  <input type="text" className='editInpt' onChange={(e) => setEditText(e.target.value)} placeholder='Edit List' />
                  <button className='confirmBtn' onClick={() => handleConfirm(ind)}>Confirm</button>
                </div>
              }

              {/* {Edit === false && val.Complete === false && */}
              <div className='Col' style={{
                display: Edit === true && editIndex === ind ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                < h1 className='h1' > {val.Tasks}</h1>
              </div>
              {/* } */}

              {/* {val.Complete === true &&
                <div className='Col'>
                  <h1 className='h1' >{val.Tasks}</h1>
                </div>} */}

              <div className="Col">
                <button className="editBtn" onClick={() => handleEdit(ind)}>Edit 📝</button>
                <button className="dltBtn" onClick={() => handleDlt(ind)}>Delete 🗑</button>
              </div>


              {val.Complete === false && val.Pending === false &&
                <div className="Col">
                  <button className="penBtn" onClick={() => handlePending(ind)}>Pending ⏳</button>
                  <button className="comBtn" onClick={() => handleComplete(ind)}>Complete</button>
                </div>
              }

              {val.Complete === true &&
                <div className="Col">
                  <button className="comBtn" onClick={() => handleComplete(ind)}>Completed ✅</button>
                </div>
              }

              {
                val.Pending === true &&
                <div className="Col">
                  <button className="penBtn" onClick={() => handlePending(ind)}>Incomplete</button>
                  <button className="comBtn" onClick={() => handleComplete(ind)}>Complete</button>
                </div>
              }
            </div>))
          }
        </section >

      </main >
    </div >

  )
}

export default Index