import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import './App.css'
import TaskCreator from './components/taskCreator'
import Modal from 'react-modal';
const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
};
const localizer = momentLocalizer(moment)
const App = () => {
	const [tasks,setTasks] = useState([])
	const [isOpen,setIsOpen] = useState(false)
	const [tastkDetail,setTastkDetail] = useState({})
	const onSubmit = async (data) => {
		let validate = false
		validate = tasks.map(i => {
			return moment(i.start) === moment(data.date_task) ? false : true
		})
		if(!validate) {
			alert('Esta fecha ya se encuentra ocupada')
			return false
		}
		let props = {
			start: moment(data.date_task).toDate(),
			end: moment(data.date_task)
			.add(1,'hours')
			.toDate(),
			status:false,
			color: '#00695c',
			title: data.title_task,
			body: data.desc_task
		}
		await setTasks([...tasks,props]);
	}
	const state = {
		events: tasks
	};
	const localTask = () => {
		const localData = JSON.parse( localStorage.getItem('tasks') );
		console.log(localData);
		if(localData !== null && localData.length > 0) {
			setTasks(localData)
		}
		return
	}
	const editTask = (task) => {
		setIsOpen(true)
		setTastkDetail(task)
		return
	}

	const editEvent = (event) => {
		const arr_data = []
		state.events.map(x => {
			if(x === event){
				x.status = true
			}
			arr_data.push(x)
		})
		setTasks(arr_data)
		alert('Hemos cambiado el estado de la tarea' + event.title)
		return
	}
	useEffect(() => {
		localTask()
	},[])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	},[tasks])
	return (
		<div>
			<div className="container">
				<div className="sidebar-list">
					<TaskCreator  sendForm={onSubmit}></TaskCreator>
				</div>
				<div className="calendar">
					<div className="card">
						<Calendar
							defaultDate={moment()}
							defaultView="month"
							localizer={localizer}
							events={state.events}
							startAccessor="start"
							endAccessor="end"
							onSelectEvent={(event) => editTask(event)}
							eventPropGetter={(MyListTask) => {
								const backgroundColor = MyListTask.status ? MyListTask.color : '#d32f2f'
								const color ='white'
								return { style: { backgroundColor ,color} }
							}}
							style={{ height: 800 }}
						/>
					</div>
				</div>
			</div>
			{/* Modal de culminacion de tareas */}
			<Modal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
				contentLabel="Modal Task Info"
			>
				<div>
						<h3>{ tastkDetail.title }</h3>
						<p>{ tastkDetail.body }</p>
						<button className="btn-success" onClick={() => editEvent(tastkDetail)}>Done</button>
				</div>
			</Modal>
		</div>
	)
}

export default App;
