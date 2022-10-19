import {useEffect } from 'react'
import { useForm } from "react-hook-form";

const TaskCreator = ({sendForm}) => {
	const { register, handleSubmit, formState: { errors },reset } = useForm();
	useEffect(() => {
		reset(formValues => ({
			title_task:'',
			desc_task:'',
			date_task:''
		}))
	},[sendForm])
	return (
		<div>
			<div>
				<h1>Form Task</h1>
			</div>
			<form onSubmit={handleSubmit(sendForm)}>
				<div className="form-group">
							<label htmlFor="title">Title Task</label> <br />
							<input 
								type="text"
								id='title'
								{
									...register('title_task',{
										required:true
									}) 
								}
							/>
							{errors.title_task && <span>This field is required</span>}
				</div>
				<div className="form-group">
							<label htmlFor="desc">Description task</label>
							<input 
								type="text"
								id='desc'
								{
									...register('desc_task',{
										required:true
									}) 
								}
							/>
							{errors.title_task && <span>This field is required</span>}
				</div>
				<div className="form-group">
							<label htmlFor="desc">Date task</label>
							<input 
								type="datetime-local"
								id='desc'
								{
									...register('date_task',{
										required:true
									}) 
								}
							/>
							{errors.title_task && <span>This field is required</span>}
				</div>
				<div style={{textAlign: 'right',width: '100%'}}>
					<button className="btn mr-top" type="submit">Save Task</button>
				</div>
			</form>
		</div>
	)
}

export default TaskCreator